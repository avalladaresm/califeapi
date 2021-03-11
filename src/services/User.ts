import { Req, Service } from "@tsed/common";
import { TypeORMService } from "@tsed/typeorm";
import { Connection } from "typeorm";
import { AuthenticateUserType } from "../middlewares/AuthenticateUserType";

enum Types {
  USER_CLIENT = "USER_CLIENT",
  USER_ADMIN = "USER_ADMIN",
  USER_ADMIN_ROOT = "USER_ADMIN_ROOT",
}

@Service()
export class UserService {
  private connection: Connection;
  constructor(private typeORMService: TypeORMService, private authenticateUserType: AuthenticateUserType) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get("default")!; // get connection by name
  }

  async getAllUsers(@Req() req: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const users = await this.connection.query('CALL getUsers()')
      if (users[0].length === 0) return []
      return users[0]
    }
    catch (e) {
      throw e
    }
  }

  async getUserById(id: number): Promise<any> {
    try {
      //this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT, Types.USER_CLIENT], this.connection)
      const user = await this.connection.query('CALL getUserById(?)', [Number(id)])
      return user[0][0]
    }
    catch (e) {
      throw e
    }
  }

  async createUser(@Req() req: any, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const user = await this.connection.query('CALL createUser(?,?,?,?,?,?,?)', [data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return user
    }
    catch (e) {
      throw e
    }
  }

  async updateUser(@Req() req: any, id: number, data: any): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      data.image = null
      const user = await this.connection.query('CALL updateUser(?,?,?,?,?,?,?,?)', [id, data.name, data.image, data.type, data.phone, data.contact, data.direction, data.description])
      return user
    }
    catch (e) {
      throw e
    }
  }

  async deleteUser(@Req() req: any, id: number): Promise<any> {
    try {
      this.authenticateUserType.authenticateUserType(req, [Types.USER_ADMIN, Types.USER_ADMIN_ROOT], this.connection)
      const success = await this.connection.query('CALL deleteUser(?)', [id])
      return success
    }
    catch (e) {
      throw e
    }
  }
}
