"use client";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { Species } from "@/app/types/animal";
import { createSpecies } from "@/app/serverActions/animalUtil";
import { createSpeciesFormData } from "@/app/types/animal";
import Button from "@/app/components/button";
import PageContainer from "@/app/components/pageContainer";

export default function PetsList() {
  const emptySpecies: Species = { id: "", name: "", description: "" };
  const [species, setSpecies] = useState<Species>(emptySpecies);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: "name" | "description") => (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSpecies((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await createSpecies(createSpeciesFormData(species));
      // toast.success("Espécie criada com sucesso!");
      setSpecies(emptySpecies);
    } catch (error) {
      // toast.error("Erro ao salvar a espécie: " + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="flex-1 flex flex-col min-h-0"
        >
          <div className="flex-1 overflow-y-auto min-h-0">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome da Especie
            </label>
            <input
              className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="name"
              id="name"
              placeholder="Digite o nome da espécie"
              value={species.name}
              onChange={handleChange("name")}
              required
            />
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Descrição da Especie
            </label>
            <input
              className="w-full text-gray-800 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              name="description"
              id="description"
              placeholder="Digite a descrição da espécie"
              value={species.description || ""}
              onChange={handleChange("description")}
              required
            />
          </div>

          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </form>
      </div>
    </PageContainer>
  );
}
