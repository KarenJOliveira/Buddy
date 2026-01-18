import { ReminderType } from "@/lib/generated/prisma/enums";

export type MessageMock = {
  id: string;
  type: ReminderType;
  content: string;
};