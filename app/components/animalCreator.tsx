"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { Animal, Species } from "@/app/types/animal";
import { createAnimal, updateAnimal } from "@/app/serverActions/animalUtil";
import { createAnimalFormData, updateAnimalFormData } from "@/app/types/animal";
import Button from "@/app/components/button";
import { Gender } from "@/lib/generated/prisma/enums";
import SpeciesCreator from "./speciesCreator";
import { useRouter } from "next/navigation";

interface AnimalCreatorProps {
  fetchedSpecies: Species[];
  onSuccess?: () => void;
  editMode?: boolean;
  prevAnimal: Animal;
}

export default function AnimalCreator({
  fetchedSpecies,
  onSuccess,
  editMode = false,
  prevAnimal,
}: AnimalCreatorProps) {
  const router = useRouter();

  const emptyAnimal: Animal = {
    id: "",
    name: "",
    speciesId: "",
    gender: Gender.UNKNOWN,
    birthDate: new Date(),
    weight: 0,
    color: "",
    castrated: false,
    notes: "",
    pictureUrl: "",
    ownerId: "",
    vaccines: [],
    medicines: [],
    appointments: [],
  };

  const [animal, setAnimal] = useState(prevAnimal);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [species, setSpecies] = useState<Species[]>(fetchedSpecies);
  const [showSpeciesCreator, setShowSpeciesCreator] = useState(false);

  const handleChange = (field: any) => (e: any) => {
    const { value } = e.target;
    setAnimal((prev) => ({ ...prev, [field]: value }));
  };
  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimal((prev) => ({ ...prev, weight: parseFloat(e.target.value) || 0 }));
  };
  const handleGenderChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAnimal((prev) => ({ ...prev, gender: e.target.value as Gender }));
  };
  const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAnimal((prev) => ({ ...prev, speciesId: e.target.value }));
  };
  const handleCastratedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimal((prev) => ({ ...prev, castrated: e.target.checked }));
  };
  const handleBirthDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnimal((prev) => ({ ...prev, birthDate: new Date(e.target.value) }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editMode) {
        await updateAnimal(updateAnimalFormData(animal));
      } else {
        await createAnimal(createAnimalFormData(animal));
        setAnimal(emptyAnimal);
      }
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpeciesCreated = async () => {
    const response = await fetch("/api/species");
    const updatedSpecies = await response.json();
    setSpecies(updatedSpecies);
    setShowSpeciesCreator(false);
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Nome</label>
            <input
              type="text"
              placeholder="Ex: Rex"
              value={animal.name}
              onChange={handleChange("name")}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Espécie</label>
            <div className="flex gap-2">
              <select
                value={animal.speciesId}
                onChange={handleSpeciesChange}
                required
                className={inputClass}
              >
                <option value="">Selecione...</option>
                {species.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowSpeciesCreator(!showSpeciesCreator)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 rounded-md border border-gray-300 text-lg font-bold"
                title="Criar nova espécie"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {showSpeciesCreator && (
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <SpeciesCreator onSuccess={handleSpeciesCreated} />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Gênero</label>
            <select
              value={animal.gender}
              onChange={handleGenderChange}
              required
              className={inputClass}
            >
              <option value={Gender.UNKNOWN}>Desconhecido</option>
              <option value={Gender.MALE}>Macho</option>
              <option value={Gender.FEMALE}>Fêmea</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Nascimento</label>
            <input
              type="date"
              value={animal.birthDate.toISOString().split("T")[0]}
              onChange={handleBirthDateChange}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Peso (kg)</label>
            <input
              type="number"
              value={animal.weight || ""}
              onChange={handleWeightChange}
              min="0"
              step="0.01"
              required
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Cor</label>
            <input
              type="text"
              value={animal.color}
              onChange={handleChange("color")}
              required
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Foto URL</label>
            <input
              type="url"
              value={animal.pictureUrl || ""}
              onChange={handleChange("pictureUrl")}
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="castrated"
            checked={animal.castrated}
            onChange={handleCastratedChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="castrated"
            className="text-sm text-gray-700 select-none"
          >
            Animal Castrado
          </label>
        </div>

        <div>
          <label className={labelClass}>Observações</label>
          <textarea
            value={animal.notes || ""}
            onChange={handleChange("notes")}
            rows={3}
            className={inputClass}
          />
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Salvando..." : "Salvar Animal"}
          </Button>
        </div>
      </form>
    </div>
  );
}
