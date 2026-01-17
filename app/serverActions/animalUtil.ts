"use server";
import { prisma } from "@/lib/prisma";
import { createSpeciesSchema,createAnimalSchema } from "@/lib/zodValidators";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const createSpecies = async (formData: FormData) => {
  let parsedData;

  try {
    parsedData = createSpeciesSchema.parse({
      name: formData.get("name"),
      description: formData.get("description") || "",
    });
  } catch (error) {
    throw new Error("Dados inválidos: " + error);
  }

  try {
    const species = await prisma.species.create({
      data: { ...parsedData, description: parsedData.description || "" },
    });

    revalidateTag("species", "default");
    return species;
  } catch (error) {
    throw new Error("Erro ao criar registro no banco: " + error);
  }
};

const getAllSpecies = async () => {
  try {
    const speciesList = await prisma.species.findMany();
    return speciesList;
  } catch (error) {
    throw new Error("Erro ao buscar espécies: " + error);
  }
}

const createAnimal = async (formData: FormData) => {
  let parsedData;
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }
  const ownerId = session.user.id;

  try {
    parsedData = createAnimalSchema.parse({
      name: formData.get("name"),
      speciesId: formData.get("speciesId"),
      gender: formData.get("gender"),
      birthDate: formData.get("birthDate"),
      weight: formData.get("weight"),
      color: formData.get("color"),
      castrated: formData.get("castrated") === "true",
      notes: formData.get("notes"),
      pictureUrl: formData.get("pictureUrl"),
    });
  } catch (error) {
    throw new Error("Dados inválidos: " + error);
  }

  try {
    const animal = await prisma.animal.create({
      data: {
        name: parsedData.name,
        speciesId: parsedData.speciesId,
        gender: parsedData.gender,
        birthDate: parsedData.birthDate,
        weight: parsedData.weight,
        color: parsedData.color,
        castrated: parsedData.castrated,
        notes: parsedData.notes || "",
        pictureUrl: parsedData.pictureUrl || "",
        ownerId: ownerId,
      },
    });

    revalidateTag("animals", "default");
    return animal;
  } catch (error) {
    throw new Error("Erro ao criar registro no banco: " + error);
  }
};

// this function returns animals with all their relations
const getAnimalsByOwnerId = async (ownerId: string) => {
  try {
    const animals = await prisma.animal.findMany({
      where: { ownerId },
      include: {
        species: true,
        vaccines: true,
        medicines: true,
        appointments: true,
      },
    });

    return animals;
  } catch (error) {
    throw new Error("Erro ao buscar animais: " + error);
  }
};

const getAnimalById = async (animalId: string) => {
  try {
    const animal = await prisma.animal.findUnique({
      where: { id: animalId },
      include: {
        species: true,
        vaccines: true,
        medicines: true,
        appointments: true,
      },
    });

    return animal;
  } catch (error) {
    throw new Error("Erro ao buscar animal: " + error);
  }
};

export { createSpecies, getAllSpecies, createAnimal, getAnimalsByOwnerId, getAnimalById };