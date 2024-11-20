import querystring from "querystring";

import axios, { AxiosError, AxiosInstance } from "axios";
import Joi from "joi";

import { MirrorXMethods, mixinMirrorX } from "./modules/mirrorx";
import { mixinSubWallet, SubWalletMethods } from "./modules/subwallet";
import { mixinSystem, SystemMethods } from "./modules/system";
import { mixinWallet, WalletMethods } from "./modules/wallet";
import { mixinWebhook, WebhookMethods } from "./modules/webhook";
import { Constructor } from "./types";
import { sign } from "./utils";

type APIClientOptions = {
  apiKey: string;
  apiSecret: string;
  baseURL?: string;
  shouldValidate?: boolean;
};

const BaseClass = class {
  axiosInstance: AxiosInstance;
  shouldValidate: boolean;

  constructor(options: APIClientOptions) {
    Joi.assert(
      options,
      Joi.object({
        apiKey: Joi.string().required(),
        apiSecret: Joi.string().required(),
      }).required(),
      {
        allowUnknown: true,
      }
    );

    this.shouldValidate = options.shouldValidate !== false ? true : false;
    this.axiosInstance = axios.create({
      baseURL: options.baseURL || "https://open-api.ceffu.com",
    });
    this.axiosInstance.interceptors.request.use((config) => {
      config.headers["open-apikey"] = options.apiKey;

      if (config.method === "get") {
        config.params = {
          ...(config.params || {}),
          timestamp: new Date().valueOf(),
        };
        config.headers["signature"] = sign(
          querystring.stringify(config.params),
          options.apiSecret
        );
      } else if (config.method === "post") {
        config.data = {
          ...(config.data || {}),
          timestamp: new Date().valueOf(),
        };
        config.headers["signature"] = sign(
          JSON.stringify(config.data),
          options.apiSecret
        );
      }
      return config;
    });
  }

  async request({
    url,
    method,
    params,
    schema,
  }: {
    url: string;
    method: string;
    params?: Record<string, unknown>;
    schema?: Joi.Schema;
  }) {
    if (this.shouldValidate && schema) {
      Joi.assert(params, schema, { allowUnknown: true });
    }
    try {
      const { data, headers } = await this.axiosInstance.request({
        url,
        method,
        [method === "GET" ? "params" : "data"]: params,
      });
      return { ...data, requestId: headers["x-request-id"] };
    } catch (error) {
      const errorResponse = {
        status: 500,
        requestId: null,
        errorCode: null,
        errorMessage: "Something went wrong. Please retry",
      };
      if (error instanceof AxiosError) {
        errorResponse.status = error.status || 500;
        errorResponse.requestId = error.response?.headers["x-request-id"];
        errorResponse.errorCode = error.response?.data.code;
        errorResponse.errorMessage = error.response?.data.message;
      }
      return Promise.reject(errorResponse);
    }
  }
};

type CombinedAPIClient = Constructor<SystemMethods> &
  Constructor<WalletMethods> &
  Constructor<SubWalletMethods> &
  Constructor<MirrorXMethods> &
  Constructor<WebhookMethods> &
  typeof BaseClass;

export const APIClient = [
  mixinSystem,
  mixinWallet,
  mixinSubWallet,
  mixinMirrorX,
  mixinWebhook,
].reduce((result, mixin) => mixin(result), BaseClass as CombinedAPIClient);

export * as Enum from "./types/enum";
