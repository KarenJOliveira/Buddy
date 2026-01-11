export type Appointment = {
  id: string;
  dateTime: Date;
  reason: string;
  veterinarian: string | null;
  diagnosis: string | null;
  clinic: string | null;
  notes: string | null;
  reminderActive: boolean;
  animalId: string;
};