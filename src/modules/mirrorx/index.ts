import dayjs from "dayjs";
import Joi from "joi";

import { Constructor } from "../../types";
import { MirrorXOrderType } from "../../types/enum";
import { validMirrorXOrderType, validPagination } from "../../types/schema";

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
        schema: validPagination.optional(),
      });
    }

    async getMirrorXOrderList(
      params: GetMirrorXOrderListParams
    ): Promise<GetMirrorXOrderListResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/order/list",
        method: "GET",
        params,
        schema: Joi.object({
          mirrorXLinkId: Joi.string().required(),
          startTime: Joi.number().required(),
          endTime: Joi.number().required(),
          coinSymbol: Joi.string().optional(),
          orderType: validMirrorXOrderType.optional(),
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

    async getMirrorXAvailableAmount(
      params: GetMirrorXAvailableAmountParams
    ): Promise<GetMirrorXAvailableAmountResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/order/check",
        method: "GET",
        params,
        schema: Joi.object({
          mirrorXLinkId: Joi.string().required(),
          coinSymbol: Joi.string().required(),
          orderType: Joi.number()
            .valid(MirrorXOrderType.Delegation, MirrorXOrderType.Undelegation)
            .required(),
        }).required(),
      });
    }

    async getMirrorXAssetPosition(
      params: GetMirrorXAssetPositionParams
    ): Promise<GetMirrorXAssetPositionResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/positions/list",
        method: "GET",
        params,
        schema: Joi.object({
          mirrorXLinkId: Joi.string().required(),
          excludeZeroAmountFlag: Joi.bool().optional(),
        })
          .required()
          .concat(validPagination),
      });
    }

    async postMirrorXOrder(
      params: PostMirrorXOrderParams
    ): Promise<PostMirrorXOrderResponse> {
      return await this.request({
        url: "/open-api/v1/mirrorX/order",
        method: "POST",
        params,
        schema: Joi.object({
          amount: Joi.string().required(),
          coinSymbol: Joi.string().required(),
          mirrorXLinkId: Joi.string().required(),
          orderType: Joi.number()
            .valid(MirrorXOrderType.Delegation, MirrorXOrderType.Undelegation)
            .required(),
          requestId: Joi.alternatives(Joi.number(), Joi.string()).required(),
        }).required(),
      });
    }
  };
}
