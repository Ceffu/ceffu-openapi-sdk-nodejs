import dayjs from "dayjs";
import Joi from "joi";

import { Constructor, PaginationParams } from "../../types";
import {
  validBizType,
  validPagination,
  validParentWalletType,
  validTransactionStatus,
  validWalletType,
  validYearMonthDay,
} from "../../types/schema";

import {
  GetAssetDetailParams,
  GetAssetDetailResponse,
  GetCosignWalletSupportedCoinListResponse,
  GetDepositAddressParams,
  GetDepositAddressResponse,
  GetDepositDetailParams,
  GetDepositDetailResponse,
  GetDepositHistoryParams,
  GetDepositHistoryResponse,
  GetPrimeWalletSupportedCoinListResponse,
  GetQualifiedWalletSupportedCoinListResponse,
  GetWalletAssetSummaryParams,
  GetWalletAssetSummaryResponse,
  GetWalletListResponse,
  GetWithdrawalDetailParams,
  GetWithdrawalDetailResponse,
  GetWithdrawalFeeParams,
  GetWithdrawalFeeResponse,
  GetWithdrawalHistoryParams,
  GetWithdrawalHistoryResponse,
  PostCreateWalletParams,
  PostCreateWalletResponse,
  PostTransactionHistoryParams,
  PostTransactionHistoryResponse,
  PostUpdateWalletDetailParams,
  PostUpdateWalletDetailResponse,
  PostWithdrawalParams,
  PostWithdrawalResponse,
} from "./types";

export type WalletMethods = {
  getPrimeWalletSupportedCoinList(): Promise<GetPrimeWalletSupportedCoinListResponse>;
  getQualifiedWalletSupportedCoinList(): Promise<GetQualifiedWalletSupportedCoinListResponse>;
  getCosignWalletSupportedCoinList(): Promise<GetCosignWalletSupportedCoinListResponse>;
  getWalletList(params: PaginationParams): Promise<GetWalletListResponse>;
  getAssetDetail(params: GetAssetDetailParams): Promise<GetAssetDetailResponse>;
  getWalletAssetSummary(
    params: GetWalletAssetSummaryParams
  ): Promise<GetWalletAssetSummaryResponse>;
  getDepositAddress(
    params: GetDepositAddressParams
  ): Promise<GetDepositAddressResponse>;
  getDepositHistory(
    params: GetDepositHistoryParams
  ): Promise<GetDepositHistoryResponse>;
  getDepositDetail(
    params: GetDepositDetailParams
  ): Promise<GetDepositDetailResponse>;
  getWithdrawalFee(
    params: GetWithdrawalFeeParams
  ): Promise<GetWithdrawalFeeResponse>;
  getWithdrawalHistory(
    params: GetWithdrawalHistoryParams
  ): Promise<GetWithdrawalHistoryResponse>;
  getWithdrawalDetail(
    params: GetWithdrawalDetailParams
  ): Promise<GetWithdrawalDetailResponse>;
};

export function mixinWallet<T extends Constructor>(
  base: T
): Constructor<WalletMethods> & T {
  return class extends base {
    async getPrimeWalletSupportedCoinList(): Promise<GetPrimeWalletSupportedCoinListResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/shared/coin",
        method: "GET",
      });
    }

    async getQualifiedWalletSupportedCoinList(): Promise<GetQualifiedWalletSupportedCoinListResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/qualified/coin",
        method: "GET",
      });
    }

    async getCosignWalletSupportedCoinList(): Promise<GetCosignWalletSupportedCoinListResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/cosign/coin",
        method: "GET",
      });
    }

    async getWalletList(
      params: PaginationParams
    ): Promise<GetWalletListResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/list",
        method: "GET",
        params,
        schema: validPagination,
      });
    }

    async getAssetDetail(
      params: GetAssetDetailParams
    ): Promise<GetAssetDetailResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/asset/list",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          network: Joi.string().optional(),
          coinSymbol: Joi.string().optional(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getWalletAssetSummary(
      params: GetWalletAssetSummaryParams
    ): Promise<GetWalletAssetSummaryResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/asset/summary",
        method: "GET",
        params,
        schema: Joi.object({
          walletIdStr: Joi.string().required(),
        }).required(),
      });
    }

    async getDepositAddress(
      params: GetDepositAddressParams
    ): Promise<GetDepositAddressResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/deposit/address",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          network: Joi.string().required(),
          coinSymbol: Joi.string().optional(),
        }).required(),
      });
    }

    async getDepositHistory(
      params: GetDepositHistoryParams
    ): Promise<GetDepositHistoryResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/deposit/history",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          startTime: Joi.number().required(),
          endTime: Joi.number().required(),
          network: Joi.string().optional(),
          coinSymbol: Joi.string().optional(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getDepositDetail(
      params: GetDepositDetailParams
    ): Promise<GetDepositDetailResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/deposit/detail",
        method: "GET",
        params,
        schema: Joi.object({
          txId: Joi.string().optional(),
          orderViewId: Joi.string().optional(),
          address: Joi.string().optional(),
          memo: Joi.string().optional(),
        })
          .or("txId", "orderViewId")
          .required(),
      });
    }

    async getWithdrawalFee(
      params: GetWithdrawalFeeParams
    ): Promise<GetWithdrawalFeeResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/withdrawal/fee",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          network: Joi.string().required(),
          coinSymbol: Joi.string().required(),
          toWalletIdStr: Joi.string().optional(),
          amount: Joi.string().optional(),
        }).required(),
      });
    }

    async getWithdrawalHistory(
      params: GetWithdrawalHistoryParams
    ): Promise<GetWithdrawalHistoryResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/withdrawal/history",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          startTime: Joi.number().required(),
          endTime: Joi.number().required(),
          network: Joi.string().optional(),
          coinSymbol: Joi.string().optional(),
          status: validTransactionStatus.optional(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getWithdrawalDetail(
      params: GetWithdrawalDetailParams
    ): Promise<GetWithdrawalDetailResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/withdrawal/detail",
        method: "GET",
        params,
        schema: Joi.object({
          orderViewId: Joi.string().optional(),
          requestId: Joi.alternatives(Joi.number(), Joi.string()).optional(),
        })
          .or("orderViewId", "requestId")
          .required(),
      });
    }

    async postCreateWallet(
      params: PostCreateWalletParams
    ): Promise<PostCreateWalletResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/create",
        method: "POST",
        params,
        schema: Joi.object({
          walletName: Joi.string().max(20).required(),
          walletType: validParentWalletType.required(),
          requestId: Joi.alternatives(Joi.number(), Joi.string()).optional(),
        }).required(),
      });
    }

    async postUpdateWalletDetail(
      params: PostUpdateWalletDetailParams
    ): Promise<PostUpdateWalletDetailResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/updateWallet",
        method: "POST",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          walletName: Joi.string().max(20).optional(),
          requestId: Joi.alternatives(Joi.number(), Joi.string()).optional(),
        }).required(),
      });
    }

    async postWithdrawal(
      params: PostWithdrawalParams
    ): Promise<PostWithdrawalResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/withdrawal",
        method: "POST",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          amount: Joi.string().required(),
          network: Joi.string().required(),
          coinSymbol: Joi.string().required(),
          requestId: Joi.string().max(70).required(),
          toWalletIdStr: Joi.string().optional(),
          withdrawalAddress: Joi.string().optional(),
          getCustomizeFeeAmount: Joi.string().optional(),
          memo: Joi.string().optional(),
        })
          .xor("toWalletIdStr", "withdrawalAddress")
          .required(),
      });
    }

    async postTransactionHistory(
      params: PostTransactionHistoryParams
    ): Promise<PostTransactionHistoryResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/transaction/history",
        method: "POST",
        params,
        schema: Joi.object({
          institutionId: Joi.string().required(),
          walletType: validWalletType.required(),
          startDate: validYearMonthDay.required(),
          endDate: validYearMonthDay.required(),
          walletIds: Joi.array().items(Joi.string().required()).optional(),
          networks: Joi.array().items(Joi.string().required()).optional(),
          symbols: Joi.array().items(Joi.string().required()).optional(),
          bizTypes: Joi.array().items(validBizType.required()).optional(),
          txId: Joi.string().optional(),
          pageLimit: Joi.number().min(1).max(100).optional(),
          pageNo: Joi.number().min(1).optional(),
        })
          .custom((value, helper) => {
            const maxDiffInMonth = 3;
            const { startDate, endDate } = value;
            if (dayjs(endDate).diff(startDate, "month") > maxDiffInMonth) {
              return helper.message({
                custom: `Invalid datetime range. Please adjust ≤ ${maxDiffInMonth} months`,
              });
            }
            return value;
          })
          .required(),
      });
    }
  };
}
