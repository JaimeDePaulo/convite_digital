/**
 * Utilities for Google Calendar links, Apple / Outlook .ics downloads,
 * and WhatsApp RSVP message generation.
 */

export interface WeddingEventData {
  title: string;
  description: string;
  location: string;
  startDate: string; // ISO string e.g. 2026-10-15T20:00:00
  endDate: string;
}

export const WEDDING_EVENTS = {
  copoDeAgua: {
    title: 'Casamento Paulino & Ana - Copo d\'Água e Recepção',
    description: 'Celebração matrimonial de Paulino Joaquim e Ana da Cruz.\nLocal: SALÃO MUJA (Maxiqueira, antes da antiga PEP, Lubango).\nA partir das 20h00.',
    location: 'SALÃO MUJA, Maxiqueira (antes da antiga PEP), Lubango, Angola',
    startDate: '2026-10-15T20:00:00',
    endDate: '2026-10-16T04:00:00',
  },
  cerimoniaReligiosa: {
    title: 'Casamento Paulino & Ana - Cerimónia Religiosa',
    description: 'Bênção e celebração da Cerimónia Religiosa de enlace matrimonial de Paulino Joaquim e Ana da Cruz.\nLocal: Paróquia De São Francisco De Assis - Calumbiro, Lubango.\nInício às 15h30.',
    location: 'Paróquia De São Francisco De Assis - Calumbiro, Lubango, Angola',
    startDate: '2026-10-15T15:30:00',
    endDate: '2026-10-15T17:30:00',
  },
  cerimoniaCivil: {
    title: 'Casamento Paulino & Ana - Cerimónia Civil',
    description: 'Cerimónia Civil de enlace matrimonial de Paulino Joaquim e Ana da Cruz.\nLocal: Conservatória Civil do Lubango - Sala nº 01.\nInício pontual às 08h30.',
    location: 'Conservatória Civil do Lubango, Sala nº 01, Lubango, Angola',
    startDate: '2026-10-14T08:30:00',
    endDate: '2026-10-14T11:00:00',
  },
};

// Format date to YYYYMMDDTHHmmssZ for calendar links
function formatDateToCalString(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

export function generateGoogleCalendarUrl(event: WeddingEventData): string {
  const start = formatDateToCalString(event.startDate);
  const end = formatDateToCalString(event.endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: event.title,
    dates: `${start}/${end}`,
    details: event.description,
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(event: WeddingEventData, filename: string = 'casamento-paulino-ana.ics') {
  const start = formatDateToCalString(event.startDate);
  const end = formatDateToCalString(event.endDate);
  const now = formatDateToCalString(new Date().toISOString());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Casamento Paulino e Ana//Convite Digital//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@casamento-paulino-ana.com`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Google Maps deep links & search queries
export const MAP_LOCATIONS = {
  civil: {
    name: 'Conservatória do Registo Civil do Lubango (Sala nº 01)',
    address: 'Conservatória Civil do Lubango, Sala nº 01, Lubango, Província da Huíla, Angola',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Conservat%C3%B3ria+do+Registo+Civil+do+Lubango+Angola',
    landmark: 'Sala nº 01, Centro da Cidade do Lubango',
    time: '14 de Outubro de 2026, 08h30',
    type: 'Cerimónia Civil',
  },
  religiosa: {
    name: 'Paróquia De São Francisco De Assis - Calumbiro',
    address: 'Paróquia De São Francisco De Assis, Bairro Calumbiro, Lubango, Província da Huíla, Angola',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Par%C3%B3quia+De+S%C3%A3o+Francisco+De+Assis+Calumbiro+Lubango+Angola',
    landmark: 'Bairro Calumbiro, Lubango',
    time: '15 de Outubro de 2026, 15h30',
    type: 'Cerimónia Religiosa',
  },
  reception: {
    name: 'SALÃO MUJA - Maxiqueira',
    address: 'SALÃO MUJA, Bairro Maxiqueira (antes da antiga PEP), Lubango, Província da Huíla, Angola',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Salao+Muja+Maxiqueira+Lubango+Angola',
    landmark: 'Localizado na Maxiqueira antes da antiga PEP',
    time: '15 de Outubro de 2026, 20h00',
    type: 'Copo d\'Água & Recepção',
  },
};

export const WEDDING_CONTACT = {
  email: 'ngalelo2022@gmail.com',
  phoneDisplay: '+244 939 785 068',
  phoneRaw: '244939785068',
};

export interface WeddingTable {
  id: number;
  name: string;
  virtueDescription: string;
}

export const WEDDING_TABLES: WeddingTable[] = [
  { id: 1, name: 'SABEDORIA', virtueDescription: 'A discernir e edificar o lar com retidão e graça divina.' },
  { id: 2, name: 'INTELIGÊNCIA', virtueDescription: 'A compreender com clareza a essência do amor e a vontade de Deus.' },
  { id: 3, name: 'CONSELHO', virtueDescription: 'O dom de orientar os passos mútuos nos caminhos da harmonia e da paz.' },
  { id: 4, name: 'FORTALEZA', virtueDescription: 'A força serena para vencer todos os desafios com coragem inabalável.' },
  { id: 5, name: 'CIÊNCIA', virtueDescription: 'O conhecimento profundo de contemplar a beleza das coisas do Criador.' },
  { id: 6, name: 'PIEDADE', virtueDescription: 'A ternura filial, respeito afetuoso e devoção no seio da família.' },
  { id: 7, name: 'TEMOR DE DEUS', virtueDescription: 'O santo respeito e admiração pelo Senhor, princípio da verdadeira sabedoria.' },
  { id: 8, name: 'FIDELIDADE', virtueDescription: 'O compromisso sagrado e constante honrado em todos os momentos da vida.' },
  { id: 9, name: 'LEALDADE', virtueDescription: 'A firmeza sincera de coração e companheirismo em qualquer circunstância.' },
  { id: 10, name: 'ESPERANÇA', virtueDescription: 'A luz que ilumina o futuro, renovando os sonhos a cada amanhecer.' },
  { id: 11, name: 'FÉ', virtueDescription: 'O alicerce inabalável da união, crendo no poder supremo do amor.' },
  { id: 12, name: 'SIMPATIA', virtueDescription: 'A doçura no convívio diário e o calor humano que acolhe a todos.' },
  { id: 13, name: 'PACIÊNCIA', virtueDescription: 'A virtude graciosa que tudo compreende, perdoa e sabe esperar.' },
  { id: 14, name: 'HONESTIDADE', virtueDescription: 'A nobre transparência de intenções, palavras verdadeiras e retas.' },
  { id: 15, name: 'SIMPLICIDADE', virtueDescription: 'A pureza humilde que encontra a maior riqueza nas coisas mais singelas.' },
];

// WhatsApp RSVP Link Generator
export function createWhatsAppRsvpUrl(data: {
  guestName: string;
  companionCount: number;
  ceremonyChoice: 'all' | 'religious_reception' | 'reception' | 'civil';
  tableNumber?: string;
  wishesMessage?: string;
  phoneNumber?: string;
}): string {
  const phone = data.phoneNumber ? data.phoneNumber.replace(/\D/g, '') : WEDDING_CONTACT.phoneRaw;

  let eventText = 'Todos os eventos (Civil, Religiosa e Copo d\'Água)';
  if (data.ceremonyChoice === 'religious_reception') {
    eventText = 'Cerimónia Religiosa (15h30) e Copo d\'Água (20h00) - 15 de Outubro';
  } else if (data.ceremonyChoice === 'reception') {
    eventText = 'Apenas Copo d\'Água (15 de Outubro · 20h00)';
  } else if (data.ceremonyChoice === 'civil') {
    eventText = 'Apenas Cerimónia Civil (14 de Outubro · 08h30)';
  }

  const messageParts = [
    `💐 *Confirmação de Presença - Casamento Paulino & Ana* 💍`,
    ``,
    `Olá! É com muita alegria que confirmo a presença:`,
    `👤 *Convidado(a):* ${data.guestName.trim()}`,
    `👥 *Total de Pessoas:* ${data.companionCount} pessoa(s)`,
    `📅 *Evento(s):* ${eventText}`,
  ];

  if (data.tableNumber && data.tableNumber.trim()) {
    messageParts.push(`🪑 *Mesa Indicada:* ${data.tableNumber.trim()}`);
  }

  if (data.wishesMessage && data.wishesMessage.trim()) {
    messageParts.push(``, `💌 *Mensagem aos Noivos:*`, `"${data.wishesMessage.trim()}"`);
  }

  messageParts.push(``, `Mal podemos esperar para celebrar convosco este momento tão especial! ✨🥂`);

  const fullText = messageParts.join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(fullText)}`;
}

// Email RSVP Generator (mailto: to ngalelo2022@gmail.com)
export function createEmailRsvpMailto(data: {
  guestName: string;
  companionCount: number;
  ceremonyChoice: 'all' | 'religious_reception' | 'reception' | 'civil';
  tableNumber?: string;
  wishesMessage?: string;
}): string {
  let eventText = 'Todos os eventos (Civil, Religiosa e Copo d\'Água)';
  if (data.ceremonyChoice === 'religious_reception') {
    eventText = 'Cerimónia Religiosa (15h30) e Copo d\'Água (20h00) - 15 de Outubro';
  } else if (data.ceremonyChoice === 'reception') {
    eventText = 'Apenas Copo d\'Água (15 de Outubro · 20h00)';
  } else if (data.ceremonyChoice === 'civil') {
    eventText = 'Apenas Cerimónia Civil (14 de Outubro · 08h30)';
  }

  const subject = `Confirmação de Presença: ${data.guestName.trim()} - Casamento Paulino & Ana`;

  const lines = [
    `Confirmação de Presença para o Casamento de Paulino Joaquim & Ana da Cruz`,
    `------------------------------------------------------------------------`,
    `Nome do Convidado: ${data.guestName.trim()}`,
    `Quantidade de Pessoas: ${data.companionCount} pessoa(s)`,
    `Eventos Confirmados: ${eventText}`,
  ];

  if (data.tableNumber && data.tableNumber.trim()) {
    lines.push(`Mesa Indicada: ${data.tableNumber.trim()}`);
  }

  if (data.wishesMessage && data.wishesMessage.trim()) {
    lines.push(``, `Mensagem de Felicitações aos Noivos:`, `"${data.wishesMessage.trim()}"`);
  }

  lines.push(``, `Enviado através do Convite Digital.`);

  const body = lines.join('\n');
  return `mailto:${WEDDING_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Send Wish / Recado via WhatsApp to 939785068
export function createWhatsAppWishUrl(author: string, wishText: string): string {
  const message = [
    `💌 *Recado / Mensagem no Mural dos Noivos - Paulino & Ana* ✨`,
    ``,
    `De: *${author.trim()}*`,
    ``,
    `"${wishText.trim()}"`,
    ``,
    `Que Deus abençoe abundantemente o casal! 💐🥂`,
  ].join('\n');

  return `https://wa.me/${WEDDING_CONTACT.phoneRaw}?text=${encodeURIComponent(message)}`;
}

// Send Wish / Recado via Email to ngalelo2022@gmail.com
export function createEmailWishMailto(author: string, wishText: string): string {
  const subject = `Recado de ${author.trim()} para os Noivos Paulino & Ana`;
  const body = [
    `Recado recebido no Mural de Bênçãos do Casamento:`,
    `-------------------------------------------------`,
    `Autor: ${author.trim()}`,
    ``,
    `Mensagem:`,
    `"${wishText.trim()}"`,
    ``,
    `Enviado através do Convite Digital de Casamento.`,
  ].join('\n');

  return `mailto:${WEDDING_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

