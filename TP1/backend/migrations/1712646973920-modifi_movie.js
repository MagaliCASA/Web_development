import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class ModifiMovie1712646973920 {
    name = 'ModifiMovie1712646973920'

    async up(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_2a90cdb9b8c90252b8ac89c664d"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "titre"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "date_de_sortie"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "title" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_a81090ad0ceb645f30f9399c347" PRIMARY KEY ("title")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347" UNIQUE ("title")
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "date" character varying NOT NULL
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "date"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "UQ_a81090ad0ceb645f30f9399c347"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP CONSTRAINT "PK_a81090ad0ceb645f30f9399c347"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie" DROP COLUMN "title"
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "date_de_sortie" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD "titre" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "movie"
            ADD CONSTRAINT "PK_2a90cdb9b8c90252b8ac89c664d" PRIMARY KEY ("titre")
        `);
    }
}
