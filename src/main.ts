import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs';
import * as fs from 'fs';
import { ServerTimeInterceptor } from './serverTime.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalInterceptors(new ServerTimeInterceptor());
  app.useStaticAssets(join(__dirname, '..', '/public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/layouts'));
  hbs.registerPartial(
    'head.hbs',
    fs.readFileSync(join(__dirname, '..', '/views/layouts/head.hbs'), 'utf-8'),
  );
  hbs.registerPartial(
    'header.hbs',
    fs.readFileSync(
      join(__dirname, '..', '/views/layouts/header.hbs'),
      'utf-8',
    ),
  );
  hbs.registerPartial(
    'footer.hbs',
    fs.readFileSync(
      join(__dirname, '..', '/views/layouts/footer.hbs'),
      'utf-8',
    ),
  );
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
