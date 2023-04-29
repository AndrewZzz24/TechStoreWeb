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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
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
