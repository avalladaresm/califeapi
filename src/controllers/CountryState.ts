import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { CountryStateService } from '../services/CountryState';

@Controller('/countryStateState')
@UseBefore(Authenticate)
export class CountryStateController {
  constructor(private companyStateService: CountryStateService) { }

  @Get('/getCountryStates')
  @ContentType('application/json')
  async getAllCountries(@Req() req: any, @PathParams() code: string): Promise<any> {
    try {
      const companies = await this.companyStateService.getCountryStates(req, code)
      return companies
    }
    catch (e) {
      throw e
    }
  }

  @Get('/getCountryState/:id')
  @ContentType('application/json')
  async getCountryStateById(@Req() req: any, id: number): Promise<any> {
    try {
      const countryState = await this.companyStateService.getCountryState(req, id)
      return countryState
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createCountryState')
  @ContentType('application/json')
  async createCountryState(@Req() req: any, @BodyParams() data: any): Promise<any> {
    try {
      const countryState = await this.companyStateService.createCountryState(req, data)
      return countryState
    }
    catch (e) {
      throw e
    }
  }

  @Put('/updateCountryState/:id')
  @ContentType('application/json')
  async updateCountryState(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const countryState = await this.companyStateService.updateCountryState(req, id, data)
      return countryState
    }
    catch (e) {
      throw e
    }
  }
}