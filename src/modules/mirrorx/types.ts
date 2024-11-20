import {
  PaginationParams,
  SuccessPaginatedResponse,
  SuccessResponse,
} from "../../types";
import {
  MirrorXLinkedStatus,
  MirrorXOrderStatus,
  MirrorXOrderType,
} from "../../types/enum";

export type GetMirrorXLinkedListParams = PaginationParams;

export type GetMirrorXLinkedListResponse = SuccessPaginatedResponse<{
  binanceUID: string;
  createDate: string;
  label?: string | null;
  mirrorXLinkId: string;
  status: MirrorXLinkedStatus;
  walletIdStr: string;
}>;

export type GetMirrorXOrderListParams = PaginationParams<{
  mirrorXLinkId: string;
  startTime: number;
  endTime: number;
  coinSymbol?: string;
  orderType?: MirrorXOrderType;
}>;

export type GetMirrorXOrderListResponse = SuccessPaginatedResponse<{
  amount: string;
  binanceUID: string;
  coinSymbol: string;
  mirrorXLinkId: string;
  orderTime: string;
  orderType: MirrorXOrderType;
  orderViewId: string;
  status: MirrorXOrderStatus;
  walletIdStr: string;
}>;

export type GetMirrorXAvailableAmountParams = {
  mirrorXLinkId: string;
  coinSymbol: string;
  orderType: MirrorXOrderType.Delegation | MirrorXOrderType.Undelegation;
};

export type GetMirrorXAvailableAmountResponse = SuccessResponse<{
  coinSymbol: string;
  maxAvailableAmount: string;
}>;

export type GetMirrorXAssetPositionParams = PaginationParams<{
  mirrorXLinkId: string;
  excludeZeroAmountFlag?: boolean;
}>;

export type GetMirrorXAssetPositionResponse = SuccessPaginatedResponse<{
  binanceUID: string;
  coinSymbol: string;
  mirrorXBalance: string;
  mirrorXLinkId: string;
  walletIdStr: string;
}>;

export type PostMirrorXOrderParams = {
  amount: string;
  coinSymbol: string;
  mirrorXLinkId: string;
  orderType: MirrorXOrderType.Delegation | MirrorXOrderType.Undelegation;
  requestId: string;
};

export type PostMirrorXOrderResponse = {
  orderViewId: string;
  requestId: string;
  status: MirrorXOrderStatus;
};
