/*
  Warnings:

  - A unique constraint covering the columns `[colorUrl]` on the table `ProductColor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductColor_colorUrl_key" ON "ProductColor"("colorUrl");
