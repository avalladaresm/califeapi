import { Controller, Get, Req, UseBefore } from '@tsed/common';
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
}