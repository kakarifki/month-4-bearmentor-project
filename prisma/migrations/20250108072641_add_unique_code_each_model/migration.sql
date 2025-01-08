/*
  Warnings:

  - A unique constraint covering the columns `[uniqueCode]` on the table `cuisines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueCode]` on the table `cultures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueCode]` on the table `ethnicgroups` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueCode]` on the table `provinces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uniqueCode]` on the table `regionalsongs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `uniqueCode` to the `cuisines` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueCode` to the `cultures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueCode` to the `ethnicgroups` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueCode` to the `provinces` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uniqueCode` to the `regionalsongs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cuisines" ADD COLUMN     "uniqueCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "cultures" ADD COLUMN     "uniqueCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ethnicgroups" ADD COLUMN     "uniqueCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "provinces" ADD COLUMN     "uniqueCode" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "regionalsongs" ADD COLUMN     "uniqueCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "cuisines_uniqueCode_key" ON "cuisines"("uniqueCode");

-- CreateIndex
CREATE UNIQUE INDEX "cultures_uniqueCode_key" ON "cultures"("uniqueCode");

-- CreateIndex
CREATE UNIQUE INDEX "ethnicgroups_uniqueCode_key" ON "ethnicgroups"("uniqueCode");

-- CreateIndex
CREATE UNIQUE INDEX "provinces_uniqueCode_key" ON "provinces"("uniqueCode");

-- CreateIndex
CREATE UNIQUE INDEX "regionalsongs_uniqueCode_key" ON "regionalsongs"("uniqueCode");
