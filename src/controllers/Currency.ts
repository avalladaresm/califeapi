import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType, Deprecated, Summary } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { CurrencyService } from '../services/Currency';

@Controller('/currency')
@UseBefore(Authenticate)
export class CurrencyController {
  constructor(private currencyService: CurrencyService) { }

  @Deprecated()
  @Summary('Not being used yet.')
  @Get('/getAllCurrencies')
  @ContentType('application/json')
  async getAllCurrencies(@Req() req: any): Promise<any> {
    try {
      const companies = await this.currencyService.getAllCurrencies(req)
      return companies
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Get('/getCurrency/:id')
  @ContentType('application/json')
  async getCurrencyById(@Req() req: any, id: number): Promise<any> {
    try {
      const currency = await this.currencyService.getCurrency(req, id)
      return currency
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Post('/createCurrency')
  @ContentType('application/json')
  async createCurrency(@Req() req: any, @BodyParams() data: any): Promise<any> {
    try {
      const currency = await this.currencyService.createCurrency(req, data)
      return currency
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Put('/updateCurrency/:id')
  @ContentType('application/json')
  async updateCurrency(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const currency = await this.currencyService.updateCurrency(req, id, data)
      return currency
    }
    catch (e) {
      throw e
    }
  }

  @Deprecated()
  @Summary('Not being used yet.')
  @Delete('/deleteCurrency/:id')
  @ContentType('application/json')
  async deleteCurrency(@Req() req: any, @PathParams() id: number): Promise<any> {
    try {
      const currency = await this.currencyService.deleteCurrency(req, id)
      return currency
    }
    catch (e) {
      throw e
    }
  }

}