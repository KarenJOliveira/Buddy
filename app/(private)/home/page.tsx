import PageContainer from "@/app/components/pageContainer";
import { redirect } from "next/dist/client/components/navigation";
import { getServerSession } from "next-auth/next";
import {
  getAllSpecies,
  getAnimalsByOwnerId,
} from "@/app/serverActions/animalUtil";
import AnimalCreator from "../../components/animalCreator";
import AnimalsList from "@/app/components/animalsList";
import { Animal, AnimalWithSpecies, Species } from "@/app/types/animal";
import AnimalComponentsWrapper from "@/app/components/animalComponentsWrapper";

const HomePage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/login");
  }
  const userId = session.user.id;
  const userAnimals: AnimalWithSpecies[] = await getAnimalsByOwnerId(userId);
  // get10PetsReminders(userAnimals);
  const species: Species[] = await getAllSpecies();

  return (
    <PageContainer>
      <AnimalComponentsWrapper userAnimals={userAnimals} species={species} />
      {/* nextReminders */}
    </PageContainer>
  );
};

export default HomePage;
