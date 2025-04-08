import { EnumResultContentNodes, EnumResultStatus } from '../enum/order.enum';
import { getResultNodeContent } from './get-result-node-content.helper';
import { getResultStatusMessage } from './get-result-status-message.helper';
import { HttpException, HttpStatus } from '@nestjs/common';
import { DsServerApiResponse } from '../type/ds-server-api-response';

export const getDsOrderStatusHelper = (order: DsServerApiResponse) => {
  const resultStatus: EnumResultStatus = Number(
    getResultNodeContent(
      order.Result.children[0],
      EnumResultContentNodes.ResultStatus,
    ),
  );

  const statusMessage = getResultStatusMessage(resultStatus);

  if (resultStatus !== EnumResultStatus.Ok) {
    throw new HttpException(statusMessage, HttpStatus.BAD_REQUEST);
  }
};
