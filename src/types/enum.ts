export enum WalletType {
  Qualified = 10,
  Cosign = 12,
  Prime = 20,
  SubPrime = 21,
}

export enum SystemStatus {
  Normal = 0,
  Maintenance = 1,
}

export enum TransactionDirection {
  Deposit = 10,
  Withdrawal = 20,
}

export enum TransactionStatus {
  Pending = 10,
  Processing = 20,
  SendSuccess = 30,
  Confirmed = 40,
  Failed = 99,
}

export enum TransferType {
  OnChainTransfer = 10,
  OffChainTransfer = 20,
}

export enum BizType {
  Withdrawal = 10,
  Deposit = 15,
  Convert = 20,
  MirrorSettle = 30,
  Billing = 40,
  Transfer = 50,
  StakingDelegate = 60,
  StakingUndelegate = 61,
  StakingRewards = 62,
  DefiApprove = 71,
  DefiStake = 72,
  DefiUnstake = 73,
  DefiExtend = 74,
  DefiConvertToLock = 75,
  DefiConvertToFlexible = 76,
  DefiClaimRewards = 77,
  DefiClaimUnboundRewards = 770,
  DefiRestake = 78,
  DefiRedelegate = 79,
  MirrorXDelegation = 3110,
  MirrorXUndelegation = 3120,
  MirrorXSettlement = 3130,
}

export enum AutoCollection {
  Off = 0,
  On = 1,
}

export enum TransferDirection {
  ParentToSub = 10,
  SubToParent = 20,
  SubToSub = 30,
  PrimeToPrime = 40,
  AutoCollection = 70,
}

export enum MirrorXLinkedStatus {
  UnderReview = 0,
  Approved = 1,
  Rejected = 2,
  Approving = 3,
  Unbinding = 4,
  Unbounded = 5,
  Processing = 10,
  RequestRejected = 11,
  RequestExpired = 12,
  RequestCancelled = 13,
}

export enum MirrorXOrderType {
  Delegation = 10,
  Undelegation = 20,
  Settlement = 30,
}

export enum MirrorXOrderStatus {
  Pending = 10,
  InProgress = 20,
  Success = 30,
  Failed = 99,
}

export enum WebhookEventType {
  DepositSuccess = 1,
  DepositFailed = 2,
  WithdrawalSuccess = 3,
  WithdrawalFailed = 4,
}
