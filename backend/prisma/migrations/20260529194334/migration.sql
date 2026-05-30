/*
  Warnings:

  - The values [flood,storm] on the enum `HazardType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HazardType_new" AS ENUM ('eruption', 'earthquake', 'wildfire');
ALTER TABLE "Post" ALTER COLUMN "hazardType" TYPE "HazardType_new" USING ("hazardType"::text::"HazardType_new");
ALTER TYPE "HazardType" RENAME TO "HazardType_old";
ALTER TYPE "HazardType_new" RENAME TO "HazardType";
DROP TYPE "public"."HazardType_old";
COMMIT;
