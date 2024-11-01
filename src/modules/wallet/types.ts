import {
  PaginationParams,
  SuccessPaginatedResponse,
  SuccessResponse,
} from "../../types";
import {
  BizType,
  TransactionDirection,
  TransactionStatus,
  TransferType,
  WalletType,
} from "../../types/enum";

export type GetPrimeWalletSupportedCoinListResponse = SuccessResponse<
  {
    coinFullName: string;
    coinId: number;
    coinSymbol: string;
    depositEnable: boolean;
    networkConfigList: {
      addressRegex?: null | string;
      coinFullName: string;
      coinSymbol: string;
      depositEnable: boolean;
      network: string;
      precision: number;
      withdrawalEnable: boolean;
      withdrawalFee: string;
      withdrawalMax: string;
      withdrawalMin: string;
    }[];
    transferPrecision: number;
    withdrawalEnable: boolean;
  }[]
>;

export type GetQualifiedWalletSupportedCoinListResponse = SuccessResponse<
  {
    addressRegex?: null | string;
    coinFullName?: null | string;
    coinId: number;
    coinSymbol: string;
    depositEnable: boolean;
    network: string;
    precision: number;
    protocol?: null | string;
    withdrawalEnable: boolean;
    withdrawalMax?: null | string;
    withdrawalMin: string;
  }[]
>;

export type GetCosignWalletSupportedCoinListResponse =
  GetQualifiedWalletSupportedCoinListResponse;

type Wallet = {
  walletId: number;
  walletName: string;
  walletType: WalletType;
};

export type GetWalletListResponse = SuccessPaginatedResponse<
  Wallet & {
    walletIdStr: string;
  }
>;

export type GetAssetDetailParams = PaginationParams<{
  coinSymbol?: string;
  network?: string;
  walletId: number;
}>;

export type GetAssetDetailResponse = SuccessPaginatedResponse<{
  amount: string;
  availableAmount: string;
  coinSymbol: string;
  network?: null | string;
  totalAmountWithMirror: string;
}>;

export type GetWalletAssetSummaryParams = {
  walletIdStr: string;
};

export type GetWalletAssetSummaryResponse = SuccessResponse<{
  lockedAmountInBTC?: null | string;
  totalAmountInBTC: string;
  totalAmountInUSD: string;
  walletIdStr: string;
}>;

export type GetDepositAddressParams = {
  coinSymbol?: string;
  network: string;
  walletId: number;
};

export type GetDepositAddressResponse = SuccessResponse<{
  memo: string;
  walletAddress: string;
}>;

export type GetDepositHistoryParams = PaginationParams<{
  coinSymbol?: string;
  endTime: number;
  network?: string;
  startTime: number;
  walletId: number;
}>;

export type Transaction = {
  amount: string;
  coinSymbol: string;
  confirmedBlockCount?: number | null;
  direction: TransactionDirection;
  feeAmount?: null | string;
  feeSymbol?: null | string;
  fromAddress: string;
  maxConfirmBlock?: number | null;
  memo?: null | string;
  network?: null | string;
  orderViewId: string;
  requestId?: null | string;
  status: TransactionStatus;
  toAddress: string;
  transferType?: TransferType;
  txId?: null | string;
  txTime?: number | null;
  unlockConfirm?: number | null;
  walletId: number;
};

type TransactionV2 = Omit<Transaction, "walletId"> & {
  walletStr: string;
};

export type GetDepositHistoryResponse = SuccessPaginatedResponse<Transaction>;

export type GetDepositDetailParams = {
  address?: string;
  memo?: string;
  orderViewId?: string;
  txId?: string;
};

export type GetDepositDetailResponse = SuccessResponse<Transaction>;

export type GetWithdrawalFeeParams = {
  amount?: string;
  coinSymbol: string;
  network: string;
  toWalletIdStr?: string;
  walletId: number;
};

export type GetWithdrawalFeeResponse = SuccessResponse<{
  avlFeeAmount?: null | string;
  fastFeeAmount?: null | string;
  feeAmount: string;
  feeSymbol: string;
  slowFeeAmount?: null | string;
}>;

export type GetWithdrawalHistoryParams = PaginationParams<{
  coinSymbol?: string;
  endTime: number;
  network?: string;
  startTime: number;
  status?: TransactionStatus;
  walletId: number;
}>;

export type GetWithdrawalHistoryResponse =
  SuccessPaginatedResponse<TransactionV2>;

export type GetWithdrawalDetailParams = {
  orderViewId?: string;
  requestId?: string;
};

export type GetWithdrawalDetailResponse = SuccessResponse<TransactionV2>;

export type PostCreateWalletParams = {
  walletName: string;
  walletType: WalletType.Qualified | WalletType.Prime;
  requestId?: string;
};

export type PostCreateWalletResponse = SuccessResponse<
  Wallet & {
    walletIdStr: string;
  }
>;

export type PostUpdateWalletDetailParams = {
  walletId: string;
  walletName?: string;
  requestId?: string | number;
};

export type PostUpdateWalletDetailResponse = SuccessResponse<Wallet>;

export type PostWithdrawalParams = {
  amount: string;
  coinSymbol: string;
  network: string;
  toWalletIdStr: string;
  walletId: string;
  requestId: string | number;
  withdrawalAddress: string;
  customizeFeeAmount?: string;
  memo?: string;
};

export type PostWithdrawalResponse = {
  orderViewId: string;
  status: TransactionStatus;
  transferType: TransferType;
};

export type PostTransactionHistoryParams = PaginationParams<{
  bizTypes?: BizType[];
  endDate: string;
  institutionId: string;
  networks?: string[];
  startDate: string;
  symbols?: string[];
  txId?: string;
  walletIds?: string[];
  walletType: WalletType;
}>;

type AssetLog = {
  amount: string;
  network: string;
  symbol: string;
  transactionType: string;
  ts: number;
  txId: string;
  walletId: string;
  walletName: string;
};

export type PostTransactionHistoryResponse = SuccessPaginatedResponse<AssetLog>;
