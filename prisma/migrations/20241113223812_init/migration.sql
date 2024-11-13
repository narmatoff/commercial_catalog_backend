-- CreateIndex
CREATE INDEX "Basket_telegramId_idx" ON "Basket"("telegramId");

-- CreateIndex
CREATE INDEX "BasketItem_productId_idx" ON "BasketItem"("productId");

-- CreateIndex
CREATE INDEX "BasketItem_productOfferId_idx" ON "BasketItem"("productOfferId");

-- CreateIndex
CREATE INDEX "ProductOffer_prodId_idx" ON "ProductOffer"("prodId");

-- CreateIndex
CREATE INDEX "ProductOffer_sku_idx" ON "ProductOffer"("sku");
