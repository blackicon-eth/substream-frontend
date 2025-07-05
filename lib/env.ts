import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// https://env.t3.gg/docs/nextjs
export const env = createEnv({
  server: {
    // TURSO
    TURSO_DATABASE_URL: z.string().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
  },
  client: {
    // NEXT.JS
    NEXT_PUBLIC_URL: z.string().min(1),

    // REOWN APP ID
    NEXT_PUBLIC_REOWN_APP_ID: z.string().min(1),

    // ALCHEMY API KEY
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string().min(1),
  },
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_REOWN_APP_ID: process.env.NEXT_PUBLIC_REOWN_APP_ID,
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  },
});
