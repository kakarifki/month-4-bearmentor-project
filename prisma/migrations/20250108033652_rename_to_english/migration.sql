/*
  Warnings:

  - You are about to drop the `Budaya` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Kuliner` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LaguDaerah` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Provinsi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Suku` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Budaya" DROP CONSTRAINT "Budaya_id_provinsi_fkey";

-- DropForeignKey
ALTER TABLE "Kuliner" DROP CONSTRAINT "Kuliner_id_provinsi_fkey";

-- DropForeignKey
ALTER TABLE "LaguDaerah" DROP CONSTRAINT "LaguDaerah_id_provinsi_fkey";

-- DropForeignKey
ALTER TABLE "Suku" DROP CONSTRAINT "Suku_id_provinsi_fkey";

-- DropTable
DROP TABLE "Budaya";

-- DropTable
DROP TABLE "Kuliner";

-- DropTable
DROP TABLE "LaguDaerah";

-- DropTable
DROP TABLE "Provinsi";

-- DropTable
DROP TABLE "Suku";

-- CreateTable
CREATE TABLE "Province" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "capital_city" TEXT NOT NULL,
    "population" INTEGER,
    "area_size" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Province_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EthnicGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EthnicGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Culture" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Culture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegionalSong" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "composer" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RegionalSong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cuisine" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "provinceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuisine_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EthnicGroup" ADD CONSTRAINT "EthnicGroup_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Culture" ADD CONSTRAINT "Culture_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegionalSong" ADD CONSTRAINT "RegionalSong_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cuisine" ADD CONSTRAINT "Cuisine_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "Province"("id") ON DELETE CASCADE ON UPDATE CASCADE;
