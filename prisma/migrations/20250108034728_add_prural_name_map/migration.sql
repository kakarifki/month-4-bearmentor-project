/*
  Warnings:

  - You are about to drop the `Cuisine` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Culture` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EthnicGroup` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Province` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RegionalSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cuisine" DROP CONSTRAINT "Cuisine_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "Culture" DROP CONSTRAINT "Culture_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "EthnicGroup" DROP CONSTRAINT "EthnicGroup_provinceId_fkey";

-- DropForeignKey
ALTER TABLE "RegionalSong" DROP CONSTRAINT "RegionalSong_provinceId_fkey";

-- DropTable
DROP TABLE "Cuisine";

-- DropTable
DROP TABLE "Culture";

-- DropTable
DROP TABLE "EthnicGroup";

-- DropTable
DROP TABLE "Province";

-- DropTable
DROP TABLE "RegionalSong";

-- CreateTable
CREATE TABLE "provinces" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capital_city" TEXT NOT NULL,
    "population" INTEGER,
    "area_size" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ethnicgroups" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ethnicgroups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cultures" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cultures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "regionalsongs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "composer" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "regionalsongs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cuisines" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "cuisines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ethnicgroups" ADD CONSTRAINT "ethnicgroups_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cultures" ADD CONSTRAINT "cultures_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "regionalsongs" ADD CONSTRAINT "regionalsongs_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cuisines" ADD CONSTRAINT "cuisines_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "provinces"("id") ON DELETE CASCADE ON UPDATE CASCADE;
