import { VaccineMock } from "@/app/types/vaccineMock";

export function getMockVaccines(): VaccineMock[] {
    const vaccines: VaccineMock[] = [
    {
      id: "v1",
      name: "V8 / V10 (Cães)",
      description: "Vacina polivalente que protege contra doenças como cinomose, parvovirose, hepatite infecciosa, leptospirose e parainfluenza canina."
    },
    {
      id: "v2",
      name: "Antirrábica (Cães e Gatos)",
      description: "Protege contra a raiva, uma doença viral grave e fatal que pode ser transmitida aos humanos."
    },
    {
      id: "v3",
      name: "Giárdia (Cães)",
      description: "Auxilia na prevenção da giardíase, uma infecção intestinal causada por protozoários."
    },
    {
      id: "v4",
      name: "Gripe Canina",
      description: "Protege contra agentes causadores da tosse dos canis, como Bordetella bronchiseptica e vírus da parainfluenza."
    },
    {
      id: "v5",
      name: "Leishmaniose (Cães)",
      description: "Auxilia na prevenção da leishmaniose visceral canina, doença transmitida por mosquitos."
    },
    {
      id: "v6",
      name: "V3 / V4 / V5 (Gatos)",
      description: "Vacina polivalente felina que protege contra rinotraqueíte, calicivirose, panleucopenia e clamidiose."
    },
    {
      id: "v7",
      name: "FeLV (Gatos)",
      description: "Protege contra o vírus da leucemia felina, que compromete o sistema imunológico dos gatos."
    },
    {
      id: "v8",
      name: "FIV (Gatos)",
      description: "Auxilia na prevenção do vírus da imunodeficiência felina, conhecido como 'AIDS felina'."
    }
    ];
    return vaccines;
}