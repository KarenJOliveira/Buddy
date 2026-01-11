"use client";

import { useState } from "react";
import { AnimalWithSpecies, Species } from "@/app/types/animal";
import AnimalsList from "@/app/components/animalsList";
import AnimalCreator from "@/app/components/animalCreator";
import { Plus, X } from "lucide-react";

interface AnimalComponentsWrapperProps {
  userAnimals: AnimalWithSpecies[];
  species: Species[];
}

export default function AnimalComponentsWrapper({
  userAnimals,
  species,
}: AnimalComponentsWrapperProps) {
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Meus Animais</h2>
          {!isCreatorOpen && (
            <button
              onClick={() => setIsCreatorOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all transform hover:scale-105"
              title="Adicionar novo pet"
            >
              <Plus size={24} strokeWidth={3} />
            </button>
          )}
        </div>

        {isCreatorOpen && (
          <div className="relative bg-white p-6 rounded-xl shadow-md border border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
            <button
              onClick={() => setIsCreatorOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Cancelar"
            >
              <X size={20} />
            </button>

            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Novo Pet
            </h3>

            <AnimalCreator
              fetchedSpecies={species}
              onSuccess={() => setIsCreatorOpen(false)}
            />
          </div>
        )}

        <AnimalsList userAnimals={userAnimals} />
      </div>

      <div className="hidden lg:block lg:col-span-1">
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-6 h-full min-h-50 sticky top-4">
          <h3 className="text-gray-800 font-bold mb-3 flex items-center gap-2">
            Lembretes
          </h3>
          <div className="text-sm text-gray-500 space-y-2">
            <p className="italic">
              Próximas vacinas e consultas aparecerão aqui.
            </p>
            <div className="h-2 bg-yellow-200/50 rounded w-3/4"></div>
            <div className="h-2 bg-yellow-200/50 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
