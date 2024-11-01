import crypto from "crypto";

export const sign = (data: string, secret: string) => {
  const privateKey = crypto.createPrivateKey({
    key: Buffer.from(secret, "base64"),
    type: "pkcs8",
    format: "der",
  });
  const sign = crypto.createSign("sha512WithRSAEncryption");
  sign.write(data);
  sign.end();
  const signature = sign.sign(privateKey, "base64");
  return signature;
};
