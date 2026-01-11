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
