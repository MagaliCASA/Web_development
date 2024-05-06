import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class CreateComment1715004606241 {
    name = 'CreateComment1715004606241'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "comment" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "comment" character varying NOT NULL,
                "movieId" integer NOT NULL,
                CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "comment"
        `);
    }
}
