import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request : Request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException("Not authorized");
      }
      try {
        const payload = await this.jwtService.verifyAsync(
          token
        );

        request.user = payload;
      } catch {
        throw new UnauthorizedException("Not authorized");
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const token = request.headers.authorization?.split(' ')[1] ?? undefined;
      return token;
    }
  }