export enum EnumResultStatus {
  Ok = 1, // "Ok", Запрос выполнен успешно. Заказ размещен.
  BadApiKey = 2, // "Bad key", Проверьте корректность Вашего ApiKey.
  BadOrderRequest = 3, // Не корректные данные в поле order.
  NotAtStockSomeOffers = 4, // Заказ не размещен, Либо каких-то товаров недостаточное количество на нашем складе, либо какие-то aID не найдены в нашей системе.
  TestMode = 5, // Включен тестовый режим. Данные проверены, но заказ не размещается.
  DropShippingAttempt = 6, // Попытка размещения Drop Shipping заказа из под оптового аккаунта не имеющего статус Drop Shipping. Уточните у нашего менеджера - подписан ли Ваш «Договор Прямой Поставки» и зачислен ли депозит на Ваш аккаунт.
  DuplicateExtOrderID = 7, // Внутренний номер DS-заказа (ExtOrderID) не уникален.
  MissingExtOrderID = 8, // Не задан внутренний номер заказа (ExtOrderID).
  InvalidExtDateOfAdded = 9, // Не корректный формат даты размещения заказа ExtDateOfAdded. Корректный формат - YYYY-MM-DD HH:MM:SS.
  MissingExtOrderPaid = 10, // Не указан статус оплаты заказа (ExtOrderPaid).
  InvalidExtDeliveryCost = 11, // Не корректно указана стоимость доставки ExtDeliveryCost. Значение может быть только числом.
  MissingExtDeliveryCost = 12, // Стоимость доставки ExtDeliveryCost не указанa.
  MissingDeliveryMethod = 13, // Не выбран способ доставки заказа dsDelivery.
  MissingBuyerFio = 14, // ФИО покупателя (dsFio) - обязательны для заполнения!
  MissingBuyerPhone = 15, // Телефон покупателя (dsMobPhone) - обязателен для заполнения!
  MissingBuyerEmail = 16, // Email покупателя (dsEmail) - обязателен для заполнения!
  UnknownDeliveryMethod = 17, // Не известный метод доставки. Вероятно вы указали в поле dsDelivery, значение не соответствующее ни одному из обрабатываемых нами.
  MissingCityForRussianPost = 18, // В случае доставки Почтой России, название населенного пункта (dsCity) обязательно для заполнения!
}

export enum EnumResultStatusMessage {
  Ok = 'Заказ размещен.',
  BadApiKey = 'Проверьте корректность Вашего ApiKey',
  BadOrderRequest = 'Не корректные данные в поле order.',
  NotAtStockSomeOffers = 'Заказ не размещен, Либо каких-то товаров недостаточное количество на нашем складе, либо какие-то aID не найдены в нашей системе.',
  TestMode = 'Включен тестовый режим. Данные проверены, но заказ не размещается.',
  DropShippingAttempt = 'Попытка размещения Drop Shipping заказа из под оптового аккаунта не имеющего статус Drop Shipping. Уточните у нашего менеджера - подписан ли Ваш «Договор Прямой Поставки» и зачислен ли депозит на Ваш аккаунт.',
  DuplicateExtOrderID = 'Внутренний номер DS-заказа (ExtOrderID) не уникален.',
  MissingExtOrderID = 'Не задан внутренний номер заказа (ExtOrderID).',
  InvalidExtDateOfAdded = 'Не корректный формат даты размещения заказа ExtDateOfAdded. Корректный формат - YYYY-MM-DD HH:MM:SS.',
  MissingExtOrderPaid = 'Не указан статус оплаты заказа (ExtOrderPaid).',
  InvalidExtDeliveryCost = 'Не корректно указана стоимость доставки ExtDeliveryCost. Значение может быть только числом.',
  MissingExtDeliveryCost = 'Стоимость доставки ExtDeliveryCost не указанa.',
  MissingDeliveryMethod = 'Не выбран способ доставки заказа dsDelivery.',
  MissingBuyerFio = 'ФИО покупателя (dsFio) - обязательны для заполнения!',
  MissingBuyerPhone = 'Телефон покупателя - обязателен для заполнения!',
  MissingBuyerEmail = 'Email покупателя - обязателен для заполнения!',
  UnknownDeliveryMethod = 'Не известный метод доставки. Вероятно вы указали в поле, значение не соответствующее ни одному из обрабатываемых нами.',
  MissingCityForRussianPost = 'В случае доставки Почтой России, название населенного пункта (dsCity) обязательно для заполнения!',
  UnknowError = 'Неизвестный статус.',
}
