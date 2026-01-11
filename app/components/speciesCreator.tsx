"use client";

import { ChangeEvent, useState, KeyboardEvent } from "react";
import { Species } from "@/app/types/animal";
import { createSpecies } from "@/app/serverActions/animalUtil";
import { createSpeciesFormData } from "@/app/types/animal";
import Button from "@/app/components/button";

interface SpeciesCreatorProps {
  onSuccess?: () => void;
}

export default function SpeciesCreator({ onSuccess }: SpeciesCreatorProps) {
  const emptySpecies: Species = {
    id: "",
    name: "",
    description: "",
  };

  const [species, setSpecies] = useState(emptySpecies);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: "name" | "description") =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setSpecies((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSave = async () => {
    if (!species.name.trim()) return;

    setIsSubmitting(true);

    try {
      await createSpecies(createSpeciesFormData(species));
      // toast.success("Espécie criada com sucesso!");
      setSpecies(emptySpecies);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      // toast.error("Erro ao salvar a espécie: " + error);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSave();
    }
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-sm font-semibold text-gray-700">Nova Espécie</h4>

      <div>
        <input
          type="text"
          placeholder="Nome da Espécie"
          value={species.name}
          onChange={handleChange("name")}
          onKeyDown={handleKeyDown}
          className={inputClass}
          required
        />
      </div>

      <div>
        <textarea
          placeholder="Descrição (Opcional)"
          value={species.description || ""}
          onChange={handleChange("description")}
          onKeyDown={handleKeyDown}
          className={inputClass}
          rows={2}
        />
      </div>

      <div className="flex justify-end">
        <Button type="button" onClick={handleSave} disabled={isSubmitting}>
          {isSubmitting ? "Criando..." : "Criar Espécie"}
        </Button>
      </div>
    </div>
  );
}
