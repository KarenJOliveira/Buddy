import Image from "next/image";
import bubupuds from "@/app/assets/bubupuds3.jpeg";

export default function InitialPageContainer() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="p-8 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/2 w-full flex flex-col justify-center">
            <h1 className="text-3xl font-bold mb-4">
              Buddy - Cuidando dos animais de estimação do Brasil.
            </h1>
            <h2 className="mb-4">
              O melhor site para gerenciar os cuidados com os seus animais de
              estimação!
            </h2>
          </div>

          <div className="md:w-1/2 w-full flex justify-center">
            <Image
              src={bubupuds}
              alt="BUBU E PUDIM"
              width={585}
              height={414}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Features</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="relative mx-auto pt-8">
              <div className="absolute transform translate-x-2 -translate-y-10 rounded-full w-16 h-16 bg-blue-400 z-10" />

              <div className="bg-neutral-50 p-6 rounded-lg inline-block shadow-sm">
                <h3 className="text-xl font-bold">Feature Title</h3>
                <p>Feature description goes here.</p>
              </div>
            </div>
            <div className="relative mx-auto pt-8">
              <div className="absolute transform translate-x-2 -translate-y-10 rounded-full w-16 h-16 bg-pink-400 z-10" />

              <div className="bg-neutral-100 p-6 rounded-lg inline-block shadow-sm">
                <h3 className="text-xl font-bold">Feature Title</h3>
                <p>Feature description goes here.</p>
              </div>
            </div>
            <div className="relative mx-auto pt-8">
              <div className="absolute transform translate-x-2 -translate-y-10 rounded-full w-16 h-16 bg-green-400 z-10" />

              <div className="bg-neutral-100 p-6 rounded-lg inline-block shadow-sm">
                <h3 className="text-xl font-bold">Feature Title</h3>
                <p>Feature description goes here.</p>
              </div>
            </div>
            <div className="relative mx-auto pt-8">
              <div className="absolute transform translate-x-2 -translate-y-10 rounded-full w-16 h-16 bg-purple-400 z-10" />

              <div className="bg-neutral-100 p-6 rounded-lg inline-block shadow-sm">
                <h3 className="text-xl font-bold">Feature Title</h3>
                <p>Feature description goes here.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
