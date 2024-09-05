/*
  Warnings:

  - A unique constraint covering the columns `[categoryId]` on the table `Catalog` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Catalog_categoryId_key" ON "Catalog"("categoryId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Catalog"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;
