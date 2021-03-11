import { Req, Service } from "@tsed/common";
import { Conflict } from "@tsed/exceptions";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";

enum Types {
  USER_CLIENT = "USER_CLIENT",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_ROOT = "USER_ADMIN_ROOT",
}

@Service()
export class CurrencyService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllCurrencies(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const currencis = await this.connection.query('CALL getCurrencies()')
      if (currencis.length === 0) return []
      return currencis
    }
    catch (e) {
      throw e
    }
  }

  async getCurrency(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const currency = await this.connection.query('CALL getCurrencyById(?)', [id])
      return currency[0][0]
    }
    catch (e) {
      throw e
    }
  }

  async createCurrency(@Req() req: any, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const alreadyExists = await this.connection.query('CALL createCurrency(?)', [data.code])
      if(alreadyExists[0][0].found === 1) throw new Conflict('Codigo de moneda ya en uso')
      
      const currency = await this.connection.query('CALL createCurrency(?,?,?,?,?,?,?)', [data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      if (currency[0])
      return currency
    }
    catch (e) {
      throw e
    }
  }

  async updateCurrency(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const currency = await this.connection.query('CALL updateCurrency(?,?,?,?,?,?,?,?)', [id, data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return currency
    }
    catch (e) {
      throw e
    }
  }

  async deleteCurrency(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const success = await this.connection.query('CALL deleteCurrency(?)', [id])
      return success
    }
    catch (e) {
      throw e
    }
  }
}
