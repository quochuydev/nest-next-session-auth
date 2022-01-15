import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateSessionTable1642233316185 implements MigrationInterface {
    name = 'CreateSessionTable1642233316185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "ip" character varying, "userAgent" character varying, "userId" character varying, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
