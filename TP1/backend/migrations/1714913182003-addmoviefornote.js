import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Addmoviefornote1714913182003 {
    name = 'Addmoviefornote1714913182003'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "note"
                RENAME COLUMN "movie" TO "movieId"
        `);
        await queryRunner.query(`
            ALTER TABLE "note" DROP COLUMN "movieId"
        `);
        await queryRunner.query(`
            ALTER TABLE "note"
            ADD "movieId" integer NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "note" DROP COLUMN "movieId"
        `);
        await queryRunner.query(`
            ALTER TABLE "note"
            ADD "movieId" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "note"
                RENAME COLUMN "movieId" TO "movie"
        `);
    }
}
