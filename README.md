# Ceffu OpenAPI SDK for Node.js &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Ceffu/ceffu-openapi-sdk-nodejs/blob/main/LICENSE)

This is a Node.js SDK of [Ceffu OpenAPI](https://apidoc.ceffu.io/apidoc/shared-c9ece2c6-3ab4-4667-bb7d-c527fb3dbf78/doc-338167)

To start with, create an api key on [Ceffu](https://www.ceffu.com) platform. If you do not have an account, please reach to Ceffu at [here](https://www.ceffu.com/get-started).

## Installation

```
// install through npm
npm install ceffu-openapi-sdk

// or install through yarn
yarn add ceffu-openapi-sdk
```

## Example:

```typescript
const { APIClient, Enum } = require("ceffu-openapi-sdk");

const apiKey = "...";
const apiSecret = "...";

const client = new APIClient({
  apiKey,
  apiSecret,
  shouldValidate: true, // switch on/off params validation, default true
});

try {
  const response = await client.getSystemStatus({
    bizType: Enum.BizType.Deposit,
    walletType: Enum.WalletType.Qualified,
  });
  // response: {
  //   data: {...},
  //   code: "000000",
  //   message: "Success",
  //   requestId: "..."
  // }
} catch (error) {
  // handle error
  // error: {
  //   requestId: "...",
  //   status: ...,
  //   errorCode: ...,
  //   errorMessage: ...,
  // }
}
```

## Documentation

You can find the Ceffu OpenAPI documentation at [here](https://apidoc.ceffu.io/apidoc/shared-c9ece2c6-3ab4-4667-bb7d-c527fb3dbf78/doc-338167)

If you require immediate assistance, we recommend you to speak with your Account Manager or contact our Support team. To facilitate debugging, please provide the requestId along with the api request.
