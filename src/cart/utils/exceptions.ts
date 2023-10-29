import { HttpException, HttpStatus } from "@nestjs/common";

export class CartAlreadyExistsException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.CONFLICT);
  }
}

export class InvalidCreateCartRequestException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.BAD_REQUEST);
  }
}

export class CartNotFoundException extends HttpException {
  constructor(msg: string) {
    super(msg, HttpStatus.NOT_FOUND);
  }
}