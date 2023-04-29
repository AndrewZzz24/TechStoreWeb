import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistsException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.FORBIDDEN);
  }
}

export class InvalidSurnameException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.FORBIDDEN);
  }
}

export class UserNotFoundException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.NOT_FOUND);
  }
}