import { IMiddleware, Middleware, Next, Req } from '@tsed/common';
import { BadRequest, Forbidden, Unauthorized } from '@tsed/exceptions';
var jwt = require('jsonwebtoken');

@Middleware()
export class Authenticate implements IMiddleware {
  use(@Req() req: Req, @Next() next: Next) {
    const accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) throw new Unauthorized('You are not authorized to view the contents of this page!')

    jwt.verify(accessToken, process.env.JWT_SECRET, (err: any, data: any) => {
      switch (err && err.name) {
        case 'TokenExpiredError':
          throw new Forbidden('Su sesión expiró.')
        case 'JsonWebTokenError':
          console.log(err)
          throw new BadRequest('Se encontró un problema con la data de su sesión.')
        default: {
          req.app.locals.mwData = data
          next()
        }
      }
    })
  }
}