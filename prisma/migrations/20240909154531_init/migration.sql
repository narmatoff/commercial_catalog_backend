/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `ProductOffer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductOffer_sku_key" ON "ProductOffer"("sku");
