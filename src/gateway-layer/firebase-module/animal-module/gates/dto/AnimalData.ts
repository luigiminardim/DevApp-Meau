export type AnimalData = {
  id: string;
  name: string;
  imageUri: string;
  species: "dog" | "cat";
  sex: "male" | "female";
  size: "small" | "medium" | "big";
  age: "cub" | "adult" | "elderly";
  temperament: {
    playful: boolean;
    shy: boolean;
    calm: boolean;
    guard: boolean;
    loving: boolean;
    lazy: boolean;
    docile: boolean;
  };
  health: {
    vaccinated: boolean;
    dewormed: boolean;
    castrated: boolean;
    sick: boolean;
    sickDescription: string;
  };
  adoptionRequirements: {
    terms: boolean;
    homePhotos: boolean;
    animalPreviousVisit: boolean;
    postAdoptionFollowup: "null" | "1-month" | "3-months" | "6-months";
  };
  commentary: string;
};
