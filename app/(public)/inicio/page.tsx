import Header from "@/app/components/header";
import Image from "next/image";
import bubupuds from "@/app/assets/bubupuds3.jpeg";
import PageContainer from "@/app/components/pageContainer";
import Button from "@/app/components/button";
import Link from "next/dist/client/link";
import ResourcesCards from "@/app/components/resourcesCards";
// import InitialPageContainer from "@/app/components/initialPage/initialPageContainer";

export default function InitialPage() {
  const cardsContent = [
    {
      color: "#FF9D00",
      title: "Gerenciamento",
      description: "Organize os dados de saúde de seus animais de estimação.",
      href: "management",
    },
    {
      color: "#FF740F",
      title: "Monitoramento",
      description: "Monitore sintomas, tratamentos e outros.",
      href: "management",
    },
    {
      color: "#9E02E6",
      title: "Histórico",
      description: "Tenha um histórico de saúde do seu animal de estimação.",
      href: "management",
    },
    {
      color: "#EDE500",
      title: "Lembretes",
      description: "Lembre-se de consultas, remédios e vacinas!",
      href: "management",
    },
  ];
  return (
    // <div className="p-32">
    //   <InitialPageContainer />
    // </div>
    <PageContainer>
      <div className="min-h-screen flex flex-col">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-7 lg:grid-rows-2">
          <div className="order-1 flex justify-center lg:order-2 lg:col-span-4 lg:row-span-2">
            <Image
              src={bubupuds}
              alt="BUBU E PUDIM"
              width={585}
              height={414}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="order-2 text-center lg:order-1 lg:col-span-3 lg:row-span-2 lg:text-left">
            <Header>Buddy - Cuidando dos seus animais de estimação</Header>

            <div className="flex flex-col">
              <p className="text-base sm:text-xl leading-relaxed">
                O melhor site para gerenciar os cuidados com os seus animais de
                estimação!
              </p>
              <div className="mt-4 flex justify-center lg:justify-start">
                <Link href="/about">
                  <Button>Saiba mais</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="min-h-[10vh] sm:min-h-[30vh] mx-auto mt-16 mb-12">
          <div className="flex justify-center text-center">
            <Header variant="section">Recursos</Header>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row items-center justify-center mx-auto gap-6 lg:gap-0">
            {cardsContent.map((card) => (
              <ResourcesCards
                key={card.title}
                color={card.color}
                title={card.title}
                description={card.description}
                href={card.href}
              />
            ))}
          </ul>
          <div className="flex justify-center text-center mt-12">
            <Button>Cadastre-se agora</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
