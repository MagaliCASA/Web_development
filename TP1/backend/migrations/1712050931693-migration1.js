import typeorm from "typeorm";

const { MigrationInterface, QueryRunner } = typeorm;

export default class Migration11712050931693 {
    name = 'Migration11712050931693'

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "movie" (
                "name" character varying NOT NULL,
                "date" character varying NOT NULL,
                CONSTRAINT "PK_cee7125f3cbad047d34a6e13539" PRIMARY KEY ("name")
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE "movie"
        `);
    }
}
