import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { CompanyService } from '../services/Company';

@Controller('/company')
@UseBefore(Authenticate)
export class CompanyController {
  constructor(private companyService: CompanyService) { }

  @Get('/getAllCompanies')
  @ContentType('application/json')
  async getAllCompanies(@Req() req: any): Promise<any> {
    try {
      const companies = await this.companyService.getAllCompanies(req)
      return companies
    }
    catch (e) {
      throw e
    }
  }

  @Get('/getCompany/:id')
  @ContentType('application/json')
  async getCompanyById(@Req() req: any, id: number): Promise<any> {
    try {
      const company = await this.companyService.getCompany(req, id)
      return company
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createCompany')
  @ContentType('application/json')
  async createCompany(@Req() req: any, @BodyParams() data: any): Promise<any> {
    try {
      const company = await this.companyService.createCompany(req, data)
      return company
    }
    catch (e) {
      throw e
    }
  }

  @Put('/updateCompany/:id')
  @ContentType('application/json')
  async updateCompany(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const company = await this.companyService.updateCompany(req, id, data)
      return company
    }
    catch (e) {
      throw e
    }
  }

  @Delete('/deleteCompany/:id')
  @ContentType('application/json')
  async deleteCompany(@Req() req: any, @PathParams() id: number): Promise<any> {
    try {
      const company = await this.companyService.deleteCompany(req, id)
      return company
    }
    catch (e) {
      throw e
    }
  }

}