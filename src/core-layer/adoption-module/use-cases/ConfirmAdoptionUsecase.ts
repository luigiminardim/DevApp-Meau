export interface ConfirmAdoptionUsecase {
  confirmAdoption(param: {
    animalId: string;
    interestedUserId: string;
  }): Promise<
    { success: true; message: string } | { success: false; message: string }
  >;
}
