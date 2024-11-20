import dayjs from "dayjs";
import Joi from "joi";

import { Constructor } from "../../types";
import { validWebhookEventType } from "../../types/schema";

import {
  PostResendWebhookNotificationParams,
  PostResendWebhookNotificationResponse,
} from "./types";

export type WebhookMethods = {
  postResendWebhookNotification(
    params: PostResendWebhookNotificationParams
  ): Promise<PostResendWebhookNotificationResponse>;
};

export function mixinWebhook<T extends Constructor>(
  base: T
): Constructor<WebhookMethods> & T {
  return class extends base {
    async postResendWebhookNotification(
      params: PostResendWebhookNotificationParams
    ): Promise<PostResendWebhookNotificationResponse> {
      return await this.request({
        url: "/open-api/entity/webhook/resend",
        method: "POST",
        params,
        schema: Joi.object({
          webhookId: Joi.string().required(),
          eventType: validWebhookEventType.required(),
          resendFromDateTime: Joi.number().required(),
        })
          .custom((value, helper) => {
            const maxDiffInDay = 180;
            const { resendFromDateTime } = value;
            if (
              dayjs(new Date()).diff(resendFromDateTime, "day", true) >
              maxDiffInDay
            ) {
              return helper.message({
                custom: `Invalid datetime range. Please adjust ≤ ${maxDiffInDay} days`,
              });
            }
            return value;
          })
          .required(),
      });
    }
  };
}
