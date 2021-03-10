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
export class CountryService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getCountries(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const countries = await this.connection.query('CALL getCountries()')
      if (countries.length === 0) return []
      return countries
    }
    catch (e) {
      throw e
    }
  }

  async getCountry(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const country = await this.connection.query('CALL getCountryById(?)', [id])
      return country[0][0]
    }
    catch (e) {
      throw e
    }
  }

  async createCountry(@Req() req: any, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const country = await this.connection.query('CALL createCountry(?,?,?,?,?,?,?)', [data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return country
    }
    catch (e) {
      throw e
    }
  }

  async updateCountry(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const country = await this.connection.query('CALL updateCountry(?,?,?,?,?,?,?,?)', [id, data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return country
    }
    catch (e) {
      throw e
    }
  }
}
