import Joi from "joi";

import {
  AutoCollection,
  BizType,
  MirrorXOrderType,
  TransactionStatus,
  TransferDirection,
  WalletType,
  WebhookEventType,
} from "./enum";

export const validBizType = Joi.number().valid(
  BizType.Withdrawal,
  BizType.Deposit,
  BizType.Convert,
  BizType.MirrorSettle,
  BizType.Billing,
  BizType.Transfer,
  BizType.StakingDelegate,
  BizType.StakingUndelegate,
  BizType.StakingRewards,
  BizType.DefiApprove,
  BizType.DefiStake,
  BizType.DefiUnstake,
  BizType.DefiExtend,
  BizType.DefiConvertToLock,
  BizType.DefiConvertToFlexible,
  BizType.DefiClaimRewards,
  BizType.DefiClaimUnboundRewards,
  BizType.DefiRestake,
  BizType.DefiRedelegate,
  BizType.MirrorXDelegation,
  BizType.MirrorXUndelegation,
  BizType.MirrorXSettlement
);

export const validWalletType = Joi.number().valid(
  WalletType.Qualified,
  WalletType.Cosign,
  WalletType.Prime,
  WalletType.SubPrime
);

export const validParentWalletType = Joi.number().valid(
  WalletType.Qualified,
  WalletType.Prime
);

export const validPagination = Joi.object({
  pageLimit: Joi.number().min(1).max(500).optional(),
  pageNo: Joi.number().min(1).optional(),
});

export const validTransactionStatus = Joi.number().valid(
  TransactionStatus.Pending,
  TransactionStatus.Processing,
  TransactionStatus.SendSuccess,
  TransactionStatus.Confirmed,
  TransactionStatus.Failed
);

export const validYearMonthDay = Joi.string().regex(
  /^\d{4}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/
);

export const validTransferDirection = Joi.number().valid(
  TransferDirection.ParentToSub,
  TransferDirection.SubToParent,
  TransferDirection.SubToSub,
  TransferDirection.PrimeToPrime,
  TransferDirection.AutoCollection
);

export const validAutoCollection = Joi.number().valid(
  AutoCollection.Off,
  AutoCollection.On
);

export const validMirrorXOrderType = Joi.number().valid(
  MirrorXOrderType.Delegation,
  MirrorXOrderType.Settlement,
  MirrorXOrderType.Undelegation
);

export const validWebhookEventType = Joi.number().valid(
  WebhookEventType.DepositSuccess,
  WebhookEventType.DepositFailed,
  WebhookEventType.WithdrawalSuccess,
  WebhookEventType.WithdrawalFailed
);
