import { Constructor } from "../../types";

import {
  GetMirrorXAssetPositionParams,
  GetMirrorXAssetPositionResponse,
  GetMirrorXAvailableAmountParams,
  GetMirrorXAvailableAmountResponse,
  GetMirrorXLinkedListParams,
  GetMirrorXLinkedListResponse,
  GetMirrorXOrderListParams,
  GetMirrorXOrderListResponse,
  PostMirrorXOrderParams,
  PostMirrorXOrderResponse,
} from "./types";

export type MirrorXMethods = {
  getMirrorXLinkedList(
    params: GetMirrorXLinkedListParams
  ): Promise<GetMirrorXLinkedListResponse>;
  getMirrorXOrderList(
    params: GetMirrorXOrderListParams
  ): Promise<GetMirrorXOrderListResponse>;
  getMirrorXAvailableAmount(
    params: GetMirrorXAvailableAmountParams
  ): Promise<GetMirrorXAvailableAmountResponse>;
  getMirrorXAssetPosition(
    params: GetMirrorXAssetPositionParams
  ): Promise<GetMirrorXAssetPositionResponse>;
  postMirrorXOrder(
    params: PostMirrorXOrderParams
  ): Promise<PostMirrorXOrderResponse>;
};

export function mixinMirrorX<T extends Constructor>(
  base: T
): Constructor<MirrorXMethods> & T {
  return class extends base {
    async getMirrorXLinkedList(
      params: GetMirrorXLinkedListParams
    ): Promise<GetMirrorXLinkedListResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/mirrorXLinkId/list",
        method: "GET",
        params,
      });
    }

    async getMirrorXOrderList(
      params: GetMirrorXOrderListParams
    ): Promise<GetMirrorXOrderListResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/order/list",
        method: "GET",
        params,
      });
    }

    async getMirrorXAvailableAmount(
      params: GetMirrorXAvailableAmountParams
    ): Promise<GetMirrorXAvailableAmountResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/order/check",
        method: "GET",
        params,
      });
    }

    async getMirrorXAssetPosition(
      params: GetMirrorXAssetPositionParams
    ): Promise<GetMirrorXAssetPositionResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/positions/list",
        method: "GET",
        params,
      });
    }

    async postMirrorXOrder(
      params: PostMirrorXOrderParams
    ): Promise<PostMirrorXOrderResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/order",
        method: "POST",
        params,
      });
    }
  };
}
