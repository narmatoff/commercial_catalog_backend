import { EnumResultStatus, EnumResultStatusMessage } from '../enum/order.enum';

export const getResultStatusMessage = (
  status: EnumResultStatus,
): EnumResultStatusMessage => {
  let message: EnumResultStatusMessage;

  switch (status) {
    case EnumResultStatus.Ok:
      message = EnumResultStatusMessage.Ok;
      break;
    case EnumResultStatus.BadApiKey:
      message = EnumResultStatusMessage.BadApiKey;
      break;
    case EnumResultStatus.BadOrderRequest:
      message = EnumResultStatusMessage.BadOrderRequest;
      break;
    case EnumResultStatus.NotAtStockSomeOffers:
      message = EnumResultStatusMessage.NotAtStockSomeOffers;
      break;
    case EnumResultStatus.TestMode:
      message = EnumResultStatusMessage.TestMode;
      break;
    case EnumResultStatus.DropShippingAttempt:
      message = EnumResultStatusMessage.DropShippingAttempt;
      break;
    case EnumResultStatus.DuplicateExtOrderID:
      message = EnumResultStatusMessage.DuplicateExtOrderID;
      break;
    case EnumResultStatus.MissingExtOrderID:
      message = EnumResultStatusMessage.MissingExtOrderID;
      break;
    case EnumResultStatus.InvalidExtDateOfAdded:
      message = EnumResultStatusMessage.InvalidExtDateOfAdded;
      break;
    case EnumResultStatus.MissingExtOrderPaid:
      message = EnumResultStatusMessage.MissingExtOrderPaid;
      break;
    case EnumResultStatus.InvalidExtDeliveryCost:
      message = EnumResultStatusMessage.InvalidExtDeliveryCost;
      break;
    case EnumResultStatus.MissingExtDeliveryCost:
      message = EnumResultStatusMessage.MissingExtDeliveryCost;
      break;
    case EnumResultStatus.MissingDeliveryMethod:
      message = EnumResultStatusMessage.MissingDeliveryMethod;
      break;
    case EnumResultStatus.MissingBuyerFio:
      message = EnumResultStatusMessage.MissingBuyerFio;
      break;
    case EnumResultStatus.MissingBuyerPhone:
      message = EnumResultStatusMessage.MissingBuyerPhone;
      break;
    case EnumResultStatus.MissingBuyerEmail:
      message = EnumResultStatusMessage.MissingBuyerEmail;
      break;
    case EnumResultStatus.UnknownDeliveryMethod:
      message = EnumResultStatusMessage.UnknownDeliveryMethod;
      break;
    case EnumResultStatus.MissingCityForRussianPost:
      message = EnumResultStatusMessage.MissingCityForRussianPost;
      break;
    default:
      message = EnumResultStatusMessage.UnknownError;
      break;
  }

  return message;
};
