import { MessageMock } from "@/app/types/messagesMock";

export function getReminderMessages(): MessageMock[] {
    const messages: MessageMock[] = [
        {
            id: "1",
            type: "VACCINE",
            content: "A vacina do seu pet está próxima ao vencimento. Não esqueça de agendar uma consulta com o veterinário.",
        },
        {
            id: "2",
            type: "MEDICINE",
            content: "É hora de administrar a medicação do seu pet. Verifique a dosagem correta e siga as instruções do veterinário.",

        },
        {
            id: "3",
            type: "APPOINTMENT",
            content: "Sua consulta está próxima. Prepare-se para levar seu pet ao veterinário.",
        },
    ];

    return messages;
}