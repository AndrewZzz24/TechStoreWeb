import { Controller, Get, Render, UseInterceptors } from '@nestjs/common';
import { ServerTimeInterceptor } from './serverTime.interceptor';

@UseInterceptors(ServerTimeInterceptor)
@Controller()
export class AppController {
  @Get('login')
  @Render('login.hbs') // <= Название вашего представления
  getLoginPage() {
    return { user: 'Hello world!' }; // Модель представления
  }

  @Get('feedback')
  @Render('feedback.hbs') // <= Название вашего представления
  getFeedbackPage() {
    return { user: 'Hello world!' }; // Модель представления
  }

  @Get('projects')
  @Render('goods.hbs') // <= Название вашего представления
  getProjectsPage() {
    return { user: 'Hello world!' }; // Модель представления
  }

  @Get('experience')
  @Render('experience.hbs') // <= Название вашего представления
  getExperiencePage() {
    return { user: 'Hello world!' }; // Модель представления
  }

  @Get('index')
  @Render('index.hbs') // <= Название вашего представления
  getIndexPage() {
    return { user: 'Hello world!' }; // Модель представления
  }

  @Get()
  @Render('index.hbs')
  root() {
    return { message: 'Hello world!' };
  }
}
