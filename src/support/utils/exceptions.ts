import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCreateSupportRequestRequestException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class SupportRequestNotFoundException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.NOT_FOUND);
  }
}