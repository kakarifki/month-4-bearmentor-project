/*
  Warnings:

  - Changed the type of `category` on the `cultures` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CultureCategory" AS ENUM ('DANCE', 'TRADITIONAL_CLOTHING', 'TRADITIONAL_HOUSE');

-- AlterTable
ALTER TABLE "cultures" DROP COLUMN "category",
ADD COLUMN     "category" "CultureCategory" NOT NULL;
