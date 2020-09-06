import { MigrationInterface, QueryRunner } from "typeorm";

export default class AbleNullToNeighborhhodStreetHouseNumber1599352996503
  implements MigrationInterface {
  name = "AbleNullToNeighborhhodStreetHouseNumber1599352996503";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "neighborhood" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "street" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "house_number" DROP NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "house_number" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "street" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "address" ALTER COLUMN "neighborhood" SET NOT NULL`
    );
  }
}
