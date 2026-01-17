import PageContainer from "@/app/components/pageContainer";
import { getAnimalById } from "@/app/serverActions/animalUtil";
import getGoogleUserById from "@/app/serverActions/userUtil";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

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
  console.log("Animal ID:", id);
  console.log("User ID:", user.id);
  const animal = await getAnimalById(id);
  if (!animal || animal.ownerId !== user.id) {
    redirect("/404");
  }

  return (
    <PageContainer>
      <div>Animal Page</div>
    </PageContainer>
  );
}
