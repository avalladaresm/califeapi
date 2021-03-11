import { BodyParams, Controller, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType, Deprecated,  Summary } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { PlanService } from '../services/Plan';

@Controller('/plan')
@UseBefore(Authenticate)
export class PlanController {
  constructor(private companyService: PlanService) { }

  @Get('/getAllPlans')
  @ContentType('application/json')
  async getAllPlans(@Req() req: any): Promise<any> {
    try {
      const companies = await this.companyService.getAllPlans(req)
      return companies
    }
    catch (e) {
      throw e
    }
  }

  @Get('/:id')
  @ContentType('application/json')
  async getPlanById(@PathParams('id') id: number): Promise<any> {
    try {
      const plan = await this.companyService.getPlanById(id)
      return plan
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Post('/createPlan')
  @ContentType('application/json')
  async createPlan(@Req() req: any, @BodyParams() data: any): Promise<any> {
    try {
      const plan = await this.companyService.createPlan(req, data)
      return plan
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Put('/updatePlan/:id')
  @ContentType('application/json')
  async updatePlan(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const plan = await this.companyService.updatePlan(req, id, data)
      return plan
    }
    catch (e) {
      throw e
    }
  }
}