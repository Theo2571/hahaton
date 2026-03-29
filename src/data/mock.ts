export type Channel = 'WA' | 'TG' | 'IG';
export type LeadStatus = 'new' | 'in_progress' | 'hot' | 'paid';

export interface Message {
  id: string;
  sender: 'ai' | 'client' | 'manager';
  text: string;
  time: string;
}

export interface SuggestedTour {
  id: string;
  country: string;
  hotel: string;
  price: number;
  dates: string;
}

export interface Lead {
  id: string;
  name: string;
  channel: Channel;
  status: LeadStatus;
  lastMessage: string;
  lastTime: string;
  unread: number;
  country: string;
  dates: string;
  budget: string;
  people: number;
  suggestedTours: SuggestedTour[];
  messages: Message[];
}

export interface Tour {
  id: string;
  country: string;
  hotel: string;
  price: number;
  dates: string;
  rating: number;
}

export const leads: Lead[] = [
  {
    id: '1',
    name: 'Анна Соколова',
    channel: 'WA',
    status: 'hot',
    lastMessage: 'Меня очень заинтересовал тур в Дубай!',
    lastTime: '14:32',
    unread: 2,
    country: 'ОАЭ',
    dates: '15–22 июля',
    budget: '$2000–3000',
    people: 2,
    suggestedTours: [
      { id: 't1', country: 'ОАЭ', hotel: 'Atlantis The Palm', price: 2800, dates: '15–22 июл' },
      { id: 't2', country: 'ОАЭ', hotel: 'Burj Al Arab', price: 4200, dates: '15–22 июл' },
    ],
    messages: [
      { id: 'm1', sender: 'ai', text: 'Здравствуйте! Я AI-ассистент турагентства. Чем могу помочь?', time: '14:10' },
      { id: 'm2', sender: 'client', text: 'Хочу отдохнуть с мужем на неделю, бюджет около 2500$', time: '14:15' },
      { id: 'm3', sender: 'ai', text: 'Отличный выбор! Когда планируете поездку? У нас есть горящие туры в ОАЭ и Турцию на июль.', time: '14:16' },
      { id: 'm4', sender: 'client', text: 'Хотелось бы в июле, примерно 15-е число', time: '14:20' },
      { id: 'm5', sender: 'ai', text: 'Подобрал для вас 2 варианта в ОАЭ — Atlantis The Palm ($2800) и роскошный Burj Al Arab ($4200). Оба включают перелёт и трансфер.', time: '14:25' },
      { id: 'm6', sender: 'client', text: 'Меня очень заинтересовал тур в Дубай!', time: '14:32' },
    ],
  },
  {
    id: '2',
    name: 'Дмитрий Волков',
    channel: 'TG',
    status: 'in_progress',
    lastMessage: 'Какие туры есть в Таиланд?',
    lastTime: '13:45',
    unread: 0,
    country: 'Таиланд',
    dates: 'Август',
    budget: '$1500–2000',
    people: 3,
    suggestedTours: [
      { id: 't3', country: 'Таиланд', hotel: 'Amari Phuket', price: 1800, dates: '5–15 авг' },
    ],
    messages: [
      { id: 'm1', sender: 'ai', text: 'Привет! Чем могу помочь с путешествием?', time: '13:30' },
      { id: 'm2', sender: 'client', text: 'Какие туры есть в Таиланд?', time: '13:45' },
    ],
  },
  {
    id: '3',
    name: 'Мария Петрова',
    channel: 'IG',
    status: 'new',
    lastMessage: 'Здравствуйте, интересует Европа',
    lastTime: '12:10',
    unread: 1,
    country: 'Европа',
    dates: 'Сентябрь',
    budget: '$3000+',
    people: 2,
    suggestedTours: [],
    messages: [
      { id: 'm1', sender: 'client', text: 'Здравствуйте, интересует Европа', time: '12:10' },
      { id: 'm2', sender: 'ai', text: 'Добрый день! Рады помочь с путешествием по Европе. В какие страны хотите поехать?', time: '12:11' },
    ],
  },
  {
    id: '4',
    name: 'Игорь Смирнов',
    channel: 'WA',
    status: 'paid',
    lastMessage: 'Спасибо, всё оплатил!',
    lastTime: '11:00',
    unread: 0,
    country: 'Турция',
    dates: '1–8 июля',
    budget: '$1200',
    people: 4,
    suggestedTours: [
      { id: 't4', country: 'Турция', hotel: 'Rixos Premium Belek', price: 1200, dates: '1–8 июл' },
    ],
    messages: [
      { id: 'm1', sender: 'ai', text: 'Здравствуйте! Отличный выбор тура в Турцию!', time: '10:00' },
      { id: 'm2', sender: 'client', text: 'Спасибо, всё оплатил!', time: '11:00' },
    ],
  },
  {
    id: '5',
    name: 'Елена Кузнецова',
    channel: 'TG',
    status: 'in_progress',
    lastMessage: 'Пришлите подробности по Мальдивам',
    lastTime: '10:55',
    unread: 3,
    country: 'Мальдивы',
    dates: 'Октябрь',
    budget: '$5000+',
    people: 2,
    suggestedTours: [
      { id: 't5', country: 'Мальдивы', hotel: 'One&Only Reethi Rah', price: 6500, dates: '10–20 окт' },
      { id: 't6', country: 'Мальдивы', hotel: 'Velaa Private Island', price: 9000, dates: '10–20 окт' },
    ],
    messages: [
      { id: 'm1', sender: 'ai', text: 'Здравствуйте! Мальдивы — прекрасный выбор!', time: '10:30' },
      { id: 'm2', sender: 'client', text: 'Пришлите подробности по Мальдивам', time: '10:55' },
    ],
  },
  {
    id: '6',
    name: 'Алексей Новиков',
    channel: 'WA',
    status: 'new',
    lastMessage: 'Есть ли туры для большой семьи?',
    lastTime: '09:40',
    unread: 1,
    country: 'Не указано',
    dates: 'Не указано',
    budget: 'Не указано',
    people: 6,
    suggestedTours: [],
    messages: [
      { id: 'm1', sender: 'client', text: 'Есть ли туры для большой семьи?', time: '09:40' },
      { id: 'm2', sender: 'ai', text: 'Конечно! Для семей у нас есть специальные предложения. Сколько человек планируют поехать?', time: '09:41' },
    ],
  },
];

export const tours: Tour[] = [
  { id: '1', country: 'ОАЭ', hotel: 'Atlantis The Palm', price: 2800, dates: '15–22 июл', rating: 4.8 },
  { id: '2', country: 'ОАЭ', hotel: 'Burj Al Arab', price: 4200, dates: '15–22 июл', rating: 5.0 },
  { id: '3', country: 'Таиланд', hotel: 'Amari Phuket', price: 1800, dates: '5–15 авг', rating: 4.5 },
  { id: '4', country: 'Турция', hotel: 'Rixos Premium Belek', price: 1200, dates: '1–8 июл', rating: 4.7 },
  { id: '5', country: 'Мальдивы', hotel: 'One&Only Reethi Rah', price: 6500, dates: '10–20 окт', rating: 4.9 },
  { id: '6', country: 'Мальдивы', hotel: 'Velaa Private Island', price: 9000, dates: '10–20 окт', rating: 5.0 },
  { id: '7', country: 'Италия', hotel: 'Hotel Excelsior Venice', price: 3200, dates: '5–12 сен', rating: 4.6 },
  { id: '8', country: 'Греция', hotel: 'Canaves Oia Suites', price: 2500, dates: '20–27 авг', rating: 4.8 },
  { id: '9', country: 'Испания', hotel: 'W Barcelona', price: 2100, dates: '1–8 сен', rating: 4.4 },
  { id: '10', country: 'Таиланд', hotel: 'Six Senses Samui', price: 3800, dates: '15–25 авг', rating: 4.9 },
];

export const leadsChartData = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  leads: Math.floor(Math.random() * 15) + 5,
  sales: Math.floor(Math.random() * 6) + 1,
}));

export const salesByDayData = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 1} мар`,
  revenue: Math.floor(Math.random() * 8000) + 2000,
  deals: Math.floor(Math.random() * 5) + 1,
}));

export const funnelStages = [
  { id: 1, name: 'Новые лиды', count: 48, conversion: 100, color: '#3B82F6' },
  { id: 2, name: 'Сбор параметров', count: 35, conversion: 73, color: '#8B5CF6' },
  { id: 3, name: 'Предложены туры', count: 22, conversion: 63, color: '#F59E0B' },
  { id: 4, name: 'Горячие', count: 12, conversion: 55, color: '#EF4444' },
  { id: 5, name: 'Оплачено', count: 7, conversion: 58, color: '#10B981' },
];

export const dropOffData = [
  { stage: 'Новые → Параметры', lost: 13, percent: 27 },
  { stage: 'Параметры → Туры', lost: 13, percent: 37 },
  { stage: 'Туры → Горячие', lost: 10, percent: 45 },
  { stage: 'Горячие → Оплата', lost: 5, percent: 42 },
];
