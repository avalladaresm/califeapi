import { BodyParams, Controller, Get, PathParams, Post, UseBefore } from "@tsed/common";
import { ContentType } from '@tsed/schema';
import { Authenticate } from "../middlewares/Authenticate";
import { AuthService } from "../services/Auth";

@Controller("/auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('/login')
  @ContentType('application/json')
  async login(@BodyParams('data') data: any): Promise<any> {
    const res = await this.authService.signin(data)
    return res
  }

  @Post('/signup')
  async signup(@BodyParams('data') data: any) {
    const res = await this.authService.signup(data)
    return res
  }
  
  @Get('/:userId/account-roles')
  @ContentType('application/json')
  @UseBefore(Authenticate)
  async getAccountRoles(@PathParams('userId') userId: number) {
    const res = await this.authService.getAccountRoles(userId)
    return res
  }
}
