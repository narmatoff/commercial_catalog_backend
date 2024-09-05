/*
  Warnings:

  - A unique constraint covering the columns `[color]` on the table `ProductColor` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "ProductOffer" DROP CONSTRAINT "ProductOffer_color_fkey";

-- DropIndex
DROP INDEX "ProductColor_colorUrl_key";

-- CreateIndex
CREATE UNIQUE INDEX "ProductColor_color_key" ON "ProductColor"("color");

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_color_fkey" FOREIGN KEY ("color") REFERENCES "ProductColor"("color") ON DELETE RESTRICT ON UPDATE CASCADE;
