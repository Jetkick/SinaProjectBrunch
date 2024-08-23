// import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
// import { IOAuthUser } from './interfaces/auth-service.interface';
// import { UsersService } from '../users/users.service';
// // import { DynamicAuthGuard } from './guards/dynamic-auth.guard';
// import { Request, Response } from 'express';

// @Controller()
// export class AuthController {
//   constructor(
//     private readonly usersService: UsersService, //
//   ) {}

//   @Get('/login/:social')
//   @UseGuards(DynamicAuthGuard)
//   async loginOAuth(
//     @Req() req: Request & IOAuthUser, //
//     @Res() res: Response,
//   ) {
//     return this.usersService.loginOAuth({ req, res });
//   }
// }
