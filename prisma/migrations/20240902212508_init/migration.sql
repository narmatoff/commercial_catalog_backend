/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Category";

-- CreateTable
CREATE TABLE "Catalog" (
    "id" SERIAL NOT NULL,
    "categoryId" INTEGER,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);
