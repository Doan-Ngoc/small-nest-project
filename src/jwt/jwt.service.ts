import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtService {
  constructor() {}

  sign(payload: object, secretKey: string, options?: jwt.SignOptions): string {
    // console.log('payload', payload);
    // console.log('secretKye', secretKey);
    // console.log('options', options);
    // return 'hello';
    return jwt.sign(payload, secretKey, options);
    // try {
    //   const token = jwt.sign({ id: '123' }, 'abc');
    //   //   jwt.sign(payload, secretKey, options);
    //   console.log('Signed Token:', token);
    //   return token;
    // } catch (error) {
    //   console.error('Error signing token:', error);
    //   throw new Error('Token signing failed');
    // }
  }

  verify(token: string, secretKey: string) {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
