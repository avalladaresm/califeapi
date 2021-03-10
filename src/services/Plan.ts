import { Req, Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";
import { parseSingleElement } from "../utils";

enum Types {
  USER_CLIENT = "USER_CLIENT",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_ROOT = "USER_ADMIN_ROOT",
}

@Service()
export class PlanService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllPlans(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const plans = await this.connection.query('CALL getAllPlans()')
      if (plans[0].length === 0) return []
      return plans[0]
    }
    catch (e) {
      throw e
    }
  }

  async getPlanById(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const plan = await this.connection.query('CALL getPlanById(?)', [id])
      return plan[0][0]
    }
    catch (e) {
      throw e
    }
  }

/*   async getPlanByIdForUser(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const plan = await this.connection.query('CALL getPlanById(?)', [id])
      return plan[0][0]
    }
    catch (e) {
      throw e
    }
  } */

  async createPlan(@Req() req: any, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const plan = await this.connection.query('CALL createPlan(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
        data.name,
        data.carnets,
        data.paymentMethod,
        data.coverage,
        data.initialCost,
        data.incrementPrice,
        data.percentage,
        data.servicesPrice,
        data.son1,
        data.son2,
        data.son3,
        data.son4,
        data.son5,
        data.insuranceLifeCober1,
        data.insuranceLifePrice1,
        data.insuranceLifeCober2,
        data.insuranceLifePrice2,
        data.insuranceLifeCober3,
        data.insuranceLifePrice3,
        data.insuranceLifeCober4,
        data.insuranceLifePrice4,
        data.maternityPrice,
        data.maternityCesareaCober,
        data.maternityPartoCober,
        data.notes,
        data.notesRTFBenefits
      ])
      return parseSingleElement(plan);
    }
    catch (e) {
      throw e
    }
  }

  async updatePlan(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const plan = await this.connection.query('CALL updatePlan(?,?,?,?,?,?,?,?)', [id, data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      //falta getNetworkServices(idPlan)
      return plan
    }
    catch (e) {
      throw e
    }
  }
}
