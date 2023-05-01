import { HttpException, HttpStatus } from "@nestjs/common";

export class OrderAlreadyExistsException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.CONFLICT);
  }
}

export class InvalidCreateOrderRequestException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class OrderNotFoundException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.NOT_FOUND);
  }
}