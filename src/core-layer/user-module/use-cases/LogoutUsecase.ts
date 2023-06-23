export interface LogoutUsecase {
  logout(): Promise<{ type: "success" } | { type: "error"; error: string }>;
}

export class LogoutUsecaseImpl implements LogoutUsecase {
  /** @todo */
  logout: LogoutUsecase["logout"] = async () => {
    return { type: "success" };
  };
}
