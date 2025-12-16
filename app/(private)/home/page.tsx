import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession();
  if (!session) {
    redirect("/inicio");
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h1>Welcome to Buddy {session.user?.name}!</h1>
    </div>
  );
}
