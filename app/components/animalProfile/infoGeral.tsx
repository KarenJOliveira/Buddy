"use client";
import { AnimalWithSpecies, Species } from "@/app/types/animal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import Button from "../button";
import Modal from "../modal";
import { useState } from "react";
import AnimalCreator from "../animalCreator";
import { Calendar, Cat, Dog, Edit2, Weight } from "lucide-react";

interface InfoGeralProps {
  animal: AnimalWithSpecies;
  species: Species[];
}

export default function InfoGeral({ animal, species }: InfoGeralProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const timeZone = "America/Sao_Paulo";

  const formattedBirthDate = animal.birthDate
    ? format(toZonedTime(new Date(animal.birthDate), timeZone), "dd/MM/yyyy", {
        locale: ptBR,
      })
    : "Não informada";
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            {animal.pictureUrl ? (
              <img
                src={animal.pictureUrl}
                alt={`Foto de ${animal.name}`}
                className="w-16 h-16 rounded-full object-cover mr-3"
              />
            ) : (
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mr-3 flex items-center justify-center text-gray-500">
                ?
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white p-1.5 rounded-lg shadow-lg">
              {animal.species?.name === "Cachorro" ? (
                <Dog size={16} />
              ) : (
                <Cat size={16} />
              )}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{animal.name}</h2>
            <p className="text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
              {animal.species?.name}
            </p>
          </div>
        </div>
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
          <Edit2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-slate-50 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <Calendar size={16} />
            <span className="text-sm font-medium">Nascimento</span>
          </div>
          <p className="font-semibold text-slate-700">{formattedBirthDate}</p>
        </div>
        <div className="bg-slate-50 p-4 rounded-2xl">
          <div className="flex items-center gap-2 text-slate-500 mb-1">
            <Weight size={16} />
            <span className="text-sm font-medium">Peso</span>
          </div>
          <p className="font-semibold text-slate-700">{animal.weight}</p>
        </div>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <AnimalCreator
            onSuccess={() => setIsModalOpen(false)}
            fetchedSpecies={species}
            editMode={true}
            prevAnimal={animal}
          />
        </Modal>
      )}
    </div>
  );
}
