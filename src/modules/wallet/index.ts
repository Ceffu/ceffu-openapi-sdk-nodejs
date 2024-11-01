import { Constructor, PaginationParams } from "../../types";

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
      });
    }

    async getAssetDetail(
      params: GetAssetDetailParams
    ): Promise<GetAssetDetailResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/asset/list",
        method: "GET",
        params,
      });
    }

    async getWalletAssetSummary(
      params: GetWalletAssetSummaryParams
    ): Promise<GetWalletAssetSummaryResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/asset/summary",
        method: "GET",
        params,
      });
    }

    async getDepositAddress(
      params: GetDepositAddressParams
    ): Promise<GetDepositAddressResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/deposit/address",
        method: "GET",
        params,
      });
    }

    async getDepositHistory(
      params: GetDepositHistoryParams
    ): Promise<GetDepositHistoryResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/deposit/history",
        method: "GET",
        params,
      });
    }

    async getDepositDetail(
      params: GetDepositDetailParams
    ): Promise<GetDepositDetailResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/deposit/detail",
        method: "GET",
        params,
      });
    }

    async getWithdrawalFee(
      params: GetWithdrawalFeeParams
    ): Promise<GetWithdrawalFeeResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/withdrawal/fee",
        method: "GET",
        params,
      });
    }

    async getWithdrawalHistory(
      params: GetWithdrawalHistoryParams
    ): Promise<GetWithdrawalHistoryResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/withdrawal/history",
        method: "GET",
        params,
      });
    }

    async getWithdrawalDetail(
      params: GetWithdrawalDetailParams
    ): Promise<GetWithdrawalDetailResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/withdrawal/detail",
        method: "GET",
        params,
      });
    }

    async postCreateWallet(
      params: PostCreateWalletParams
    ): Promise<PostCreateWalletResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/create",
        method: "POST",
        params,
      });
    }

    async postUpdateWalletDetail(
      params: PostUpdateWalletDetailParams
    ): Promise<PostUpdateWalletDetailResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/updateWallet",
        method: "POST",
        params,
      });
    }

    async postWithdrawal(
      params: PostWithdrawalParams
    ): Promise<PostWithdrawalResponse> {
      return await this.request({
        url: "/open-api/v2/wallet/withdrawal",
        method: "POST",
        params,
      });
    }

    async postTransactionHistory(
      params: PostTransactionHistoryParams
    ): Promise<PostTransactionHistoryResponse> {
      return await this.request({
        url: "/open-api/v1/wallet/transaction/history",
        method: "POST",
        params,
      });
    }
  };
}
