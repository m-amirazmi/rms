import { Injectable } from '@nestjs/common';
import { UserService } from 'src/core/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  register(email: string, password: string) {
    return this.userService.create(email, password);
  }

  login() {}
}
