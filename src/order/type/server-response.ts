// Базовый тип для узла с content
type ContentNode<T = string> = {
  content: T;
};

// Базовый тип для узла с children
type ChildrenNode = {
  children: ApiNode[];
};

// Общий тип для узлов API
type ApiNode = ContentNode | ChildrenNode;

// Тип для элементов OrderItems_Item
type OrderItemNode = {
  prodID: ContentNode;
  aID: ContentNode;
  qty: ContentNode;
  itemcost: ContentNode;
  ds_price: ContentNode;
};

// Тип для OrderItems
type OrderItemsNode = {
  OrderItems_Item: ChildrenNode & {
    children: OrderItemNode[];
  };
};

// Тип для корневого ответа
export interface ServerResponse {
  Result: ChildrenNode & {
    children: Array<
      | { ResultStatus: ContentNode }
      | { timestamp: ContentNode }
      | { orderID: ContentNode }
      | { totalSum: ContentNode }
      | { ExtTotalSum: ContentNode }
      | { ExtDeliveryCost: ContentNode }
      | { OrderItems: ChildrenNode & { children: OrderItemsNode[] } }
      | { pickupDate: ContentNode }
    >;
  };
}
