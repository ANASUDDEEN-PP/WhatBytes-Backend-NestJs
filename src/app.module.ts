import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [UsersModule, AuthModule], // Ensure proper spacing and comma placement
  controllers: [], // You can add controllers here if needed
  providers: [], // You can add providers here if needed
})
export class AppModule {}
