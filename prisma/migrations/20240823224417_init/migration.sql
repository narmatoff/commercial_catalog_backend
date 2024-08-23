/*
  Warnings:

  - A unique constraint covering the columns `[prodId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_prodId_key" ON "Product"("prodId");
