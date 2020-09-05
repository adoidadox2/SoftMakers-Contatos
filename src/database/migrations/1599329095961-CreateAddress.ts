import { MigrationInterface, QueryRunner } from "typeorm";

export default class CreateAddress1599329095961 implements MigrationInterface {
  name = "CreateAddress1599329095961";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cep" character varying, "state" character varying NOT NULL, "city" character varying NOT NULL, "neighborhood" character varying NOT NULL, "street" character varying NOT NULL, "house_number" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
