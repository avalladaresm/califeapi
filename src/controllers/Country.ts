import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType, Deprecated, Summary } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { CountryService } from '../services/Country';

@Controller('/country')
@UseBefore(Authenticate)
export class CountryController {
  constructor(private companyService: CountryService) { }

  @Deprecated()
  @Summary('Not being used yet.')
  @Get('/getAllCountries')
  @ContentType('application/json')
  async getAllCountries(@Req() req: any): Promise<any> {
    try {
      const companies = await this.companyService.getCountries(req)
      return companies
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Get('/getCountry/:id')
  @ContentType('application/json')
  async getCountryById(@Req() req: any, id: number): Promise<any> {
    try {
      const country = await this.companyService.getCountry(req, id)
      return country
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Post('/createCountry')
  @ContentType('application/json')
  async createCountry(@Req() req: any, @BodyParams() data: any): Promise<any> {
    try {
      const country = await this.companyService.createCountry(req, data)
      return country
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Put('/updateCountry/:id')
  @ContentType('application/json')
  async updateCountry(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const country = await this.companyService.updateCountry(req, id, data)
      return country
    }
    catch (e) {
      throw e
    }
  }
}