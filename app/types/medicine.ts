import { MedicineType } from "@/lib/generated/prisma/enums";

export type Medicine = {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startAt: Date;
  endAt: Date | null;
  type: MedicineType;
  notes: string | null;
  reminderActive: boolean;
  animalId: string;
  appointmentId: string | null;
};
