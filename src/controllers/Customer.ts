import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType, Deprecated, Summary } from '@tsed/schema';
import { Authenticate } from "../middlewares/Authenticate";
import { CustomerService } from "../services/Customer";

@Controller('/customer')
@UseBefore(Authenticate)
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Deprecated()
  @Summary('Not being used yet.')
  @Get('/getAllCustomers')
  @ContentType('application/json')
  async getAllCustomers(@Req() req: any): Promise<any> {
    try {
      const customers = await this.customerService.getAllCustomers(req)
      return customers
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Get('/getCustomer/:id')
  @ContentType('application/json')
  async getCustomerById(@Req() req: any, id: number): Promise<any> {
    try {
      const customer = await this.customerService.getCustomer(req, id)
      return customer
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createCustomer')
  @ContentType('application/json')
  async createCustomer(@BodyParams() data: any): Promise<any> {
    try {
      const customer = await this.customerService.createCustomer(data)
      return customer
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Put('/updateCustomer/:id')
  @ContentType('application/json')
  async updateCustomer(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const customer = await this.customerService.updateCustomer(req, id, data)
      return customer
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Delete('/deleteCustomer/:id')
  @ContentType('application/json')
  async deleteCustomer(@Req() req: any, @PathParams() id: number): Promise<any> {
    try {
      const customer = await this.customerService.deleteCustomer(req, id)
      return customer
    }
    catch (e) {
      throw e
    }
  }
}
