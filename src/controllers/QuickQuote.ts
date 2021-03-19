import { BodyParams, Controller, Get, PathParams, Post, Req, UseBefore } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { QuickQuoteService } from '../services/QuickQuote';

@Controller('/quickQuote')
@UseBefore(Authenticate)
export class QuickQuoteController {
  constructor(private quickQuoteService: QuickQuoteService) { }

  @Get('/getAllQuickQuotes')
  @ContentType('application/json')
  async getAllQuickQuotes(): Promise<any> {
    try {
      const quickQuotes = await this.quickQuoteService.getAllQuickQuotes()
      return quickQuotes
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createQuickQuote')
  @ContentType('application/json')
  async createQuickQuote(@BodyParams() data: any): Promise<any> {
    try {
      const quickQuote = await this.quickQuoteService.createQuickQuote(data)
      return quickQuote
    }
    catch (e) {
      throw e
    }
  }

  @Get('/:quickQuoteId')
  @ContentType('application/json')
  async getQuickQuote(@PathParams('quickQuoteId') quickQuoteId: number): Promise<any> {
    try {
      const quickQuote = await this.quickQuoteService.getQuickQuote(quickQuoteId)
      return quickQuote
    }
    catch (e) {
      throw e
    }
  }
}