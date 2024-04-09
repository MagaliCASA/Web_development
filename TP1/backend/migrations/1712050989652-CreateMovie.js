import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class CreateMovie1712050989652 {
    name = 'CreateMovie1712050989652'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "titre" character varying NOT NULL,
                "date_de_sortie" character varying NOT NULL,
                CONSTRAINT "UQ_2a90cdb9b8c90252b8ac89c664d" UNIQUE ("titre"),
                CONSTRAINT "PK_2a90cdb9b8c90252b8ac89c664d" PRIMARY KEY ("titre")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
