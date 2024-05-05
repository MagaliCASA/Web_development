import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Createnote1714909286459 {
    name = 'Createnote1714909286459'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "note" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "note" integer NOT NULL,
                CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_4ddb178d78979327d4169db71d6"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cee7125f3cbad047d34a6e13539" PRIMARY KEY ("name")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cee7125f3cbad047d34a6e13539"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "image" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_4ddb178d78979327d4169db71d6" UNIQUE ("image")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            DROP TABLE "note"
        `);
    }
}
