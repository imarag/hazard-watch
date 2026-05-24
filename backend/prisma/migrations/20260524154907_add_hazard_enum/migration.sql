/*
  Warnings:

  - Added the required column `hazardType` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "HazardType" AS ENUM ('FLOOD', 'EARTHQUAKE', 'WILDFIRE', 'STORM');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "hazardType" "HazardType" NOT NULL;
