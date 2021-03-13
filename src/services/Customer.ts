import { Req } from "@tsed/common";
import { Service } from "@tsed/di";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";

enum Types {
  USER_CLIENT = "USER_CLIENT",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_ROOT = "USER_ADMIN_ROOT",
}

@Service()
export class CustomerService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllCustomers(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const customers = await this.connection.query('CALL getCustomers()')
      if (customers[0].length === 0) return []
      return customers[0]
    }
    catch (e) {
      throw e
    }
  }

  async getCustomer(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const customer = await this.connection.query('CALL getCustomerById(?)', [id])
      return customer[0][0]
    }
    catch (e) {
      throw e
    }
  }

  async createCustomer(data: any): Promise<any> {
    try {
      //this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const customer = await this.connection.query('CALL CUSTOMER_CreateCustomer(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        data.data.uid,
        data.data.firstname,
        data.data.middlename,
        data.data.firstSurname,
        data.data.secondSurname,
        data.data.surnameAfterMarried,
        data.data.email,
        data.data.gender,
        new Date(data.data.birthDate),
        data.data.maritalStatus,
        data.data.occupation,
        data.data.weight,
        data.data.height,
        data.data.worksAt,
        data.data.workAddress,
        data.data.neighborhood,
        data.data.avenue,
        data.data.street,
        data.data.block,
        data.data.houseNumber,
        data.data.addressType,
        data.data.cityId,
        data.data.stateId,
        data.data.countryId,
        data.data.identificationDocument,
        data.data.identificationDocumentType,
        data.data.phoneNumber,
        data.data.phoneNumberType,
      ])
      console.log('customer', customer)
      return customer
    }
    catch (e) {
      throw e
    }
  }






























  async updateCustomer(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const customer = await this.connection.query('CALL updateCustomer(?,?,?,?,?,?,?,?)', [id, data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return customer
    }
    catch (e) {
      throw e
    }
  }

  async deleteCustomer(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const success = await this.connection.query('CALL deleteCustomer(?)', [id])
      return success
    }
    catch (e) {
      throw e
    }
  }
}
