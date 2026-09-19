/**
 * Pricing data for the instant-estimate calculator (/estimate).
 *
 * This file mirrors docs/Black-Iron-Price-List-Template.xlsx one-to-one:
 *   Sheet "Price List"   → `categories` (donation / disposal price per item)
 *   Sheet "Rules & Fees" → `rules`
 *   Sheet "Cities"       → `cities`
 *
 * ┌──────────────────────────────────────────────────────────────────────┐
 * │  ALL NUMBERS BELOW ARE PLACEHOLDERS until the owners return the      │
 * │  filled-in price list. Flip PRICES_CONFIRMED to true once replaced.  │
 * └──────────────────────────────────────────────────────────────────────┘
 */

export const PRICES_CONFIRMED = false;

export type Lang = 'en' | 'es' | 'ar';
export type Name = Record<Lang, string>;
export type Mode = 'donation' | 'disposal';

export type PriceItem = {
  id: string;
  name: Name;
  /** Pickup price when the item goes to a charity. `null` = charities won't take it. */
  donation: number | null;
  /** Pickup price when the item goes to the dump / recycling. */
  disposal: number;
  /** Adds `rules.heavyItemFee` per unit (piano, hot tub, safe…). */
  heavy?: boolean;
};

export type PriceCategory = { id: string; name: Name; items: PriceItem[] };

export const rules = {
  /** Smallest job we'll send a truck for. */
  minimumCharge: 99,
  /** Per flight of stairs without an elevator (per job, not per item). */
  stairsPerFloor: 25,
  /** Flat fee when beds / tables / desks need to be taken apart. */
  disassemblyFee: 35,
  /** Added per unit for items flagged `heavy`. */
  heavyItemFee: 75,
  /** Added when the customer needs same-day service. */
  sameDayFee: 50,
  /** Discount (%) on items when everything is already at the curb / garage / driveway. */
  curbsideDiscountPct: 10,
  /** The estimate is shown as a range: total … total × (1 + margin). */
  rangeMarginPct: 15,
} as const;

/** Cities we serve and any extra travel fee (0 = none). Order = display order. */
export const cities: { name: string; travelFee: number }[] = [
  { name: 'Everett', travelFee: 0 },
  { name: 'Lynnwood', travelFee: 0 },
  { name: 'Edmonds', travelFee: 0 },
  { name: 'Mukilteo', travelFee: 0 },
  { name: 'Marysville', travelFee: 0 },
  { name: 'Lake Stevens', travelFee: 0 },
  { name: 'Snohomish', travelFee: 0 },
  { name: 'Mill Creek', travelFee: 0 },
  { name: 'Bothell', travelFee: 0 },
  { name: 'Mountlake Terrace', travelFee: 0 },
  { name: 'Shoreline', travelFee: 0 },
  { name: 'Kenmore', travelFee: 0 },
  { name: 'Woodinville', travelFee: 0 },
  { name: 'Seattle', travelFee: 25 },
  { name: 'Kirkland', travelFee: 25 },
  { name: 'Bellevue', travelFee: 25 },
  { name: 'Redmond', travelFee: 25 },
  { name: 'Arlington', travelFee: 25 },
  { name: 'Monroe', travelFee: 25 },
  { name: 'Renton', travelFee: 40 },
  { name: 'Kent', travelFee: 40 },
  { name: 'Tacoma', travelFee: 60 },
];

export const categories: PriceCategory[] = [
  {
    id: 'living',
    name: { en: 'Living room', es: 'Sala', ar: 'غرفة المعيشة' },
    items: [
      { id: 'sofa', name: { en: 'Sofa / couch (3-seat)', es: 'Sofá (3 plazas)', ar: 'كنبة (3 مقاعد)' }, donation: 95, disposal: 120 },
      { id: 'loveseat', name: { en: 'Loveseat (2-seat)', es: 'Sofá de 2 plazas', ar: 'كنبة (مقعدان)' }, donation: 80, disposal: 100 },
      { id: 'sectional', name: { en: 'Sectional sofa', es: 'Sofá seccional', ar: 'كنبة زاوية (قطع)' }, donation: 140, disposal: 180 },
      { id: 'armchair', name: { en: 'Armchair / recliner', es: 'Sillón / reclinable', ar: 'كرسي فردي / استرخاء' }, donation: 60, disposal: 75 },
      { id: 'coffee-table', name: { en: 'Coffee table / side table', es: 'Mesa de centro / auxiliar', ar: 'طاولة وسط / جانبية' }, donation: 40, disposal: 50 },
      { id: 'tv-stand', name: { en: 'TV stand / entertainment center', es: 'Mueble de TV', ar: 'طاولة تلفزيون' }, donation: 50, disposal: 65 },
      { id: 'bookshelf', name: { en: 'Bookshelf', es: 'Librero', ar: 'مكتبة كتب' }, donation: 50, disposal: 65 },
      { id: 'rug', name: { en: 'Rug / carpet (rolled)', es: 'Alfombra (enrollada)', ar: 'سجادة (ملفوفة)' }, donation: 30, disposal: 45 },
      { id: 'tv', name: { en: 'TV (flat screen)', es: 'Televisor (pantalla plana)', ar: 'تلفزيون (شاشة مسطحة)' }, donation: 40, disposal: 60 },
    ],
  },
  {
    id: 'bedroom',
    name: { en: 'Bedroom', es: 'Dormitorio', ar: 'غرفة النوم' },
    items: [
      { id: 'mattress-twin', name: { en: 'Mattress — twin / full', es: 'Colchón — individual / matrimonial', ar: 'مرتبة — مفرد / مزدوج' }, donation: null, disposal: 80 },
      { id: 'mattress-queen', name: { en: 'Mattress — queen / king', es: 'Colchón — queen / king', ar: 'مرتبة — كوين / كينج' }, donation: null, disposal: 100 },
      { id: 'box-spring', name: { en: 'Box spring', es: 'Base de colchón (box spring)', ar: 'قاعدة مرتبة (بوكس سبرينج)' }, donation: null, disposal: 70 },
      { id: 'bed-frame', name: { en: 'Bed frame / headboard', es: 'Marco de cama / cabecera', ar: 'هيكل سرير / ظهر سرير' }, donation: 60, disposal: 80 },
      { id: 'dresser', name: { en: 'Dresser / chest of drawers', es: 'Cómoda', ar: 'خزانة أدراج (تسريحة)' }, donation: 70, disposal: 90 },
      { id: 'nightstand', name: { en: 'Nightstand', es: 'Mesa de noche', ar: 'كومودينو' }, donation: 30, disposal: 40 },
      { id: 'wardrobe', name: { en: 'Wardrobe / armoire', es: 'Ropero / armario', ar: 'خزانة ملابس' }, donation: 90, disposal: 120 },
    ],
  },
  {
    id: 'dining-office',
    name: { en: 'Dining & office', es: 'Comedor y oficina', ar: 'الطعام والمكتب' },
    items: [
      { id: 'dining-table', name: { en: 'Dining table', es: 'Mesa de comedor', ar: 'طاولة طعام' }, donation: 70, disposal: 90 },
      { id: 'dining-chair', name: { en: 'Dining chair (each)', es: 'Silla de comedor (cada una)', ar: 'كرسي طعام (للواحد)' }, donation: 15, disposal: 20 },
      { id: 'desk', name: { en: 'Desk', es: 'Escritorio', ar: 'مكتب' }, donation: 60, disposal: 80 },
      { id: 'office-chair', name: { en: 'Office chair', es: 'Silla de oficina', ar: 'كرسي مكتب' }, donation: 30, disposal: 40 },
      { id: 'filing-cabinet', name: { en: 'Filing cabinet', es: 'Archivero', ar: 'خزانة ملفات' }, donation: 40, disposal: 55 },
    ],
  },
  {
    id: 'appliances',
    name: { en: 'Appliances', es: 'Electrodomésticos', ar: 'الأجهزة' },
    items: [
      { id: 'fridge', name: { en: 'Refrigerator', es: 'Refrigerador', ar: 'ثلاجة' }, donation: 110, disposal: 140 },
      { id: 'washer-dryer', name: { en: 'Washer or dryer', es: 'Lavadora o secadora', ar: 'غسالة أو نشافة' }, donation: 90, disposal: 110 },
      { id: 'stove', name: { en: 'Stove / oven', es: 'Estufa / horno', ar: 'فرن / طباخ' }, donation: 90, disposal: 110 },
      { id: 'dishwasher', name: { en: 'Dishwasher', es: 'Lavavajillas', ar: 'غسالة صحون' }, donation: 70, disposal: 90 },
      { id: 'microwave', name: { en: 'Microwave', es: 'Microondas', ar: 'ميكروويف' }, donation: 25, disposal: 35 },
      { id: 'water-heater', name: { en: 'Water heater', es: 'Calentador de agua', ar: 'سخان ماء' }, donation: null, disposal: 110 },
      { id: 'ac-window', name: { en: 'Air conditioner (window unit)', es: 'Aire acondicionado (ventana)', ar: 'مكيف (شباك)' }, donation: 40, disposal: 60 },
    ],
  },
  {
    id: 'outdoor-garage',
    name: { en: 'Outdoor & garage', es: 'Exterior y garaje', ar: 'الحديقة والكراج' },
    items: [
      { id: 'patio-set', name: { en: 'Patio furniture set', es: 'Juego de muebles de patio', ar: 'طقم أثاث حديقة' }, donation: 80, disposal: 100 },
      { id: 'grill', name: { en: 'BBQ grill', es: 'Parrilla / asador', ar: 'شواية' }, donation: 40, disposal: 55 },
      { id: 'bicycle', name: { en: 'Bicycle', es: 'Bicicleta', ar: 'دراجة' }, donation: 25, disposal: 35 },
      { id: 'treadmill', name: { en: 'Treadmill / exercise equipment', es: 'Caminadora / equipo de ejercicio', ar: 'جهاز رياضي / مشاية' }, donation: 90, disposal: 120, heavy: true },
      { id: 'lawn-mower', name: { en: 'Lawn mower', es: 'Cortacésped', ar: 'جزازة عشب' }, donation: 40, disposal: 55 },
      { id: 'hot-tub', name: { en: 'Hot tub', es: 'Jacuzzi', ar: 'جاكوزي' }, donation: null, disposal: 350, heavy: true },
      { id: 'piano', name: { en: 'Piano', es: 'Piano', ar: 'بيانو' }, donation: 200, disposal: 250, heavy: true },
    ],
  },
  {
    id: 'boxes-bags',
    name: { en: 'Boxes & bags', es: 'Cajas y bolsas', ar: 'صناديق وأكياس' },
    items: [
      { id: 'box-household', name: { en: 'Box of household items (medium)', es: 'Caja de artículos (mediana)', ar: 'صندوق أغراض منزلية (متوسط)' }, donation: 12, disposal: 15 },
      { id: 'bag-clothes', name: { en: 'Bag of clothes / textiles', es: 'Bolsa de ropa / textiles', ar: 'كيس ملابس / أقمشة' }, donation: 8, disposal: 12 },
      { id: 'bag-junk', name: { en: 'Bag of general junk', es: 'Bolsa de basura general', ar: 'كيس مخلفات عامة' }, donation: null, disposal: 12 },
      { id: 'construction-debris', name: { en: 'Construction debris (per load)', es: 'Escombros de construcción (por carga)', ar: 'مخلفات بناء (لكل حمولة)' }, donation: null, disposal: 300 },
      { id: 'yard-waste', name: { en: 'Yard waste (per load)', es: 'Residuos de jardín (por carga)', ar: 'مخلفات حديقة (لكل حمولة)' }, donation: null, disposal: 180 },
    ],
  },
  {
    id: 'loads',
    name: { en: 'Whole truck loads', es: 'Cargas completas', ar: 'حمولات كاملة' },
    items: [
      { id: 'load-quarter', name: { en: '1/4 truck load', es: '1/4 de camión', ar: 'ربع شاحنة' }, donation: null, disposal: 250 },
      { id: 'load-half', name: { en: '1/2 truck load', es: '1/2 camión', ar: 'نصف شاحنة' }, donation: null, disposal: 400 },
      { id: 'load-full', name: { en: 'Full truck load', es: 'Camión completo', ar: 'شاحنة كاملة' }, donation: null, disposal: 650 },
    ],
  },
];

/* ───────────────────────────── Calculation ───────────────────────────── */

export type EstimateInput = {
  mode: Mode;
  /** item id → quantity */
  quantities: Record<string, number>;
  city: string; // '' = not chosen / other
  stairs: number;
  disassembly: boolean;
  curbside: boolean;
  sameDay: boolean;
};

export type EstimateLine = { item: PriceItem; qty: number; unit: number; total: number };

export type Estimate = {
  lines: EstimateLine[];
  itemCount: number;
  subtotal: number;
  heavyFee: number;
  stairsFee: number;
  disassemblyFee: number;
  sameDayFee: number;
  curbsideDiscount: number;
  travelFee: number;
  minimumApplied: boolean;
  low: number;
  high: number;
};

const allItems = new Map(categories.flatMap((c) => c.items.map((i) => [i.id, i] as const)));

export function getItem(id: string) {
  return allItems.get(id);
}

/** Price of one unit in the given mode; falls back to disposal when the item can't be donated. */
export function unitPrice(item: PriceItem, mode: Mode) {
  return mode === 'donation' && item.donation !== null ? item.donation : item.disposal;
}

export function calculateEstimate(input: EstimateInput): Estimate {
  const lines: EstimateLine[] = [];
  let heavyUnits = 0;
  for (const [id, qty] of Object.entries(input.quantities)) {
    const item = allItems.get(id);
    if (!item || qty <= 0) continue;
    const unit = unitPrice(item, input.mode);
    lines.push({ item, qty, unit, total: unit * qty });
    if (item.heavy) heavyUnits += qty;
  }

  const itemCount = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.total, 0);
  const heavyFee = heavyUnits * rules.heavyItemFee;
  const stairsFee = Math.max(0, input.stairs) * rules.stairsPerFloor;
  const disassemblyFee = input.disassembly ? rules.disassemblyFee : 0;
  const sameDayFee = input.sameDay ? rules.sameDayFee : 0;
  const curbsideDiscount = input.curbside ? Math.round((subtotal * rules.curbsideDiscountPct) / 100) : 0;
  const travelFee = cities.find((c) => c.name === input.city)?.travelFee ?? 0;

  const beforeMinimum = subtotal + heavyFee + stairsFee + disassemblyFee + sameDayFee - curbsideDiscount;
  const minimumApplied = itemCount > 0 && beforeMinimum < rules.minimumCharge;
  const low = (minimumApplied ? rules.minimumCharge : beforeMinimum) + travelFee;
  const high = Math.round((low * (100 + rules.rangeMarginPct)) / 100);

  return {
    lines,
    itemCount,
    subtotal,
    heavyFee,
    stairsFee,
    disassemblyFee,
    sameDayFee,
    curbsideDiscount,
    travelFee,
    minimumApplied,
    low,
    high,
  };
}

export function formatUsd(n: number) {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}
