/*
  Warnings:

  - You are about to drop the column `lefts` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `ProductColors` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProductOffers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductOffers" DROP CONSTRAINT "ProductOffers_prodId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "lefts",
ALTER COLUMN "isNew" SET DEFAULT false,
ALTER COLUMN "isBestseller" SET DEFAULT false,
ALTER COLUMN "imgStatus" SET DEFAULT false;

-- DropTable
DROP TABLE "ProductColors";

-- DropTable
DROP TABLE "ProductOffers";

-- DropEnum
DROP TYPE "EnumColors";

-- CreateTable
CREATE TABLE "ProductOffer" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prodId" INTEGER NOT NULL,
    "sku" INTEGER NOT NULL,
    "barcode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "WholePrice" DOUBLE PRECISION NOT NULL,
    "basewholeprice" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "shippingdate" TEXT,
    "weight" DOUBLE PRECISION,
    "colorName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT,
    "SuperSale" BOOLEAN,
    "p5s_stock" BOOLEAN NOT NULL DEFAULT false,
    "StopPromo" BOOLEAN NOT NULL DEFAULT false,
    "bruttoLength" DOUBLE PRECISION,
    "bruttoWidth" DOUBLE PRECISION,
    "bruttoHeight" DOUBLE PRECISION,
    "currency" "EnumCurrency" NOT NULL DEFAULT 'RUB',

    CONSTRAINT "ProductOffer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductColor" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "colorName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "colorUrl" TEXT NOT NULL,

    CONSTRAINT "ProductColor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductOffer_prodId_key" ON "ProductOffer"("prodId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductColor_colorUrl_key" ON "ProductColor"("colorUrl");

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_color_fkey" FOREIGN KEY ("color") REFERENCES "ProductColor"("colorUrl") ON DELETE RESTRICT ON UPDATE CASCADE;
