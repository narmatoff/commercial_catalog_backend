import { EnumResultContentNodes } from '../enum/order.enum';
import { ContentNode, GenericNode } from '../type/ds-server-api-response';

export const getResultNodeContent = (
  node: GenericNode,
  key: EnumResultContentNodes,
) => (node[key] as ContentNode)?.content;
