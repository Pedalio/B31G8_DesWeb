import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  private names: string[] = [];

  getHelloMethod(): string[] {
    return this.names;
  }

}
