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
export class CountryStateService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getCountryStates(@Req() req: any, code: string): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const countries = await this.connection.query('CALL getCountryStatesByCountryCode(?)', [code])
      if (countries.length === 0) return []
      return countries
    }
    catch (e) {
      throw e
    }
  }

  async getCountryState(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const countryState = await this.connection.query('CALL getCountryStateById(?)', [id])
      return countryState[0][0]
    }
    catch (e) {
      throw e
    }
  }

  async createCountryState(@Req() req: any, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const countryState = await this.connection.query('CALL createCountryState(?,?)', [data.id, data.name])
      return countryState
    }
    catch (e) {
      throw e
    }
  }

  async updateCountryState(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const countryState = await this.connection.query('CALL updateCountry(?,?)', [id, data.name])
      return countryState
    }
    catch (e) {
      throw e
    }
  }
}
