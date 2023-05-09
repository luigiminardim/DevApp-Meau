export interface SignUpUsecase {
  signUpWithPassword(param: {
    name: string;
    age: string;
    email: string;
    state: string;
    city: string;
    address: string;
    phone: string;
    username: string;
    password: string;
  }): Promise<{ type: "success" } | { type: "error" }>;
}
