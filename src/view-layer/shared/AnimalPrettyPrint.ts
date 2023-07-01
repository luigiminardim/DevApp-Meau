import { Animal } from "../../core-layer/animal-module/entities/Animal";

export default function AnimalPrettyPrint(animal: Animal) {
  let pretty = {
    name: animal.name,
    species: animal.species === "dog" ? "Cachorro" : "Gato",
    sex: animal.sex === "male" ? "Macho" : "Fêmea",
    size:
      animal.size === "big"
        ? "Grande"
        : animal.size === "medium"
        ? "Médio"
        : "Pequeno",
    age:
      animal.age === "adult"
        ? "Adulto"
        : animal.age === "elderly"
        ? "Idoso"
        : "Filhote",
    temperament: "",
    adoptionRequirements: "",
    commentary: animal.commentary,
  };
  return pretty;
}
