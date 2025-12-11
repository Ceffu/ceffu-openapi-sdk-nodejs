import dayjs from "dayjs";
import Joi from "joi";

import { Constructor, PaginationParams } from "../../types";
import {
  AddressType,
  Confirmation,
  CorrespondentType,
  ToFromType,
} from "../../types/enum";
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
  GetCorrespondentOptionsResponse,
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
  GetWhitelistedAddressListParams,
  GetWhitelistedAddressListResponse,
  GetWithdrawalDetailParams,
  GetWithdrawalDetailResponse,
  GetWithdrawalFeeParams,
  GetWithdrawalFeeResponse,
  GetWithdrawalHistoryParams,
  GetWithdrawalHistoryResponse,
  PostAddOrEditWhitelistedAddressParams,
  PostAddOrEditWhitelistedAddressResponse,
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
  getWhitelistedAddressList(
    params: GetWhitelistedAddressListParams
  ): Promise<GetWhitelistedAddressListResponse>;
  getCorrespondentOptions(): Promise<GetCorrespondentOptionsResponse>;
  postCreateWallet(
    params: PostCreateWalletParams
  ): Promise<PostCreateWalletResponse>;
  postUpdateWalletDetail(
    params: PostUpdateWalletDetailParams
  ): Promise<PostUpdateWalletDetailResponse>;
  postWithdrawal(params: PostWithdrawalParams): Promise<PostWithdrawalResponse>;
  postTransactionHistory(
    params: PostTransactionHistoryParams
  ): Promise<PostTransactionHistoryResponse>;
  postAddOrEditWhitelistedAddress(
    params: PostAddOrEditWhitelistedAddressParams
  ): Promise<PostAddOrEditWhitelistedAddressResponse>;
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

    async getWhitelistedAddressList(
      params: GetWhitelistedAddressListParams
    ): Promise<GetWhitelistedAddressListResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/pageWhitelist",
        method: "GET",
        params,
        schema: Joi.object({
          addressType: Joi.number()
            .valid(AddressType.Standard, AddressType.Universal)
            .optional(),
          address: Joi.string().optional(),
          label: Joi.string().optional(),
          symbol: Joi.string().optional(),
          network: Joi.string().optional(),
          memo: Joi.string().optional(),
          whitelistId: Joi.string().optional(),
          startTime: Joi.number().optional(),
          endTime: Joi.number().optional(),
          pageLimit: Joi.number().min(1).max(500).optional(),
          pageNo: Joi.number().min(1).optional(),
        }).optional(),
      });
    }

    async getCorrespondentOptions(): Promise<GetCorrespondentOptionsResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/whitelist/options",
        method: "GET",
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

    async postAddOrEditWhitelistedAddress(
      params: PostAddOrEditWhitelistedAddressParams
    ): Promise<PostAddOrEditWhitelistedAddressResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/addWhitelist",
        method: "POST",
        params,
        schema: Joi.object({
          address: Joi.string().required(),
          addressType: Joi.number()
            .valid(AddressType.Standard, AddressType.Universal)
            .optional(),
          correspondentDetail: Joi.object({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            fullName: Joi.string().optional(),
            birthday: Joi.string()
              .pattern(/^\d{4}-\d{2}-\d{2}$/)
              .optional(),
            provider: Joi.string().optional(),
            selfHostedWalletProvider: Joi.string().optional(),
            countryInfo: Joi.string().optional(),
            toFromType: Joi.number()
              .valid(
                ToFromType.VASP,
                ToFromType.SelfHostedWallet,
                ToFromType.Others
              )
              .optional(),
            correspondentType: Joi.number()
              .valid(CorrespondentType.Entity, CorrespondentType.Individual)
              .optional(),
            othersPleaseSpecify: Joi.string().optional(),
            confirmation: Joi.string()
              .valid(Confirmation.Confirmed, Confirmation.Unconfirmed)
              .required(),
          })
            .optional()
            .when("correspondentType", {
              is: CorrespondentType.Individual,
              then: Joi.object({
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                birthday: Joi.string()
                  .pattern(/^\d{4}-\d{2}-\d{2}$/)
                  .required(),
              }),
            })
            .when("correspondentType", {
              is: CorrespondentType.Entity,
              then: Joi.object({ fullName: Joi.string().required() }),
            })
            .when("toFromType", {
              is: ToFromType.VASP,
              then: Joi.object({ provider: Joi.string().required() }),
            })
            .when("toFromType", {
              is: ToFromType.SelfHostedWallet,
              then: Joi.object({
                selfHostedWalletProvider: Joi.string().required(),
              }),
            })
            .when("toFromType", {
              is: ToFromType.Others,
              then: Joi.object({
                othersPleaseSpecify: Joi.string().required(),
              }),
            }),
          label: Joi.string().required(),
          memo: Joi.string().optional(),
          network: Joi.string().required(),
          symbol: Joi.string().required(),
          whitelistId: Joi.string().optional(),
        }).required(),
      });
    }
  };
}
