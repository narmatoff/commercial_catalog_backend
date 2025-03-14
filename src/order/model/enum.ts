export enum EnumOrderPaidStatus {
  // 1 - «заказ оплачен Мерчанту»;
  // 0 - «оплата заказа при получении».

  Paid = 1,
  PayOnDelivery = 0,
}

export enum EnumDeliveryOption {
  // 1 - Наш курьер по Москве;
  // 2 - Почта РФ;
  // 4 - Самовывоз Москва, м. Автозаводская;
  // 10 - Курьер по России (СДЭК до двери);
  // 11 - ПВЗ СДЭК по Москве и России;
  // 15 - Почтоматы Почты России. Для этого способа доставки значение ExtOrderPaid всегда должно быть = 1 «заказ оплачен Мерчанту».
  // 16 - курьер Далли (до двери);
  // 17 - Почтоматы и ПВЗ "Халва".

  MoscowCourierDelivery = 1,
  RussianPost = 2,
  MoscowTakeOutAvtozavodskaya = 4,
  CdekToDoorRussiaCourierDelivery = 10,
  CdekPvzRussiaAndMoscow = 11,
  RussianPostParcelTerminals = 15,
  DallyCourier = 16,
  HalvaPostParcelsAndPvz = 17,
}

export enum EnumPackType {
  // Возможные значения (целое число):
  // "1" - обычная,
  // "2" - в коробку.
  // Упаковка в коробку доступна только для следующих способов доставки:
  // 10 - курьер по России (СДЭК до двери);
  // 11 - ПВЗ СДЭК;
  // 15 - Почтоматы Почты России.
  // Если для выбранного способа доставки нельзя применить указанный в запросе тип упаковки, то ставится тип упаковки "обычная", а в ответе в узле messages выводится соответствующая запись.

  Usual = 1,
  InBox = 2,
}
