import { createServerFn } from "@tanstack/react-start";
import crypto from "crypto";

/**
 * Server function to securely generate ImageKit upload signature.
 * Expodes: token, expire, signature.
 * Prevents the private key from being exposed to the client browser.
 */
export const getImageKitAuthSignature = createServerFn({ method: "GET" })
  .handler(async () => {
    const privateKey = "private_j5sZzXeoD3oZU+n99L9VLJYkY4A=";
    
    // Generate a unique token
    const token = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
    
    // Set expiration time to 30 minutes from now (in seconds)
    const expire = Math.floor(Date.now() / 1000) + 1800;

    // Generate HMAC-SHA1 signature
    const signature = crypto
      .createHmac("sha1", privateKey)
      .update(token + expire)
      .digest("hex");

    return {
      token,
      expire,
      signature,
    };
  });
