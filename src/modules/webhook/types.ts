import { SuccessResponse } from "../../types";
import { WebhookEventType } from "../../types/enum";

export type PostResendWebhookNotificationParams = {
  eventType: WebhookEventType;
  resendFromDateTime: number;
  webhookId: string;
};

export type PostResendWebhookNotificationResponse = SuccessResponse<boolean>;
