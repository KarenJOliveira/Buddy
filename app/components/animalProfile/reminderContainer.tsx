"use client";
import Button from "../button";
import { useState } from "react";
import Modal from "../modal";
import ReminderForm from "./reminderForm";
import { Channel, ReminderType } from "@/lib/generated/prisma/enums";
import { Reminder } from "@/app/types/reminder";
import { Animal } from "@/app/types/animal";
import { BellPlus } from "lucide-react";
interface ReminderContainerProps {
  animal: Animal;
}

const emptyReminder: Reminder = {
  id: "",
  type: ReminderType.UNKNOWN,
  remindAt: new Date(),
  channel: Channel.UNKNOWN,
  vaccineId: "",
  medicineId: "",
  appointmentId: "",
  message: "",
  active: false,
  recurring: false,
};

export default function ReminderContainer({ animal }: ReminderContainerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <div className="fixed right-12 flex flex-col gap-3">
        <Button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-5 rounded-2xl shadow-xl shadow-orange-100 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-[0.98]"
          onClick={() => setIsModalOpen(true)}
        >
          <BellPlus size={20} />
          <span className="font-bold">Criar Lembrete</span>
        </Button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <ReminderForm
            animal={animal}
            prevReminder={emptyReminder}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
