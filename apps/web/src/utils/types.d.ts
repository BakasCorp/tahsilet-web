import "@repo/utils/auth";

declare module "@repo/utils/auth" {
  interface MyUser {
    sub?: string;
  }
}
