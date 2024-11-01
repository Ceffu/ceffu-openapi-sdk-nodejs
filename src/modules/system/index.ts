import { Constructor } from "../../types";

import { GetSystemStatusParams, GetSystemStatusResponse } from "./types";

export type SystemMethods = {
  getSystemStatus(
    params: GetSystemStatusParams
  ): Promise<GetSystemStatusResponse>;
};

export function mixinSystem<T extends Constructor>(
  base: T
): Constructor<SystemMethods> & T {
  return class extends base {
    async getSystemStatus(
      params: GetSystemStatusParams
    ): Promise<GetSystemStatusResponse> {
      return await this.request({
        url: "/open-api/v1/system/status",
        method: "GET",
        params,
      });
    }
  };
}
