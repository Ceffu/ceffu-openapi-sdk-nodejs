import { SuccessResponse } from "../../types";
import { BizType, SystemStatus, WalletType } from "../../types/enum";

export type GetSystemStatusParams = {
  bizType: BizType;
  walletType: WalletType;
};

export type GetSystemStatusResponse = SuccessResponse<{
  status: SystemStatus;
  message: string;
}>;
