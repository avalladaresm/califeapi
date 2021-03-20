import { Controller, Get, PathParams } from "@tsed/common";
import { ContentType } from "@tsed/schema";
import { DependantService } from "../services/DependantService";

@Controller("/dependant")
export class DependantController {
  constructor(private dependantService: DependantService) { }

  @Get('/getUserDependants/:userId')
  @ContentType('application/json')
  async getUserDependants(@PathParams('userId') userId: number): Promise<any> {
    try {
      const userDependants = await this.dependantService.getUserDependants(userId)
      return userDependants
    }
    catch (e) {
      throw e
    }
  }

  @Get('/getPlanAssignedUserDependants/:userId')
  @ContentType('application/json')
  async getPlanAssignedUserDependants(@PathParams('userId') userId: number): Promise<any> {
    try {
      const planAssignedUserDependants = await this.dependantService.getPlanAssignedUserDependants(userId)
      return planAssignedUserDependants
    }
    catch (e) {
      throw e
    }
  }
}
