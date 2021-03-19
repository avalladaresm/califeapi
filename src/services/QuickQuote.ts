import { Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";

@Service()
export class QuickQuoteService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllQuickQuotes(): Promise<any> {
    try {
      const quickQuotes = await this.connection.query('CALL QUICKQUOTE_GetAllQuickQuotes()')
      if (quickQuotes[0].length === 0) return []
      return quickQuotes[0]
    }
    catch (e) {
      throw e
    }
  }

  async createQuickQuote(data: any): Promise<any> {
    try {
      await this.connection.query('CALL QUICKQUOTE_CreateQuickQuote(?,?,?,?,?,?,?,?,?,?)', [
        data.data.userId,
        data.data.planId,
        data.data.holderDob,
        data.data.partnerDob,
        data.data.children,
        data.data.lifeInsurance,
        data.data.isMaternityIncluded,
        data.data.installments,
        data.data.downPayment,
        data.data.installmentPayment,
      ])
    }
    catch (e) {
      throw e
    }
  }

  async getQuickQuote(quickQuoteId: number): Promise<any> {
    try {
      const quickQuote = await this.connection.query('CALL QUICKQUOTE_GetQuickQuote(?)', [quickQuoteId])
      if (quickQuote[0].length === 0) return []
      return quickQuote[0]
    }
    catch (e) {
      throw e
    }
  }
}


