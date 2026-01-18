import { ReminderType, Channel } from "@/lib/generated/prisma/enums";
import { createReminderFormData, Reminder } from "@/app/types/reminder";
import { ChangeEvent, useState, useEffect } from "react";
import { Animal } from "@/app/types/animal";
import Button from "../button";
import { createReminder } from "@/app/serverActions/reminderUtil";
import { useRouter } from "next/navigation";

interface ReminderFormProps {
  animal: Animal;
  prevReminder: Reminder;
  onSuccess?: () => void;
}

export default function ReminderForm({
  animal,
  prevReminder,
  onSuccess,
}: ReminderFormProps) {
  const router = useRouter();
  const [reminder, setReminder] = useState<Reminder>(prevReminder);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const vaccines = animal.vaccines || [];
  const medicines = animal.medicines || [];
  const appointments = animal.appointments || [];

  const handleReminderTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setReminder((prev) => ({ ...prev, type: e.target.value as ReminderType }));
  };
  const handleRemindAtChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReminder((prev) => ({ ...prev, remindAt: new Date(e.target.value) }));
  };
  const handleChannelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setReminder((prev) => ({ ...prev, channel: e.target.value as Channel }));
  };

  const handleEventChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setReminder((prev) => ({
      ...prev,
      vaccineId: reminder.type === ReminderType.VACCINE ? value : "",
      medicineId: reminder.type === ReminderType.MEDICINE ? value : "",
      appointmentId: reminder.type === ReminderType.APPOINTMENT ? value : "",
    }));
  };

  // Verifica quando os IDs são atualizados
  useEffect(() => {
    console.log("Tipo de lembrete:", reminder.type);
    console.log("ID Vacina:", reminder.vaccineId);
    console.log("ID Medicação:", reminder.medicineId);
    console.log("ID Consulta:", reminder.appointmentId);
  }, [reminder.vaccineId, reminder.medicineId, reminder.appointmentId]);

  const handleChange = (field: any) => (e: any) => {
    const { value } = e.target;
    setReminder((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createReminder(createReminderFormData(reminder));
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar lembrete: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Criar lembrete</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Criar lembrete para:</label>
          <select
            value={reminder.type}
            onChange={handleReminderTypeChange}
            required
            className={inputClass}
          >
            <option value={ReminderType.UNKNOWN}>Selecione...</option>
            <option value={ReminderType.APPOINTMENT}>Consulta</option>
            <option value={ReminderType.MEDICINE}>Medicação</option>
            <option value={ReminderType.VACCINE}>Vacinação</option>
          </select>
        </div>
        <div>
          <label>Enviar lembrete por:</label>
          <select
            value={reminder.channel}
            onChange={handleChannelChange}
            required
            className={inputClass}
          >
            <option value={Channel.UNKNOWN}>Selecione...</option>
            <option value={Channel.EMAIL}>Email</option>
            <option value={Channel.SITE}>Site</option>
          </select>
        </div>
        <div>
          <label>Selecione o evento cadastrado:</label>
          <select
            className={inputClass}
            onChange={handleEventChange}
            value={
              reminder.type === ReminderType.VACCINE
                ? reminder.vaccineId || ""
                : reminder.type === ReminderType.MEDICINE
                  ? reminder.medicineId || ""
                  : reminder.appointmentId || ""
            }
          >
            <option value="">Selecione...</option>
            {reminder.type === ReminderType.VACCINE &&
              vaccines.map((vaccine) => (
                <option key={vaccine.id} value={vaccine.id}>
                  {vaccine.name}
                </option>
              ))}
            {reminder.type === ReminderType.MEDICINE &&
              medicines.map((medicine) => (
                <option key={medicine.id} value={medicine.id}>
                  {medicine.name}
                </option>
              ))}
            {reminder.type === ReminderType.APPOINTMENT &&
              appointments.map((appointment) => (
                <option key={appointment.id} value={appointment.id}>
                  {appointment.clinic}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Lembrar em:</label>
          <input
            type="date"
            value={reminder.remindAt.toISOString().split("T")[0]}
            onChange={handleRemindAtChange}
            required
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="active"
            checked={reminder.active}
            onChange={handleChange("active")}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="active" className="text-sm text-gray-700 select-none">
            Ativar lembrete
          </label>
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Lembrete"}
          </Button>
        </div>
      </form>
    </div>
  );
}
