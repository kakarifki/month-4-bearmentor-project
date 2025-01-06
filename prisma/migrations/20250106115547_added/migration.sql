/*
  Warnings:

  - Added the required column `updatedAt` to the `Budaya` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Kuliner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `LaguDaerah` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Provinsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Suku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Budaya" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Kuliner" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LaguDaerah" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Provinsi" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Suku" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
