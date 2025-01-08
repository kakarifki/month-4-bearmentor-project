/*
  Warnings:

  - You are about to drop the column `provinceId` on the `cuisines` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueCode` on the `cuisines` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `cultures` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueCode` on the `cultures` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `ethnicgroups` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueCode` on the `ethnicgroups` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueCode` on the `provinces` table. All the data in the column will be lost.
  - You are about to drop the column `provinceId` on the `regionalsongs` table. All the data in the column will be lost.
  - You are about to drop the column `uniqueCode` on the `regionalsongs` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cuisineCode]` on the table `cuisines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cultureCode]` on the table `cultures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ethnicGroupCode]` on the table `ethnicgroups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[provinceCode]` on the table `provinces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[regionalSongCode]` on the table `regionalsongs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cuisineCode` to the `cuisines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `cuisines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cultureCode` to the `cultures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `cultures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ethnicGroupCode` to the `ethnicgroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `ethnicgroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `provinces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provinceCode` to the `regionalsongs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `regionalSongCode` to the `regionalsongs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "cuisines" DROP CONSTRAINT "cuisines_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "cultures" DROP CONSTRAINT "cultures_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "ethnicgroups" DROP CONSTRAINT "ethnicgroups_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "regionalsongs" DROP CONSTRAINT "regionalsongs_provinceId_fkey";

-- DropIndex
DROP INDEX "cuisines_uniqueCode_key";

-- DropIndex
DROP INDEX "cultures_uniqueCode_key";

-- DropIndex
DROP INDEX "ethnicgroups_uniqueCode_key";

-- DropIndex
DROP INDEX "provinces_uniqueCode_key";

-- DropIndex
DROP INDEX "regionalsongs_uniqueCode_key";

-- AlterTable
ALTER TABLE "cuisines" DROP COLUMN "provinceId",
DROP COLUMN "uniqueCode",
ADD COLUMN     "cuisineCode" TEXT NOT NULL,
ADD COLUMN     "provinceCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cultures" DROP COLUMN "provinceId",
DROP COLUMN "uniqueCode",
ADD COLUMN     "cultureCode" TEXT NOT NULL,
ADD COLUMN     "provinceCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ethnicgroups" DROP COLUMN "provinceId",
DROP COLUMN "uniqueCode",
ADD COLUMN     "ethnicGroupCode" TEXT NOT NULL,
ADD COLUMN     "provinceCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "provinces" DROP COLUMN "uniqueCode",
ADD COLUMN     "provinceCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "regionalsongs" DROP COLUMN "provinceId",
DROP COLUMN "uniqueCode",
ADD COLUMN     "provinceCode" TEXT NOT NULL,
ADD COLUMN     "regionalSongCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cuisines_cuisineCode_key" ON "cuisines"("cuisineCode");

-- CreateIndex
CREATE UNIQUE INDEX "cultures_cultureCode_key" ON "cultures"("cultureCode");

-- CreateIndex
CREATE UNIQUE INDEX "ethnicgroups_ethnicGroupCode_key" ON "ethnicgroups"("ethnicGroupCode");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_provinceCode_key" ON "provinces"("provinceCode");

-- CreateIndex
CREATE UNIQUE INDEX "regionalsongs_regionalSongCode_key" ON "regionalsongs"("regionalSongCode");

-- AddForeignKey
ALTER TABLE "ethnicgroups" ADD CONSTRAINT "ethnicgroups_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "provinces"("provinceCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultures" ADD CONSTRAINT "cultures_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "provinces"("provinceCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regionalsongs" ADD CONSTRAINT "regionalsongs_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "provinces"("provinceCode") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuisines" ADD CONSTRAINT "cuisines_provinceCode_fkey" FOREIGN KEY ("provinceCode") REFERENCES "provinces"("provinceCode") ON DELETE CASCADE ON UPDATE CASCADE;
