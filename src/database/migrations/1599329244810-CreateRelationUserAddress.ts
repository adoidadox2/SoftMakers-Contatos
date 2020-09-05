import { MigrationInterface, QueryRunner } from "typeorm";

export default class CreateRelationUserAddress1599329244810
  implements MigrationInterface {
  name = "CreateRelationUserAddress1599329244810";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "addressId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_217ba147c5de6c107f2fa7fa271"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "addressId"`);
  }
}
