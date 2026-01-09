import PageContainer from "@/app/components/pageContainer";
import { getAuthSession } from "@/lib/auth";
import { Edit, User2Icon } from "lucide-react";
import Header from "@/app/components/header";
import Image from "next/image";

//TODO that's a mocked page, most features are still to be implemented
export default async function UserPage() {
  const session = await getAuthSession();

  // here we should check if the requested user id matches the id stored in the JWT so the user can only view their own profile; if it doesn't, redirect
  if (!session?.user) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Você precisa estar logado para ver esta página.</p>
        </div>
      </PageContainer>
    );
  }

  const { name, email, image } = session.user;
  // to properly get the provider's name we need to modify the fallback in auth.ts
  const provider = (session.user as any)?.provider ?? "OAuth";

  return (
    <PageContainer>
      <div className=" flex flex-col mb-20">
        <div className="order-2 text-center lg:order-1 lg:col-span-3 lg:row-span-2 lg:text-left">
          <Header variant="main">Perfil</Header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Meus dados
                </h2>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="relative shrink-0 mx-auto md:mx-0">
                    <div className="relative inline-block">
                      {image ? (
                        <Image
                          src={image}
                          alt="Foto de perfil"
                          width={128}
                          height={128}
                          className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-medium border-4 border-gray-100">
                          {/* placeholder image should go here. I'm using this icon for now, but I couldn't test it because I don't have an account without an image*/}
                          <User2Icon size={48} />
                        </div>
                      )}

                      <button
                        disabled
                        className="absolute -top-1 -right-1 bg-white border border-gray-200 text-gray-400 p-2 rounded-full shadow-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                        title="Alterar foto (Indisponível)"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 w-full space-y-4">
                    <EditableField label="Nome Completo" value={name} />
                    <EditableField label="Endereço de Email" value={email} />
                    <EditableField
                      label="Senha"
                      value="********"
                      type="password"
                    />
                  </div>
                </div>

                <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-700 flex items-center gap-2">
                    <span>⚠️</span>
                    Fez login via <strong>{provider}.</strong> Nao e possivel
                    editar
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Notificações
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Onde receber?
                    </h3>
                    <div className="space-y-2">
                      <Checkbox label="Notificações no site" />
                      <Checkbox label="Enviar por email" />
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                      Lembretes
                    </h3>
                    <div className="space-y-2">
                      <Checkbox label="30 dias antes" />
                      <Checkbox label="7 dias antes" />
                      <Checkbox label="3 dias antes" />
                      <Checkbox label="1 dia antes" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      Selecione todas as opções que desejar.
                    </p>
                  </div>

                  <button className="w-full mt-4 bg-gray-900 text-white py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
                    Salvar Preferências
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

// these components will be replaced with real editable fields
function EditableField({
  label,
  value,
  type = "text",
}: {
  label: string;
  value?: string | null;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-700 block">{label}</label>
      <div className="flex gap-2">
        <input
          disabled
          type={type}
          value={value ?? ""}
          className="flex-1 bg-gray-100 border border-gray-300 text-gray-500 text-sm rounded-lg px-3 py-2.5 focus:outline-none disabled:cursor-not-allowed"
          readOnly
        />
        <button
          disabled
          className="bg-white border border-gray-300 text-gray-400 px-3 rounded-lg flex items-center justify-center hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          title="Editar (Indisponível)"
        >
          <Edit size={18} />
        </button>
      </div>
    </div>
  );
}

function Checkbox({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-blue-600 transition-all focus:ring-2 focus:ring-blue-500/20"
        />
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
        {label}
      </span>
    </label>
  );
}
