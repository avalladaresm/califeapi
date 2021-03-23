import { Configuration, Inject } from "@tsed/di";
import { PlatformApplication } from "@tsed/common";
import "@tsed/platform-express"; // /!\ keep this import
import bodyParser from "body-parser";
import compress from "compression";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/typeorm";
import { OpenSpec3 } from "@tsed/openspec";

import ormconfig from "./ormconfig";

export const rootDir = __dirname;

const spec: Partial<OpenSpec3> = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      }
    }
  },
  security: [{
    bearerAuth: []
  }]
}

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 4000,
  httpsPort: process.env.PORT,
  mount: {
    '/_api':
      `${rootDir}/controllers/**/*.ts`
  },
  componentsScan: [
    `${rootDir}/middlewares/**/*.ts`
  ],
  swagger: [
    {
      path: "/_api",
      specVersion: '3.0.3',
      spec: spec
    }
  ],
  typeorm: ormconfig,
  exclude: [
    "**/*.spec.ts"
  ]
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  $beforeRoutesInit(): void {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
