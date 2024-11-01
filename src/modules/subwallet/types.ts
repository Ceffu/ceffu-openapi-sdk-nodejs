import {
  PaginationParams,
  SuccessPaginatedResponse,
  SuccessResponse,
} from "../../types";
import {
  AutoCollection,
  TransactionStatus,
  TransferDirection,
  WalletType,
} from "../../types/enum";
import { Transaction } from "../wallet/types";

export type GetSubWalletListParams = PaginationParams<{
  parentWalletId: string;
}>;

type SubWallet = {
  walletIdStr: string;
  walletId: number;
  walletName: string;
  walletType: WalletType.SubPrime;
};

export type GetSubWalletListResponse = SuccessPaginatedResponse<
  SubWallet & {
    autoCollection: AutoCollection;
    requestId: null;
  }
>;

export type GetSubWalletAssetDetailParams = PaginationParams<{
  walletId: string;
  coinSymbol?: string;
}>;

export type GetSubWalletAssetDetailResponse = SuccessPaginatedResponse<{
  coinSymbol: string;
  network: string | null;
  amount: string;
  availableAmount: string;
  totalAmountWithMirror: string;
}>;

export type GetSubWalletAssetSummaryParams = {
  walletIdStr: string;
};

export type GetSubWalletAssetSummaryResponse = SuccessResponse<{
  walletIdStr: string;
  totalAmountInBTC: string;
  totalAmountInUSD: string;
  lockedAmountInBTC: string;
  data: {
    walletIdStr: string;
    subTotalAmountInBTC: string;
    subTotalAmountInUSD: string;
  }[];
}>;

export type GetSubWalletDepositAddressParams = {
  walletId: string;
  coinSymbol: string;
  network: string;
};

export type GetSubWalletDepositAddressResponse = {
  walletAddress: string;
  memo: string;
};

export type GetSubWalletDepositAddressListParams = PaginationParams<{
  parentWalletId: string;
  coinSymbol: string;
  network: string;
}>;

export type GetSubWalletDepositAddressListResponse = SuccessPaginatedResponse<{
  walletAddress: string;
  memo: string;
  walletId: number;
}>;

export type GetSubWalletDepositHistoryParams = PaginationParams<{
  walletId: string;
  startTime: number;
  endTime: number;
  coinSymbol?: string;
  network?: string;
}>;

export type GetSubWalletDepositHistoryResponse = SuccessPaginatedResponse<
  Omit<Transaction, "walletId"> & {
    walletIdStr: string;
  }
>;

export type GetSubWalletTransferHistoryParams = PaginationParams<{
  walletId: string;
  startTime: number;
  endTime: number;
  coinSymbol?: string;
  network?: string;
  direction: TransferDirection;
}>;

type Transfer = {
  amount: string;
  coinSymbol: string;
  createTime: number;
  direction: TransferDirection;
  fromWalletId: number;
  orderViewId: string;
  requestId?: string | null;
  status: TransactionStatus;
  toWalletId: number;
};

export type GetSubWalletTransferHistoryResponse =
  SuccessPaginatedResponse<Transfer>;

export type GetSubWalletTransferDetailParams = {
  walletIdStr: string;
  orderViewId?: string;
  requestId?: string;
};

export type GetSubWalletTransferDetailResponse = SuccessResponse<Transfer>;

export type PostCreateSubWalletParams = {
  parentWalletId: string;
  walletName?: string;
  autoCollection: AutoCollection;
  requestId?: string;
};

export type PostCreateSubWalletResponse = SubWallet & {
  parentWalletId: number;
  parentWalletIdStr: string;
};

export type PostUpdateSubWalletDetailParams = {
  walletId: string;
  walletName?: string;
  autoCollection?: AutoCollection;
};

export type PostUpdateSubWalletDetailResponse = {
  walletId: number;
  walletName: null | string;
  walletType: WalletType.SubPrime;
  autoCollection: AutoCollection | null;
  parentWalletId: string | null;
};

export type PostTransferFromSubToPrimeParams = {
  fromWalletId: string;
  toWalletId: string;
  amount: string;
  coinSymbol: string;
};

export type PostTransferFromSubToPrimeResponse = {
  orderViewId: string;
  status: TransactionStatus;
  direction: TransferDirection;
};
