"use client";
import { AnimalWithSpecies, Species } from "@/app/types/animal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";
import Button from "../button";
import Modal from "../modal";
import { useState } from "react";
import AnimalCreator from "../animalCreator";

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
    <div>
      <div>
        <h2>Informações Gerais</h2>
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
        <p>Nome: {animal.name}</p>
        <p>Espécie: {animal.species.name}</p>
        <p>Data de Nascimento: {formattedBirthDate}</p>
        <p>Peso: {animal.weight} kg</p>
      </div>
      <div>
        <Button
          className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          Editar
        </Button>
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
