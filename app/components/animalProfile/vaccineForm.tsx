"use client";
import { getMockVaccines } from "@/mockedData/vaccines";
import {
  createVaccineFormData,
  updateVaccineFormData,
  Vaccine,
} from "@/app/types/vaccine";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import Button from "../button";
import { useRouter } from "next/navigation";
import { createVaccine, updateVaccine } from "@/app/serverActions/vaccineUtil";

interface VaccineFormProps {
  animalId: string;
  prevVac: Vaccine;
  editMode?: boolean;
  onSuccess?: () => void;
}

export default function VaccineForm({
  animalId,
  prevVac,
  editMode,
  onSuccess,
}: VaccineFormProps) {
  const router = useRouter();

  const [vaccine, setVaccine] = useState<Vaccine>(prevVac);
  const vaccinesMock = getMockVaccines();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setVaccine((prev) => ({ ...prev, animalId: animalId }));
  }, [animalId]);

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  const handleNameChange = (e: any) => {
    const { value } = e.target;
    setVaccine((prev) => ({ ...prev, name: value }));
  };

  const handleAppliedAtChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVaccine((prev) => ({ ...prev, appliedAt: new Date(e.target.value) }));
  };

  const handleExpiresAtChange = (e: ChangeEvent<HTMLInputElement>) => {
    setVaccine((prev) => ({ ...prev, expiresAt: new Date(e.target.value) }));
  };

  const handleChange = (field: any) => (e: any) => {
    const { value } = e.target;
    setVaccine((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editMode) {
        await updateVaccine(updateVaccineFormData(vaccine));
      } else {
        await createVaccine(createVaccineFormData(vaccine));
      }
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar vacina: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Nome</label>
          <div>
            <select
              value={vaccine.name}
              onChange={handleNameChange}
              required
              className={inputClass}
            >
              <option value="">Selecione...</option>
              {vaccinesMock.map((vac) => (
                <option key={vac.id} value={vac.name}>
                  {vac.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className={labelClass}>Data de Aplicação</label>
          <input
            type="date"
            value={vaccine.appliedAt.toISOString().split("T")[0]}
            onChange={handleAppliedAtChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Data de Expiração</label>
          <input
            type="date"
            value={vaccine.expiresAt?.toISOString().split("T")[0]}
            onChange={handleExpiresAtChange}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Veterinário(a) Responsável</label>
          <input
            type="text"
            placeholder="Ex: Dr. Silva"
            value={vaccine.veterinarian || ""}
            onChange={handleChange("veterinarian")}
            required
            className={inputClass}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="reminderActive"
            checked={vaccine.reminderActive}
            onChange={handleChange("reminderActive")}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label
            htmlFor="reminderActive"
            className="text-sm text-gray-700 select-none"
          >
            Ativar lembrete
          </label>
        </div>
        <div>
          <label className={labelClass}>Observações</label>
          <textarea
            value={
              vaccine.notes ||
              vaccinesMock.filter((v) => v.name === vaccine.name)[0]
                ?.description ||
              ""
            }
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
