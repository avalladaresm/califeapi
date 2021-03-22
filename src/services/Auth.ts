import { Service } from '@tsed/common';
import { BadRequest, InternalServerError, NotFound, Unauthorized } from '@tsed/exceptions';
import { TypeORMService } from '@tsed/typeorm';
import { Connection } from 'typeorm';

var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

interface LoggedInUserCookieData {
  a_t: string
  r: string
  uid: number
}

@Service()
export class AuthService {
  private connection: Connection;

  constructor(private typeORMService: TypeORMService) { }

  $afterRoutesInit() {
    this.connection = this.typeORMService.get('default')!; // get connection by name
  }

  async signin(data: any): Promise<any> {
    try {
      const authFields = await this.connection.query('CALL getUserToAuth(?)', [data.email])
      if (!authFields)
        throw new NotFound('Cuenta no encontrada')
      const authFieldsRes = authFields[0][0]
      if (!bcrypt.compareSync(data.password, authFieldsRes.password))
        throw new Unauthorized('Usuario o clave incorrecta.')

      const user = await this.connection.query('CALL getUserById(?)', [authFieldsRes.idUser])
      const userRes = user[0][0]
      const profile = await this.connection.query('CALL getUserProfileById(?)', [userRes.idUserProfile])
      const profileRes = profile[0][0]
      const token = jwt.sign({ profileRes }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
      });

      const loginRes: LoggedInUserCookieData = { a_t: token, r: profileRes.name, uid: userRes.idUser }

      return loginRes
    }
    catch (e) {
      throw e
    }
  }

  async signup(data: any): Promise<void> {
    try {
      const existsWithEmail = await this.connection.query('CALL existsUserWithEmail(?)', [data.email])
      const existsWithEmailRes = existsWithEmail[0][0]
      if (existsWithEmailRes.found === 1)
        throw new Unauthorized('Este correo ya se encuentra en uso')

      const existsWithPhone = await this.connection.query('CALL existsUserWithPhone(?)', [data.phone])
      const existsWithPhoneRes = existsWithPhone[0][0]
      if (existsWithPhoneRes.found === 0)
        throw new Unauthorized('Este teléfono ya se encuentra en uso')

      data.password = bcrypt.hashSync(data.password, 10)

      if (!data.password)
        throw new InternalServerError("Ocurrio un error al almacenar la clave, por favor intente de nuevo")

      const newUser = await this.connection.query('CALL createUserClient(?, ?, ?, ?, ?, ?)', [
        data.name,
        data.email,
        data.phone,
        data.birthDate,
        data.country,
        data.password,
      ])

      if (!newUser)
        throw new InternalServerError("Ocurrio un error en el registro del usuario, por favor intente de nuevo")
      if (newUser.idUserProfile == 1)
        await this.connection.query('CALL createCustomer(?)', [newUser.idUser])

      const profile = await this.connection.query('CALL getUserProfileById(?)', [newUser.idUserProfile])
      const profileRes = profile[0][0]
      const token = jwt.sign({ profileRes }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRESIN,
      });

      return token
    }
    catch (e) {
      throw new BadRequest('Something happened...');
    }
  }

  async getAccountRoles(userId: number): Promise<any> {
    try {
      const user = await this.connection.query('CALL getUserById(?)', [userId])
      const userRes = user[0][0]
      const profile = await this.connection.query('CALL getUserProfileById(?)', [userRes.idUserProfile])
      const profileRes = profile[0][0]
      return { roles: profileRes.name }
    }
    catch (e) {
      throw new BadRequest('Something happened...');
    }
  }
}
