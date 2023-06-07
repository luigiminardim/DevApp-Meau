export interface SignUpUsecase {
  signUpWithPassword(param: {
    email: string;
    password: string;
    name: string;
    age: number;
    state: string;
    city: string;
    address: string;
    phone: string;
    imageUri: string;
  }): Promise<{ type: "success" } | { type: "error"; error: string }>;
}
