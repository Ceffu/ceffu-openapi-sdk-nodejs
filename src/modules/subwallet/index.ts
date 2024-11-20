import dayjs from "dayjs";
import Joi from "joi";

import { Constructor } from "../../types";
import {
  validAutoCollection,
  validPagination,
  validTransferDirection,
} from "../../types/schema";

import {
  GetSubWalletAssetDetailParams,
  GetSubWalletAssetDetailResponse,
  GetSubWalletAssetSummaryParams,
  GetSubWalletAssetSummaryResponse,
  GetSubWalletDepositAddressListParams,
  GetSubWalletDepositAddressListResponse,
  GetSubWalletDepositAddressParams,
  GetSubWalletDepositAddressResponse,
  GetSubWalletDepositHistoryParams,
  GetSubWalletDepositHistoryResponse,
  GetSubWalletListParams,
  GetSubWalletListResponse,
  GetSubWalletTransferDetailParams,
  GetSubWalletTransferDetailResponse,
  GetSubWalletTransferHistoryParams,
  GetSubWalletTransferHistoryResponse,
  PostCreateSubWalletParams,
  PostCreateSubWalletResponse,
  PostTransferFromSubToPrimeParams,
  PostTransferFromSubToPrimeResponse,
  PostUpdateSubWalletDetailParams,
  PostUpdateSubWalletDetailResponse,
} from "./types";

export type SubWalletMethods = {
  getSubWalletList(
    params: GetSubWalletListParams
  ): Promise<GetSubWalletListResponse>;
  getSubWalletAssetDetail(
    params: GetSubWalletAssetDetailParams
  ): Promise<GetSubWalletAssetDetailResponse>;
  getSubWalletAssetSummary(
    params: GetSubWalletAssetSummaryParams
  ): Promise<GetSubWalletAssetSummaryResponse>;
  getSubWalletDepositAddress(
    params: GetSubWalletDepositAddressParams
  ): Promise<GetSubWalletDepositAddressResponse>;
  getSubWalletDepositAddressList(
    params: GetSubWalletDepositAddressListParams
  ): Promise<GetSubWalletDepositAddressListResponse>;
  getSubWalletDepositHistory(
    params: GetSubWalletDepositHistoryParams
  ): Promise<GetSubWalletDepositHistoryResponse>;
  getSubWalletTransferHistory(
    params: GetSubWalletTransferHistoryParams
  ): Promise<GetSubWalletTransferHistoryResponse>;
  getSubWalletTransferDetail(
    params: GetSubWalletTransferDetailParams
  ): Promise<GetSubWalletTransferDetailResponse>;
  postCreateSubWallet(
    params: PostCreateSubWalletParams
  ): Promise<PostCreateSubWalletResponse>;
  postUpdateSubWalletDetail(
    params: PostUpdateSubWalletDetailParams
  ): Promise<PostUpdateSubWalletDetailResponse>;
  postTransferFromSubToPrime(
    params: PostTransferFromSubToPrimeParams
  ): Promise<PostTransferFromSubToPrimeResponse>;
};

export function mixinSubWallet<T extends Constructor>(
  base: T
): Constructor<SubWalletMethods> & T {
  return class extends base {
    async getSubWalletList(
      params: GetSubWalletListParams
    ): Promise<GetSubWalletListResponse> {
      return await this.request({
        url: "/open-api/v2/subwallet/list",
        method: "GET",
        params,
        schema: Joi.object({
          parentWalletId: Joi.string().required(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getSubWalletAssetDetail(
      params: GetSubWalletAssetDetailParams
    ): Promise<GetSubWalletAssetDetailResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/asset/list",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          coinSymbol: Joi.string().optional(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getSubWalletAssetSummary(
      params: GetSubWalletAssetSummaryParams
    ): Promise<GetSubWalletAssetSummaryResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/asset/summary",
        method: "GET",
        params,
        schema: Joi.object({
          walletIdStr: Joi.string().required(),
        }).required(),
      });
    }

    async getSubWalletDepositAddress(
      params: GetSubWalletDepositAddressParams
    ): Promise<GetSubWalletDepositAddressResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/deposit/address",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          network: Joi.string().required(),
          coinSymbol: Joi.string().required(),
        }).required(),
      });
    }

    async getSubWalletDepositAddressList(
      params: GetSubWalletDepositAddressListParams
    ): Promise<GetSubWalletDepositAddressListResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/deposit/address/list",
        method: "GET",
        params,
        schema: Joi.object({
          parentWalletId: Joi.string().required(),
          network: Joi.string().required(),
          coinSymbol: Joi.string().required(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getSubWalletDepositHistory(
      params: GetSubWalletDepositHistoryParams
    ): Promise<GetSubWalletDepositHistoryResponse> {
      return await this.request({
        url: "/open-api/v2/subwallet/deposit/history",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          startTime: Joi.number().required(),
          endTime: Joi.number().required(),
          network: Joi.string().optional(),
          coinSymbol: Joi.string().optional(),
        })
          .custom((value, helper) => {
            const maxDiffInDay = 30;
            const { startTime, endTime } = value;
            if (dayjs(endTime).diff(startTime, "day", true) > maxDiffInDay) {
              return helper.message({
                custom: `Invalid datetime range. Please adjust ≤ ${maxDiffInDay} days`,
              });
            }
            return value;
          })
          .required()
          .concat(validPagination),
      });
    }

    async getSubWalletTransferHistory(
      params: GetSubWalletTransferHistoryParams
    ): Promise<GetSubWalletTransferHistoryResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/transfer/history",
        method: "GET",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          startTime: Joi.number().required(),
          endTime: Joi.number().required(),
          network: Joi.string().optional(),
          coinSymbol: Joi.string().optional(),
          direction: validTransferDirection.optional(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async getSubWalletTransferDetail(
      params: GetSubWalletTransferDetailParams
    ): Promise<GetSubWalletTransferDetailResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/transfer/detail",
        method: "GET",
        params,
        schema: Joi.object({
          walletIdStr: Joi.string().required(),
          orderViewId: Joi.string().optional(),
          requestId: Joi.alternatives(Joi.number(), Joi.string()).optional(),
        })
          .or("orderViewId", "requestId")
          .required(),
      });
    }

    async postCreateSubWallet(
      params: PostCreateSubWalletParams
    ): Promise<PostCreateSubWalletResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/create",
        method: "POST",
        params,
        schema: Joi.object({
          parentWalletId: Joi.string().required(),
          walletName: Joi.string().max(20).optional(),
          autoCollection: validAutoCollection.required(),
          requestId: Joi.alternatives(Joi.number(), Joi.string()).optional(),
        }).required(),
      });
    }

    async postUpdateSubWalletDetail(
      params: PostUpdateSubWalletDetailParams
    ): Promise<PostUpdateSubWalletDetailResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/updateSubWallet",
        method: "POST",
        params,
        schema: Joi.object({
          walletId: Joi.string().required(),
          walletName: Joi.string().max(20).optional(),
          autoCollection: validAutoCollection.optional(),
        }).required(),
      });
    }

    async postTransferFromSubToPrime(
      params: PostTransferFromSubToPrimeParams
    ): Promise<PostTransferFromSubToPrimeResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/transfer",
        method: "POST",
        params,
        schema: Joi.object({
          fromWalletId: Joi.string().required(),
          toWalletId: Joi.string().required(),
          amount: Joi.string().required(),
          coinSymbol: Joi.string().required(),
        }).required(),
      });
    }
  };
}
