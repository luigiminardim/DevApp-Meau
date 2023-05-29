export interface LoginUsecase {
  loginWithPassword(param: {
    username: string;
    password: string;
  }): Promise<{ type: "success" } | { type: "error" }>;
  createUser(param: {
    username: string;
    password: string;
  }): Promise<{ type: "success" } | { type: "error" }>;
}
