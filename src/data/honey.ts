export type CustodyStep = {
  label: string;
  detail: string;
  time: string;
  hash: string;
};

export type PollenSource = {
  flower: string;
  share: number;
  bloom: string;
  distance: string;
};

export type ProcessStep = {
  stage: string;
  detail: string;
  date: string;
  operator: string;
  temp: string;
};

export type Batch = {
  id: string;
  name: string;
  variety: string;
  beekeeper: string;
  apiary: string;
  location: string;
  coords: string;
  harvestDate: string;
  harvestWindow: string;
  jars: number;
  colonies: number;
  purity: number;
  moisture: string;
  hmf: string;
  scans: number;
  block: string;
  pollen: PollenSource[];
  processing: ProcessStep[];
  steps: CustodyStep[];
};


export const batches: Batch[] = [
  {
    id: "HC-2049",
    name: "Wildflower Reserve",
    variety: "Raw wildflower, unfiltered",
    beekeeper: "Meera Rathod",
    apiary: "Sahyadri Ridge Apiary",
    location: "Satara, Maharashtra",
    coords: "17.68°N · 74.01°E",
    harvestDate: "04 Mar 2026",
    harvestWindow: "26 Feb – 04 Mar 2026",
    jars: 1240,
    colonies: 214,
    purity: 99.2,
    moisture: "16.4%",
    hmf: "8 meq/kg",
    pollen: [
      { flower: "Karvi (Strobilanthes)", share: 46, bloom: "Jan – Mar", distance: "0.8 km" },
      { flower: "Wild coriander", share: 24, bloom: "Feb – Mar", distance: "1.4 km" },
      { flower: "Eucalyptus", share: 18, bloom: "Dec – Feb", distance: "2.1 km" },
      { flower: "Mixed meadow herbs", share: 12, bloom: "Year round", distance: "0.4 km" },
    ],
    processing: [
      {
        stage: "Uncapping",
        detail: "Cold knife, no heat applied to comb",
        date: "04 Mar 2026",
        operator: "Meera Rathod",
        temp: "28°C",
      },
      {
        stage: "Extraction",
        detail: "Manual radial extractor, 8 frames per spin",
        date: "04 Mar 2026",
        operator: "Meera Rathod",
        temp: "30°C",
      },
      {
        stage: "Settling & straining",
        detail: "48h gravity settling, 200-micron mesh only",
        date: "05 Mar 2026",
        operator: "Sahyadri press room",
        temp: "26°C",
      },
      {
        stage: "Lab testing",
        detail: "C4 isotope, HMF, moisture, pollen count",
        date: "06 Mar 2026",
        operator: "AgriLab Pune",
        temp: "—",
      },
      {
        stage: "Jarring & sealing",
        detail: "Glass jars, tamper seal, QR code affixed",
        date: "07 Mar 2026",
        operator: "Sahyadri press room",
        temp: "24°C",
      },
    ],
    scans: 38412,
    block: "#8,402,117",
    steps: [

      {
        label: "Frames harvested",
        detail: "Hive 12 · sensor weight 24.1 kg",
        time: "04 Mar · 06:40",
        hash: "0x7f3a…c21e",
      },
      {
        label: "Extracted & settled",
        detail: "On-site press room · 34.2°C",
        time: "04 Mar · 09:15",
        hash: "0x91bd…4a70",
      },
      {
        label: "Lab purity assay",
        detail: "C4 isotope + HMF test passed",
        time: "06 Mar · 14:02",
        hash: "0x2c58…9de1",
      },
      {
        label: "Sealed & written on-chain",
        detail: "Glass jar, QR affixed · Lot 4",
        time: "07 Mar · 11:02",
        hash: "0xd410…88bf",
      },
    ],
  },
  {
    id: "HC-2050",
    name: "Mustard Bloom",
    variety: "Single-origin mustard blossom",
    beekeeper: "Harpal Singh",
    apiary: "Doaba Fields Apiary",
    location: "Kapurthala, Punjab",
    coords: "31.38°N · 75.38°E",
    harvestDate: "22 Feb 2026",
    colonies: 96,
    purity: 98.1,
    moisture: "17.1%",
    hmf: "11 meq/kg",
    scans: 9106,
    block: "#8,377,004",
    steps: [
      {
        label: "Frames harvested",
        detail: "Hive 03 · sensor weight 21.7 kg",
        time: "22 Feb · 07:05",
        hash: "0x4ab1…70cc",
      },
      {
        label: "Extracted & settled",
        detail: "Village collection centre",
        time: "22 Feb · 10:40",
        hash: "0x08e2…31aa",
      },
      {
        label: "Lab purity assay",
        detail: "No added sugar detected",
        time: "25 Feb · 12:20",
        hash: "0xbb77…52f4",
      },
      {
        label: "Sealed & written on-chain",
        detail: "Jarred · Lot 2",
        time: "26 Feb · 09:30",
        hash: "0x6f19…c003",
      },
    ],
  },
];

export function findBatch(id: string) {
  const key = id.trim().toUpperCase().replace(/^#/, "");
  return batches.find((b) => b.id === key);
}

export type Hive = {
  id: string;
  name: string;
  status: "healthy" | "watch";
  temp: number;
  humidity: number;
  weight: number;
  risk: string;
  riskLevel: string;
  note?: string;
};

export const hives: Hive[] = [
  {
    id: "H-01",
    name: "Hive 01 · Meadow",
    status: "healthy",
    temp: 34.2,
    humidity: 61,
    weight: 24.1,
    risk: "Varroa",
    riskLevel: "Low",
  },
  {
    id: "H-04",
    name: "Hive 04 · Bramble",
    status: "watch",
    temp: 31,
    humidity: 74,
    weight: 19.6,
    risk: "Chalkbrood",
    riskLevel: "78%",
    note: "Humidity above threshold 6 days. Ventilate and check brood frames within 48h.",
  },
  {
    id: "H-07",
    name: "Hive 07 · Orchard",
    status: "healthy",
    temp: 35.1,
    humidity: 58,
    weight: 26.8,
    risk: "Varroa",
    riskLevel: "Low",
  },
];

export const forecast = [
  { week: "W1", value: 38 },
  { week: "W2", value: 52 },
  { week: "W3", value: 64 },
  { week: "W4", value: 78 },
  { week: "W5", value: 92 },
  { week: "W6", value: 100 },
  { week: "W7", value: 84 },
  { week: "W8", value: 70 },
];
