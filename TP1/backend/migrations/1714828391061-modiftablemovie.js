import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Modiftablemovie1714828391061 {
    name = 'Modiftablemovie1714828391061'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "id" integer NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cee7125f3cbad047d34a6e13539"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_5a4a36c212d7c00ace5e5e55d12" PRIMARY KEY ("name", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id")
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
            ALTER TABLE "movie" DROP CONSTRAINT "PK_5a4a36c212d7c00ace5e5e55d12"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name")
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_5a4a36c212d7c00ace5e5e55d12" PRIMARY KEY ("name", "id")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_4ddb178d78979327d4169db71d6"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "image"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_5a4a36c212d7c00ace5e5e55d12"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_cee7125f3cbad047d34a6e13539" PRIMARY KEY ("name")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "id"
        `);
    }
}
