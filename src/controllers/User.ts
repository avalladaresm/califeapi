import { BodyParams, Controller, Delete, Get, PathParams, Post, Put, Req, UseBefore } from '@tsed/common';
import { ContentType } from '@tsed/schema';
import { Authenticate } from '../middlewares/Authenticate';
import { UserService } from '../services/User';

@Controller('/user')
@UseBefore(Authenticate)
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/getAllUsers')
  @ContentType('application/json')
  async getAllUsers(@Req() req: any): Promise<any> {
    try {
      const users = await this.userService.getAllUsers(req)
      return users
    }
    catch (e) {
      throw e
    }
  }

  @Get('/:id')
  @ContentType('application/json')
  async getUserById(@PathParams ('id') id: number): Promise<any> {
    try {
      const user = await this.userService.getUserById(id)
      return user
    }
    catch (e) {
      throw e
    }
  }

  @Post('/createUser')
  @ContentType('application/json')
  async createUser(@Req() req: any, @BodyParams() data: any): Promise<any> {
    try {
      const user = await this.userService.createUser(req, data)
      return user
    }
    catch (e) {
      throw e
    }
  }

  @Put('/updateUser/:id')
  @ContentType('application/json')
  async updateUser(@Req() req: any, @PathParams() id: number, @BodyParams() data: any): Promise<any> {
    try {
      const user = await this.userService.updateUser(req, id, data)
      return user
    }
    catch (e) {
      throw e
    }
  }

  @Delete('/deleteUser/:id')
  @ContentType('application/json')
  async deleteUser(@Req() req: any, @PathParams() id: number): Promise<any> {
    try {
      const user = await this.userService.deleteUser(req, id)
      return user
    }
    catch (e) {
      throw e
    }
  }
}