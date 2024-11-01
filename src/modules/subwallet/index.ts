import { Constructor } from "../../types";

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
      });
    }

    async getSubWalletAssetDetail(
      params: GetSubWalletAssetDetailParams
    ): Promise<GetSubWalletAssetDetailResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/asset/list",
        method: "GET",
        params,
      });
    }

    async getSubWalletAssetSummary(
      params: GetSubWalletAssetSummaryParams
    ): Promise<GetSubWalletAssetSummaryResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/asset/summary",
        method: "GET",
        params,
      });
    }

    async getSubWalletDepositAddress(
      params: GetSubWalletDepositAddressParams
    ): Promise<GetSubWalletDepositAddressResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/deposit/address",
        method: "GET",
        params,
      });
    }

    async getSubWalletDepositAddressList(
      params: GetSubWalletDepositAddressListParams
    ): Promise<GetSubWalletDepositAddressListResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/deposit/address/list",
        method: "GET",
        params,
      });
    }

    async getSubWalletDepositHistory(
      params: GetSubWalletDepositHistoryParams
    ): Promise<GetSubWalletDepositHistoryResponse> {
      return await this.request({
        url: "/open-api/v2/subwallet/deposit/history",
        method: "GET",
        params,
      });
    }

    async getSubWalletTransferHistory(
      params: GetSubWalletTransferHistoryParams
    ): Promise<GetSubWalletTransferHistoryResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/transfer/history",
        method: "GET",
        params,
      });
    }

    async getSubWalletTransferDetail(
      params: GetSubWalletTransferDetailParams
    ): Promise<GetSubWalletTransferDetailResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/transfer/detail",
        method: "GET",
        params,
      });
    }

    async postCreateSubWallet(
      params: PostCreateSubWalletParams
    ): Promise<PostCreateSubWalletResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/create",
        method: "POST",
        params,
      });
    }

    async postUpdateSubWalletDetail(
      params: PostUpdateSubWalletDetailParams
    ): Promise<PostUpdateSubWalletDetailResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/updateSubWallet",
        method: "POST",
        params,
      });
    }

    async postTransferFromSubToPrime(
      params: PostTransferFromSubToPrimeParams
    ): Promise<PostTransferFromSubToPrimeResponse> {
      return await this.request({
        url: "/open-api/v1/subwallet/transfer",
        method: "POST",
        params,
      });
    }
  };
}
