import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: DefaultSession["user"] & {
      isAdmin?: boolean;
    };
  }
  interface Profile {
    email_verified?: boolean;
  }
}
