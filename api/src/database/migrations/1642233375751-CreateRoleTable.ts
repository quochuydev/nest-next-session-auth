import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateRoleTable1642233375751 implements MigrationInterface {
    name = 'CreateRoleTable1642233375751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying, "permissions" text NOT NULL DEFAULT '[]', CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
