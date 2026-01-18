"use client";
import { Animal } from "@/app/types/animal";
import Button from "../button";
import { Vaccine } from "@/app/types/vaccine";
import Modal from "../modal";
import { useState } from "react";
import { ChevronRight, Plus, Syringe } from "lucide-react";
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
      <div className="flex justify-between items-center px-2">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Syringe size={20} className="text-orange-500" />
          Histórico de Vacinas
        </h3>
        <button className="text-orange-600 font-semibold text-sm hover:underline flex items-center gap-1">
          Ver todas <ChevronRight size={16} />
        </button>
      </div>
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-orange-100 space-y-4">
        {vaccines && vaccines.length > 0 ? (
          <ul>
            {vaccines.map((vaccine) => (
              <li key={vaccine.id}>
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                  <p className="font-bold text-slate-800">{vaccine.name}</p>
                  <div>
                    <span>
                      Data de Aplicação:{" "}
                      <strong className="text-slate-600">
                        {vaccine.appliedAt?.toDateString()}
                      </strong>
                    </span>
                    <br />
                    <span>
                      Data de Expiração:{" "}
                      <strong className="text-slate-600">
                        {vaccine.expiresAt?.toDateString()}
                      </strong>
                    </span>
                  </div>

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

        <Button
          className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 flex items-center justify-center gap-2 hover:border-orange-200 hover:text-orange-500 transition-all"
          title="Adicionar nova vacina"
          onClick={() => {
            setSelectedVaccine(emptyVaccine);
            setEditMode(false);
            setIsModalOpen(true);
          }}
        >
          <Plus size={18} />
          <span className="font-medium text-sm">Adicionar Vacina</span>
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
