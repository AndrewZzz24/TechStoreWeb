import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { AppModule } from "./app.module";
import * as hbs from "hbs";
import * as fs from "fs";
import { ServerTimeInterceptor } from "./serverTime.interceptor";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { PrismaService } from "./prisma.service";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "./exception.filter";
import { PrismaClientExceptionFilter } from "nestjs-prisma";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { middleware } from "supertokens-node/lib/build/framework/express";
async function bootstrap() {
  // supertokens.init({
  //   framework: "express",
  //   supertokens: {
  //     // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
  //     connectionURI: "https://dev-0e4ec6a1e81e11edb88efb40042c40db-eu-west-1.aws.supertokens.io:3573",
  //     apiKey: "W6hR-TjC0e=KS7dOv-GrLvXrtVqjqk",
  //   },
  //   appInfo: {
  //     // learn more about this on https://supertokens.com/docs/session/appinfo
  //     appName: "azweb",
  //     apiDomain: "https://azweb.onrender.com",
  //     websiteDomain: "https://azweb.onrender.com",
  //     apiBasePath: "/api",
  //     websiteBasePath: "/auth",
  //   },
  //   recipeList: [
  //     EmailPassword.init(), // initializes signin / sign up features
  //     Session.init() // initializes session features
  //   ]
  // });

  let app = await NestFactory.create<NestExpressApplication>(AppModule);
  const cors = require('cors');
  app.use(cors({
    origin: "https://azweb.onrender.com",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  }));
  app.use(middleware());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const config = new DocumentBuilder()
    .setTitle("TechStore")
    .setDescription("The \"TechStore\" WebService API description")
    .setVersion("1.0")
    .addTag("techStoreShop")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(
      httpAdapter,
      {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND
      }
    )
  );

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ServerTimeInterceptor());
  app.useStaticAssets(join(__dirname, "..", "/public"));
  app.setBaseViewsDir(join(__dirname, "..", "views"));
  app.setViewEngine("hbs");
  hbs.registerPartials(join(__dirname, "..", "/views/layouts"));
  hbs.registerPartial(
    "head.hbs",
    fs.readFileSync(join(__dirname, "..", "/views/layouts/head.hbs"), "utf-8")
  );
  hbs.registerPartial(
    "header.hbs",
    fs.readFileSync(
      join(__dirname, "..", "/views/layouts/header.hbs"),
      "utf-8"
    )
  );
  hbs.registerPartial(
    "footer.hbs",
    fs.readFileSync(
      join(__dirname, "..", "/views/layouts/footer.hbs"),
      "utf-8"
    )
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
