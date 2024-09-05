-- AddForeignKey
ALTER TABLE "ProductOffers" ADD CONSTRAINT "ProductOffers_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;
