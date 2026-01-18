export type Vaccine = {
  id: string;
  name: string;
  appliedAt: Date;
  expiresAt: Date | null;
  veterinarian: string | null;
  notes: string | null;
  reminderActive: boolean;
  animalId: string;
};

export const createVaccineFormData = (vaccine: Vaccine): FormData => {
  const formData = new FormData();
  formData.append("name", vaccine.name);
  formData.append("appliedAt", vaccine.appliedAt.toISOString());
  if (vaccine.expiresAt) {
    formData.append("expiresAt", vaccine.expiresAt.toISOString());
  } else {
    formData.append("expiresAt", "");
  }
  if (vaccine.veterinarian) {
    formData.append("veterinarian", vaccine.veterinarian);
  } else {
    formData.append("veterinarian", "");
  }
  if (vaccine.notes) {
    formData.append("notes", vaccine.notes);
  } else {
    formData.append("notes", "");
  }
  formData.append("reminderActive", vaccine.reminderActive.toString());
  formData.append("animalId", vaccine.animalId);
  return formData;
}

export const updateVaccineFormData = (vaccine: Vaccine): FormData => {
  const formData = new FormData();
  formData.append("id", vaccine.id);
  formData.append("name", vaccine.name);
  formData.append("appliedAt", vaccine.appliedAt.toISOString());
  if (vaccine.expiresAt) {
    formData.append("expiresAt", vaccine.expiresAt.toISOString());
  } else {
    formData.append("expiresAt", "");
  }
  if (vaccine.veterinarian) {
    formData.append("veterinarian", vaccine.veterinarian);
  } else {
    formData.append("veterinarian", "");
  }
  if (vaccine.notes) {
    formData.append("notes", vaccine.notes);
  } else {
    formData.append("notes", "");
  }
  formData.append("reminderActive", vaccine.reminderActive.toString());
  formData.append("animalId", vaccine.animalId);
  return formData;
} 