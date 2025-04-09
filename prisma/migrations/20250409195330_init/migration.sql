-- CreateEnum
CREATE TYPE "EnumCurrency" AS ENUM ('USD', 'EUR', 'RUB');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "telegramId" TEXT NOT NULL,
    "email" TEXT,
    "fio" TEXT,
    "phone" TEXT,
    "isAdult" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prodId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "vendorCode" TEXT NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "infoPrice" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL,
    "batteries" TEXT,
    "pack" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "length" DOUBLE PRECISION,
    "diameter" DOUBLE PRECISION,
    "collection" TEXT,
    "img1" TEXT,
    "img2" TEXT,
    "img3" TEXT,
    "img4" TEXT,
    "img5" TEXT,
    "img6" TEXT,
    "img7" TEXT,
    "img8" TEXT,
    "img9" TEXT,
    "img10" TEXT,
    "categoryId" INTEGER NOT NULL,
    "isNew" BOOLEAN NOT NULL DEFAULT false,
    "isBestseller" BOOLEAN NOT NULL DEFAULT false,
    "function" TEXT,
    "addFunction" TEXT,
    "vibration" TEXT,
    "volume" TEXT,
    "modelYear" INTEGER,
    "imgStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "Catalog" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoryId" INTEGER,
    "parentId" INTEGER,
    "name" TEXT NOT NULL,
    "sort" INTEGER NOT NULL,

    CONSTRAINT "Catalog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "telegramId" TEXT NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BasketItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "basketId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "productOfferId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "BasketItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "telegramId" TEXT NOT NULL,
    "dsOrderId" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegramId_key" ON "User"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Product_prodId_key" ON "Product"("prodId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductOffer_sku_key" ON "ProductOffer"("sku");

-- CreateIndex
CREATE INDEX "ProductOffer_prodId_idx" ON "ProductOffer"("prodId");

-- CreateIndex
CREATE INDEX "ProductOffer_sku_idx" ON "ProductOffer"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "ProductColor_color_key" ON "ProductColor"("color");

-- CreateIndex
CREATE UNIQUE INDEX "Catalog_categoryId_key" ON "Catalog"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Basket_telegramId_key" ON "Basket"("telegramId");

-- CreateIndex
CREATE INDEX "Basket_telegramId_idx" ON "Basket"("telegramId");

-- CreateIndex
CREATE INDEX "BasketItem_productId_idx" ON "BasketItem"("productId");

-- CreateIndex
CREATE INDEX "BasketItem_productOfferId_idx" ON "BasketItem"("productOfferId");

-- CreateIndex
CREATE INDEX "BasketItem_basketId_productOfferId_idx" ON "BasketItem"("basketId", "productOfferId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_dsOrderId_key" ON "Order"("dsOrderId");

-- CreateIndex
CREATE INDEX "Order_telegramId_idx" ON "Order"("telegramId");

-- CreateIndex
CREATE INDEX "Order_deletedAt_idx" ON "Order"("deletedAt");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Catalog"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductOffer" ADD CONSTRAINT "ProductOffer_color_fkey" FOREIGN KEY ("color") REFERENCES "ProductColor"("color") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_productOfferId_fkey" FOREIGN KEY ("productOfferId") REFERENCES "ProductOffer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_telegramId_fkey" FOREIGN KEY ("telegramId") REFERENCES "User"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;
