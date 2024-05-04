import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Createmovietablewithfourattributes1714830598340 {
    name = 'Createmovietablewithfourattributes1714830598340'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "id" integer NOT NULL,
                "name" character varying NOT NULL,
                "date" character varying NOT NULL,
                "image" character varying NOT NULL,
                CONSTRAINT "UQ_cb3bb4d61cf764dc035cbedd422" UNIQUE ("id"),
                CONSTRAINT "UQ_cee7125f3cbad047d34a6e13539" UNIQUE ("name"),
                CONSTRAINT "UQ_4ddb178d78979327d4169db71d6" UNIQUE ("image"),
                CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
