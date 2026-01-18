import InfoGeral from "@/app/components/animalProfile/infoGeral";
import PageContainer from "@/app/components/pageContainer";
import { Species } from "@/app/types/animal";
import { getAnimalById, getAllSpecies } from "@/app/serverActions/animalUtil";
import getGoogleUserById from "@/app/serverActions/userUtil";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import InfoVacinas from "@/app/components/animalProfile/infoVacinas";
import Button from "@/app/components/button";
import ReminderContainer from "@/app/components/animalProfile/reminderContainer";

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
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Perfil do Animal</h1>
        <p className="text-slate-500">
          Gerencie as informações e saúde do seu pet.
        </p>
      </header>
      <section className="bg-white rounded-3xl shadow-sm border border-orange-100 overflow-hidden">
        <InfoGeral animal={animal} species={species} />
      </section>
      <section className="space-y-4">
        <InfoVacinas animal={animal} />
      </section>

      <section className="pt-4 pb-12">
        <ReminderContainer animal={animal} />
      </section>
    </PageContainer>
  );
}
