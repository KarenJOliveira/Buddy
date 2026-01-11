import PageContainer from "@/app/components/pageContainer";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import {
  getAllSpecies,
  getAnimalsByOwnerId,
} from "@/app/serverActions/animalUtil";
import { AnimalWithSpecies, Species } from "@/app/types/animal";
import AnimalComponentsWrapper from "@/app/components/animalComponentsWrapper";

const HomePage = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const userId = session.user.id;
  const userAnimals: AnimalWithSpecies[] = await getAnimalsByOwnerId(userId);
  const species: Species[] = await getAllSpecies();

  return (
    <PageContainer>
      <AnimalComponentsWrapper userAnimals={userAnimals} species={species} />
      {/* next10Reminders */}
    </PageContainer>
  );
};

export default HomePage;
