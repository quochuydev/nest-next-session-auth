import { MiddlewareConsumer, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ORMConfig } from "./config/ormconfig";
import { AuthModule } from "./modules/auth/auth.module";
import { UserModule } from "./modules/user/user.module";
import { AuthMiddleware } from "./modules/auth/auth.middleware";
import { CartMiddleware } from "./modules/cart/cart.middleware";
import { RoleModule } from "./modules/roles/role.module";
import { CartModule } from "./modules/cart/cart.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    AuthModule,
    UserModule,
    RoleModule,
    CartModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
    consumer.apply(CartMiddleware).forRoutes("*");
  }
}
