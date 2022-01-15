import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateUserTable1642233409067 implements MigrationInterface {
    name = 'UpdateUserTable1642233409067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."username" IS NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."username" IS NULL`);
    }

}
