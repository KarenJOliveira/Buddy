// app/components/animalsList.tsx
import { AnimalWithSpecies } from "@/app/types/animal";
import AnimalCard from "./animalCard";

interface AnimalsListProps {
  userAnimals: AnimalWithSpecies[];
}

export default function AnimalsList({ userAnimals }: AnimalsListProps) {
  if (userAnimals.length === 0) {
    return (
      <div className="text-center py-10 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
        <p className="text-gray-500">Você ainda não tem animais cadastrados.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {userAnimals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  );
}
