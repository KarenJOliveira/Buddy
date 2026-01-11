import { AnimalWithSpecies } from "@/app/types/animal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

interface AnimalCardProps {
  animal: AnimalWithSpecies;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  const timeZone = "America/Sao_Paulo";

  const formattedBirthDate = animal.birthDate
    ? format(toZonedTime(new Date(animal.birthDate), timeZone), "dd/MM/yyyy", {
        locale: ptBR,
      })
    : "Não informada";

  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white">
      <div className="flex items-center mb-3">
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
        <h3 className="text-lg font-semibold">{animal.name}</h3>
      </div>

      <div className="mb-2">
        <p>
          <span className="font-medium">Espécie:</span> {animal.species.name}
        </p>
        <p>
          <span className="font-medium">Gênero:</span> {animal.gender}
        </p>
        <p>
          <span className="font-medium">Nascimento:</span> {formattedBirthDate}
        </p>
        <p>
          <span className="font-medium">Peso:</span>{" "}
          {animal.weight > 0 ? `${animal.weight} kg` : "Não informado"}
        </p>
        <p>
          <span className="font-medium">Cor:</span>{" "}
          {animal.color || "Não informada"}
        </p>
        <p>
          <span className="font-medium">Castrado:</span>{" "}
          {animal.castrated ? "Sim" : "Não"}
        </p>
      </div>

      {animal.notes && (
        <div className="mt-2">
          <p className="font-medium">Observações:</p>
          <p className="text-sm text-gray-600">{animal.notes}</p>
        </div>
      )}
    </div>
  );
}
