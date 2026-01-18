import { Gender } from "@/lib/generated/prisma/enums";
import { Appointment } from "./appointment";
import { Medicine } from "./medicine";
import { Vaccine } from "./vaccine";
import { updateAnimal } from "../serverActions/animalUtil";

export type Species = {
  id: string;
  name: string;
  description: string | null;
};

export const createSpeciesFormData = (species: Species): FormData => {
  const formData = new FormData();
  formData.append("name", species.name);
  if (species.description) {
    formData.append("description", species.description);
  } else {
    formData.append("description", "");
  }
  return formData;
};

// there is a way to use prisma to create this type dinamically we should try later
export type Animal = {
  id: string;
  name: string;
  speciesId: string;
  gender: Gender;
  birthDate: Date;
  weight: number;
  color: string;
  castrated: boolean;
  notes: string | null;
  pictureUrl: string | null;
  ownerId: string;
  vaccines: Vaccine[];
  medicines: Medicine[];
  appointments: Appointment[];
};

export type AnimalWithSpecies = Animal & {
  species: Species;
};

export const createAnimalFormData = (animal: Animal): FormData => {
  const formData = new FormData();
  formData.append("name", animal.name);
  formData.append("speciesId", animal.speciesId);
  formData.append("gender", animal.gender);
  formData.append("birthDate", animal.birthDate.toISOString());
  formData.append("weight", animal.weight.toString());
  formData.append("color", animal.color);
  formData.append("castrated", animal.castrated.toString());
  if (animal.notes) {
    formData.append("notes", animal.notes);
  } else {
    formData.append("notes", "");
  }
  if (animal.pictureUrl) {
    formData.append("pictureUrl", animal.pictureUrl);
  } else {
    formData.append("pictureUrl", "");
  }
  return formData;
};

export const updateAnimalFormData = (animal: Animal): FormData => {
  const formData = new FormData();
  formData.append("id", animal.id);
  formData.append("name", animal.name);
  formData.append("speciesId", animal.speciesId);
  formData.append("gender", animal.gender);
  formData.append("birthDate", animal.birthDate.toISOString());
  formData.append("weight", animal.weight.toString());
  formData.append("color", animal.color);
  formData.append("castrated", animal.castrated.toString());
  if (animal.notes) {
    formData.append("notes", animal.notes);
  } else {
    formData.append("notes", "");
  }
  if (animal.pictureUrl) {
    formData.append("pictureUrl", animal.pictureUrl);
  } else {
    formData.append("pictureUrl", "");
  }
  return formData;
}