import { ReminderType, Channel } from "@/lib/generated/prisma/enums";

export type Reminder = {
  id: string;
  remindAt: Date;
  type: ReminderType;
  channel: Channel;
  message: string | null;
  active: boolean;
  recurring: boolean;
  vaccineId: string | null;
  medicineId: string | null;
  appointmentId: string | null;
};

export const createReminderFormData = (reminder: Reminder): FormData => {
  const formData = new FormData();
  formData.append("type", reminder.type);
  formData.append("channel", reminder.channel);
  formData.append("remindAt", reminder.remindAt.toISOString());
  if (reminder.message) {
    formData.append("message", reminder.message);
  } else {
    formData.append("message", "");
  }
  formData.append("active", reminder.active.toString());
  formData.append("recurring", reminder.recurring.toString());
  if (reminder.vaccineId) {
    formData.append("vaccineId", reminder.vaccineId);
  }
  if (reminder.medicineId) {
    formData.append("medicineId", reminder.medicineId);
  }
  if (reminder.appointmentId) {
    formData.append("appointmentId", reminder.appointmentId);
  }
  return formData;
};