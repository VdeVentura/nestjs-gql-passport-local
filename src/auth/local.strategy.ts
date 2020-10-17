import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(
      '\x1b[32m %c============================== \x1b[0m',
      'color: green',
    );
    console.log('[local.strategy --> user]', user);
    console.log(
      '\x1b[32m %c============================== \x1b[0m',
      'color: green',
    );
    return user;
  }
}
