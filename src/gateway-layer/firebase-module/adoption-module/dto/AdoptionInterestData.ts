export type AdoptionInterestData = {
  animalId: string;
  interestedUserId: string;
  messages: {
    sender: string;
    text: string;
  }[];
};
