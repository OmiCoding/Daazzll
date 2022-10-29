-- AlterTable
CREATE SEQUENCE "acc_socials_id_seq";
ALTER TABLE "acc_socials" ALTER COLUMN "id" SET DEFAULT nextval('acc_socials_id_seq'),
ADD CONSTRAINT "acc_socials_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE "acc_socials_id_seq" OWNED BY "acc_socials"."id";
