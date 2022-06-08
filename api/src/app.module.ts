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
import { ProductModule } from "./modules/product/product.module";
import { FileModule } from "./modules/file/file.module";
import { CategoryModule } from "./modules/category/category.module";
import { OrderModule } from "./modules/order/order.module";
import { BlogModule } from "./modules/blog/blog.module";
import { NotificationModule } from "./modules/notification/notification.module";
import { DeviceModule } from "./modules/device/device.module";
import { SettingModule } from "./modules/setting/setting.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    AuthModule,
    UserModule,
    RoleModule,
    CartModule,
    ProductModule,
    FileModule,
    CategoryModule,
    OrderModule,
    BlogModule,
    NotificationModule,
    DeviceModule,
    SettingModule,
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
