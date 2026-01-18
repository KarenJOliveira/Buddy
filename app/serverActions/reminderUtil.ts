"use server";
import { prisma } from "@/lib/prisma";
import { createReminderSchema, updateReminderSchema } from "@/lib/zodValidators";
import { revalidateTag } from "next/cache";

const createReminder = async (formData: FormData) => {
    let parsedData;

    try {
        parsedData = createReminderSchema.parse({
            type: formData.get("type"),
            channel: formData.get("channel"),
            remindAt: formData.get("remindAt"),
            message: formData.get("message"),
            active: formData.get("active") === "true",
            recurring: formData.get("recurring") === "true",
            vaccineId: formData.get("vaccineId") || undefined,
            medicineId: formData.get("medicineId") || undefined,
            appointmentId: formData.get("appointmentId") || undefined,
        });
    } catch (error) {
        throw new Error("Dados inválidos: " + error);
    }

    try {
        const reminder = await prisma.reminder.create({
            data: {
                type: parsedData.type,
                channel: parsedData.channel,
                remindAt: parsedData.remindAt,
                message: parsedData.message || null,
                active: parsedData.active,
                recurring: parsedData.recurring,
                vaccineId: parsedData.vaccineId || null,
                medicineId: parsedData.medicineId || null,
                appointmentId: parsedData.appointmentId || null,
            },
        });

        revalidateTag("reminders", "default");
        return reminder;
    } catch (error) {
        throw new Error("Erro ao criar lembrete no banco: " + error);
    }

};

const getAllReminders = async () => {
    try {
        const reminders = await prisma.reminder.findMany();
        return reminders;
    } catch (error) {
        throw new Error("Erro ao buscar lembretes: " + error);
    }
}

export { createReminder, getAllReminders };