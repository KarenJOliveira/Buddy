"use server";
import { prisma } from "@/lib/prisma";
import { createVaccineSchema, updateVaccineSchema } from "@/lib/zodValidators";
import { revalidateTag } from "next/cache";

const createVaccine = async (formData: FormData) => {
    let parsedData;

    try {
        parsedData = createVaccineSchema.parse({
            name: formData.get("name"),
            appliedAt: formData.get("appliedAt"),
            expiresAt: formData.get("expiresAt"),
            veterinarian: formData.get("veterinarian"),
            notes: formData.get("notes"),
            reminderActive: formData.get("reminderActive") === "true",
            animalId: formData.get("animalId"),
        });
    } catch (error) {
        throw new Error("Dados inválidos: " + error);
    }
    
    try {
        const vaccine = await prisma.vaccine.create({
            data: {
                name: parsedData.name,
                appliedAt: parsedData.appliedAt,
                expiresAt: parsedData.expiresAt,
                veterinarian: parsedData.veterinarian || null,
                notes: parsedData.notes || null,
                reminderActive: parsedData.reminderActive,
                animalId: parsedData.animalId,
            },
        });

        revalidateTag("animal", "default");
        return vaccine;    
    }catch (error) {
        throw new Error("Erro ao criar registro no banco: " + error);
    }
};

const updateVaccine = async (formData: FormData) => {
    let parsedData;

    try {
        const {id, name, appliedAt, expiresAt, veterinarian, notes, reminderActive, animalId} = Object.fromEntries([
            ["id", formData.get("id")],
            ["name", formData.get("name")],
            ["appliedAt", formData.get("appliedAt")],
            ["expiresAt", formData.get("expiresAt")],
            ["veterinarian", formData.get("veterinarian")],
            ["notes", formData.get("notes")],
            ["reminderActive", formData.get("reminderActive") === "true"],
            ["animalId", formData.get("animalId")],
        ]);
        parsedData = updateVaccineSchema.parse({
            id,
            name,
            appliedAt,
            expiresAt,
            veterinarian,
            notes,
            reminderActive,
            animalId,
        });
    }catch (error) {
        throw new Error("Dados inválidos: " + error);
    }

    try{
        const vaccine = await prisma.vaccine.update({
            where: { id: parsedData.id },
            data: {
                name: parsedData.name,
                appliedAt: parsedData.appliedAt,
                expiresAt: parsedData.expiresAt,
                veterinarian: parsedData.veterinarian || null,
                notes: parsedData.notes || null,
                reminderActive: parsedData.reminderActive,
            },
        });

        revalidateTag("animal", "default");
        return vaccine;
    }catch (error) {
        throw new Error("Erro ao atualizar registro no banco: " + error);
    }
};

export { createVaccine, updateVaccine };