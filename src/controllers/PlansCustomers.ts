import { BodyParams, Controller, Get, Patch, PathParams, Post, Req, UseBefore } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { PlanCustomerService } from '../services/PlanCustomer';

@Controller('/planCustomer')
@UseBefore(Authenticate)
export class PlansCustomersController {
  constructor(private planCustomerService: PlanCustomerService) { }

  @Get('/getAllPlansCustomers')
  @ContentType('application/json')
  async getAllPlansCustomers(@Req() req: any): Promise<any> {
    try {
      const companies = await this.planCustomerService.getAllPlansCustomers(req)
      return companies
    }
    catch (e) {
      throw e
    }
  }

  @Get('/:userId')
  @ContentType('application/json')
  async getPlanCustomerByUserId(@PathParams('userId') userId: number): Promise<any> {
    try {
      const planCustomer = await this.planCustomerService.getPlanCustomerByUserId(userId)
      return planCustomer
    }
    catch (e) {
      throw e
    }
  }

  @Get('/customer/:customerId')
  @ContentType('application/json')
  async getPlanCustomerByCustomerId(@PathParams('customerId') customerId: number): Promise<any> {
    try {
      const planCustomer = await this.planCustomerService.getPlanCustomerByCustomerId(customerId)
      return planCustomer
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createCustomerPlan')
  @ContentType('application/json')
  async createCustomerPlan(@BodyParams() data: any): Promise<any> {
    try {
      const customerPlan = await this.planCustomerService.createCustomerPlan(data)
      return customerPlan
    }
    catch (e) {
      throw e
    }
  }

  @Patch('/updateCustomerPlanStatus/:planId')
  @ContentType('application/json')
  async updateCustomerPlanStatus(@PathParams('planId') data: any): Promise<any> {
    try {
      const customerPlan = await this.planCustomerService.updateCustomerPlanStatus(data)
      return customerPlan
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createPlanCustomer')
  @ContentType('application/json')
  async createPlanCustomer(@BodyParams() data: any): Promise<any> {
    try {
      const planCustomer = await this.planCustomerService.createPlanCustomer(data)
      return planCustomer
    }
    catch (e) {
      throw e
    }
  }
}