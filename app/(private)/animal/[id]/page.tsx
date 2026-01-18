import InfoGeral from "@/app/components/animalProfile/infoGeral";
import PageContainer from "@/app/components/pageContainer";
import { Species } from "@/app/types/animal";
import { getAnimalById, getAllSpecies } from "@/app/serverActions/animalUtil";
import getGoogleUserById from "@/app/serverActions/userUtil";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import InfoVacinas from "@/app/components/animalProfile/infoVacinas";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function AnimalPage({ params }: PageProps) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getGoogleUserById(session.user.id);

  const { id } = await params;
  const animal = await getAnimalById(id);
  if (!animal || animal.ownerId !== user.id) {
    redirect("/404");
  }

  const species: Species[] = await getAllSpecies();
  return (
    <PageContainer>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Perfil do Animal</h1>
        <p className="text-gray-500 text-sm mt-1">
          Gerencie as informações e saúde do seu pet.
        </p>
      </div>
      <InfoGeral animal={animal} species={species} />

      <InfoVacinas animal={animal} />
    </PageContainer>
  );
}
