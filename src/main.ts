import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join('frontend', '..', 'public'));
  app.setBaseViewsDir(join('frontend', '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT);
}
bootstrap();
