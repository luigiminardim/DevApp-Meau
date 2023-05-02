export interface SignUpUsecase {
  signUpWithPassword(param: {
    username: string;
    password: string;
  }): Promise<{ type: "success" } | { type: "error" }>;
}
