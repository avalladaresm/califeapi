import { Injectable } from "@tsed/di";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";

@Injectable()
export class DependantService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getUserDependants(userId: number): Promise<any> {
    try {
      const userDependants = await this.connection.query('CALL DEPENDANTS_GetUserDependants(?)', [userId])
      return userDependants[0]
    }
    catch (e) {
      throw e
    }
  }
  
  async getPlanAssignedUserDependants(userId: number): Promise<any> {
    try {
      const planAssignedUserDependants = await this.connection.query('CALL DEPENDANTS_GetPlanAssignedUserDependants(?)', [userId])
      return planAssignedUserDependants[0]
    }
    catch (e) {
      throw e
    }
  }  
}
