import { Constructor } from "../../types";

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
      });
    }
  };
}
