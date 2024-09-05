-- CreateEnum
CREATE TYPE "EnumCurrency" AS ENUM ('USD', 'EUR', 'RUB');

-- CreateEnum
CREATE TYPE "EnumColors" AS ENUM ('chernyj', 'leopard', 'ne_zadano', 'krasnyj', 'fioletovyj', 'rozovyj', 'serebro', 'chernyj_s_serebristym', 'serebristyj', 'krasnyj_s_chernym', 'chernyj_s_krasnym', 'serebristyj_s_chernym', 'belyj', 'belyj_s_krasnym', 'cvet_ne_ukazan', 'rozovyj_s_chernym', 'fioletovyj_s_chernym', 'zoloto', 'korichnevyj', 'goluboj', 'bronzovyj', 'sinij_s_chernym', 'prozrachnyj', 'chernyj_s_belym', 'malinovyj', 'chernyj_s_sinim', 'chernyj_s_rozovym', 'malinovyj_s_chyornym', 'chernyj_s_bezhevym', 'bezhevyj', 'tigrovyj', 'belyj_s_chernym', 'oranzhevyj', 'zolotistyj_s_chernym', 'bordovyj', 'izumrudnyj', 'zolotistyj', 'chernyj_s_zolotistym', 'sinij', 'zelenyj', 'goluboj_s_chernym', 'chernyj_s_leopardovym', 'chernyj_s_golubym', 'chernyj_s_zelenym', 'zelenyj_s_chernym', 'telesnyj', 'sirenevyj', 'raznocvetnyj', 'zheltyj', 'lajmovyj', 'salatovyj', 'lilovyj', 'kremovyj', 'dymchatyj', 'seryj', 'belyj_s_zolotym', 'kofejnyj', 'belyj_s_zheltym', 'persikovyj', 'biryuzovyj', 'slivovyj', 'akvamarinovyj', 'molochnyj', 'krasnyj_s_belym', 'rozovyj_s_belym', 'sinij_s_belym', 'myatnyj', 'fioletovyj_s_rozovym', 'belyj_s_golubym', 'belyj_s_rozovym', 'chernyj_s_korallovym', 'pudrovyj', 'zelenyj_s_belym', 'korallovyj', 'chernyj_s_zolotym', 'zheltyj_s_sinim', 'fioletovyj_s_belym', 'bezhevyj_s_rozovym', 'seryj_s_persikovym', 'sinij_s_oranzhevym', 'goluboj_s_belym', 'sinij_s_krasnym', 'chernyj_s_serym', 'sinij_s_rozovym', 'belyj_s_sinim', 'telesnyj_s_chernym', 'chernyj_s_fioletovym', 'belyj_s_serebristym', 'bezhevyj_s_krasnym', 'belyj_s_bezhevym', 'zelenyj_kamuflyazh', 'chernyj_s_zheltym', 'bezhevyj_s_chernym', 'chernaya_shotlandka', 'rozovyj_leopard', 'krasnyj_s_bezhevym', 'kakao', 'chernyj_s_malinovym', 'krasnaya_shotlandka', 'haki', 'sinij_s_golubym', 'seryj_s_rozovym', 'chernyj_s_oranzhevym', 'olivkovyj', 'terrakotovyj', 'rozovyj_s_sinim', 'seryj_s_chyornym', 'rozovyj_s_krasnym', 'krasnyj_s_sinim', 'sinij_s_sirenevym', 'rozovyj_s_oranzhevym', 'rozovaya_shotlandka', 'goluboj_s_rozovym', 'seryj_leopard', 'goluboj_leopard', 'telesnyj_s_rozovym', 'sinyaya_shotlandka', 'seryj_s_bezhevym', 'belyj_s_zelenym', 'goluboj_s_sinim', 'zebra', 'chernyj_s_lajmovym', 'persikovyj_s_chernym', 'krasnyj_s_serym', 'belyj_s_serym', 'bezhevyj_s_belym', 'biryuzovyj_s_chernym', 'sinij_kamuflyazh', 'goluboj_s_zelenym', 'kremovyj_s_chernym', 'belyj_s_zolotistym', 'seryj_melanzh', 'seryj_s_zhyoltym', 'seryj_s_golubym', 'seryj_s_belym', 'seryj_s_sinim', 'sinij_s_serym', 'oranzhevyj_s_chernym', 'sinij_melanzh', 'zelenaya_shotlandka', 'bezhevyj_s_golubym', 'bezhevyj_melanzh', 'rozovyj_melanzh', 'rozovyj_s_serym', 'kofejnyj_s_chernym', 'mokryj_asfalt', 'sinij_s_zheltym', 'sinij_s_zelenym');

-- CreateTable
CREATE TABLE "ProductOffers" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "prodId" INTEGER NOT NULL,
    "sku" INTEGER NOT NULL,
    "barcode" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "WholePrice" DOUBLE PRECISION NOT NULL,
    "basewholeprice" DOUBLE PRECISION NOT NULL,
    "qty" INTEGER NOT NULL,
    "shippingdate" TIMESTAMP(3) NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "colorName" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "SuperSale" BOOLEAN NOT NULL,
    "p5s_stock" BOOLEAN NOT NULL,
    "StopPromo" BOOLEAN NOT NULL,
    "bruttoLength" DOUBLE PRECISION NOT NULL,
    "bruttoWidth" DOUBLE PRECISION NOT NULL,
    "bruttoHeight" DOUBLE PRECISION NOT NULL,
    "currency" "EnumCurrency" NOT NULL DEFAULT 'RUB',

    CONSTRAINT "ProductOffers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductColors" (
    "id" SERIAL NOT NULL,
    "colorName" TEXT NOT NULL,
    "color" "EnumColors" NOT NULL,
    "colorUrl" TEXT NOT NULL,

    CONSTRAINT "ProductColors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductOffers_prodId_key" ON "ProductOffers"("prodId");

-- AddForeignKey
ALTER TABLE "ProductOffers" ADD CONSTRAINT "ProductOffers_prodId_fkey" FOREIGN KEY ("prodId") REFERENCES "Product"("prodId") ON DELETE RESTRICT ON UPDATE CASCADE;
