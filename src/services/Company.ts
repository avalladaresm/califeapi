import { Req, Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";

enum Types {
  USER_CLIENT = "USER_CLIENT",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_ROOT = "USER_ADMIN_ROOT",
}

@Service()
export class CompanyService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllCompanies(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const companies = await this.connection.query('CALL getCompanies()')
      if (companies[0].length === 0) return []
      return companies[0]
    }
    catch (e) {
      throw e
    }
  }

  async getCompany(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const company = await this.connection.query('CALL getCompanyById(?)', [id])
      return company[0][0]
    }
    catch (e) {
      throw e
    }
  }

  async createCompany(@Req() req: any, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const company = await this.connection.query('CALL createCompany(?,?,?,?,?,?,?)', [data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return company
    }
    catch (e) {
      throw e
    }
  }

  async updateCompany(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const company = await this.connection.query('CALL updateCompany(?,?,?,?,?,?,?,?)', [id, data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return company
    }
    catch (e) {
      throw e
    }
  }

  async deleteCompany(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const success = await this.connection.query('CALL deleteCompany(?)', [id])
      return success
    }
    catch (e) {
      throw e
    }
  }
}
