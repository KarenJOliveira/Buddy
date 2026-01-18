"use client";
import { Animal } from "@/app/types/animal";
import Button from "../button";
import { Vaccine } from "@/app/types/vaccine";
import Modal from "../modal";
import { useState } from "react";
import { Plus } from "lucide-react";
import VaccineForm from "./vaccineForm";
interface InfoVacinasProps {
  animal: Animal;
}

const emptyVaccine: Vaccine = {
  id: "",
  name: "",
  appliedAt: new Date(),
  expiresAt: new Date(),
  veterinarian: null,
  notes: null,
  reminderActive: false,
  animalId: "",
};

export default function InfoVacinas({ animal }: InfoVacinasProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const vaccines = animal.vaccines;
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine>(emptyVaccine);
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <div>
        <h2>Informações de Vacinas</h2>
        {vaccines && vaccines.length > 0 ? (
          <ul>
            {vaccines.map((vaccine) => (
              <li key={vaccine.id}>
                <div>
                  <strong>{vaccine.name}</strong>
                </div>
                <div>
                  Data de Aplicação: {vaccine.appliedAt?.toDateString()}
                </div>
                <div>
                  Data de Expiração: {vaccine.expiresAt?.toDateString()}
                </div>
                <div>
                  <Button
                    onClick={() => {
                      setSelectedVaccine(vaccine);
                      setEditMode(true);
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-md font-medium text-sm flex items-center gap-2 transition-colors duration-200"
                  >
                    Editar
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhuma vacina registrada.</p>
        )}
      </div>
      <div>
        <Button
          className="bg-green-500 hover:bg-green-600 text-white w-10 h-10 flex items-center justify-center rounded-full shadow-lg transition-all transform hover:scale-105"
          title="Adicionar nova vacina"
          onClick={() => {
            setSelectedVaccine(emptyVaccine);
            setEditMode(false);
            setIsModalOpen(true);
          }}
        >
          <Plus size={16} strokeWidth={3} />
        </Button>
      </div>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <VaccineForm
            prevVac={selectedVaccine}
            animalId={animal.id}
            editMode={editMode}
            onSuccess={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
