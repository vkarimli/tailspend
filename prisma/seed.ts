import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

type SpecDef = { key: string; label: string; unit?: string };
type ProductSeed = {
  sku: string;
  name: string;
  description: string;
  icon: string;
  priceCents: number;
  specs: Record<string, string>;
};
type SubcategorySeed = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  specDefs: SpecDef[];
  products: ProductSeed[];
};
type CategorySeed = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  subcategories: SubcategorySeed[];
};

const CATEGORIES: CategorySeed[] = [
  {
    slug: "baglanti-elemanlari",
    name: "Bağlantı Elemanları",
    description: "Cıvata, somun, rondela ve diğer sabitleme elemanları.",
    icon: "🔩",
    subcategories: [
      {
        slug: "altigen-basli-civatalar",
        name: "Altıgen Başlı Cıvatalar",
        description: "Genel amaçlı ve paslanmaz altıgen başlı cıvatalar.",
        icon: "🔩",
        specDefs: [
          { key: "thread_diameter", label: "Diş Çapı", unit: "mm" },
          { key: "length", label: "Uzunluk", unit: "mm" },
          { key: "material", label: "Malzeme" },
          { key: "finish", label: "Yüzey Kaplama" },
        ],
        products: [
          {
            sku: "FAS-HB-M6X20-A2",
            name: "Paslanmaz Çelik Altıgen Cıvata M6x20",
            description:
              "A2 paslanmaz çelikten üretilmiş, genel amaçlı altıgen başlı makine cıvatası.",
            icon: "🔩",
            priceCents: 190,
            specs: { thread_diameter: "6", length: "20", material: "Paslanmaz Çelik A2", finish: "Doğal" },
          },
          {
            sku: "FAS-HB-M8X30-A2",
            name: "Paslanmaz Çelik Altıgen Cıvata M8x30",
            description:
              "Nemli ve dış mekan uygulamaları için korozyona dayanıklı A2 paslanmaz cıvata.",
            icon: "🔩",
            priceCents: 340,
            specs: { thread_diameter: "8", length: "30", material: "Paslanmaz Çelik A2", finish: "Doğal" },
          },
          {
            sku: "FAS-HB-M10X40-88-GALV",
            name: "Galvanizli Altıgen Cıvata M10x40",
            description: "8.8 mukavemet sınıfında, sıcak daldırma galvanizli yapı cıvatası.",
            icon: "🔩",
            priceCents: 560,
            specs: { thread_diameter: "10", length: "40", material: "Çelik 8.8", finish: "Galvaniz" },
          },
          {
            sku: "FAS-HB-M12X50-109-BLK",
            name: "Siyah Oksit Altıgen Cıvata M12x50",
            description: "Yüksek mukavemetli 10.9 sınıfı, siyah oksit kaplamalı ağır hizmet cıvatası.",
            icon: "🔩",
            priceCents: 890,
            specs: { thread_diameter: "12", length: "50", material: "Çelik 10.9", finish: "Siyah Oksit" },
          },
        ],
      },
      {
        slug: "somunlar",
        name: "Somunlar",
        description: "Altıgen, kilit ve kanatlı somun çeşitleri.",
        icon: "⚙️",
        specDefs: [
          { key: "thread_diameter", label: "Diş Çapı", unit: "mm" },
          { key: "type", label: "Tip" },
          { key: "material", label: "Malzeme" },
        ],
        products: [
          {
            sku: "FAS-NUT-M6-A2",
            name: "Paslanmaz Çelik Altıgen Somun M6",
            description: "Standart altıgen somun, A2 paslanmaz çelik.",
            icon: "⚙️",
            priceCents: 90,
            specs: { thread_diameter: "6", type: "Altıgen", material: "Paslanmaz Çelik A2" },
          },
          {
            sku: "FAS-NUT-M8-A2",
            name: "Paslanmaz Çelik Altıgen Somun M8",
            description: "Standart altıgen somun, A2 paslanmaz çelik.",
            icon: "⚙️",
            priceCents: 120,
            specs: { thread_diameter: "8", type: "Altıgen", material: "Paslanmaz Çelik A2" },
          },
          {
            sku: "FAS-NUT-M10-NYLOCK",
            name: "Kilit Somunu (Nylock) M10",
            description: "Naylon halkalı, titreşime karşı gevşemeyi önleyen kilit somunu.",
            icon: "⚙️",
            priceCents: 210,
            specs: { thread_diameter: "10", type: "Nylock", material: "Çelik, Çinko Kaplama" },
          },
          {
            sku: "FAS-NUT-M8-WING",
            name: "Kanatlı Somun M8",
            description: "Elle sıkma/gevşetme gerektiren uygulamalar için kanatlı somun.",
            icon: "⚙️",
            priceCents: 150,
            specs: { thread_diameter: "8", type: "Kanatlı", material: "Çelik, Çinko Kaplama" },
          },
        ],
      },
      {
        slug: "rondelalar",
        name: "Rondelalar",
        description: "Düz, yaylı ve geniş rondela çeşitleri.",
        icon: "🔘",
        specDefs: [
          { key: "inner_diameter", label: "İç Çap", unit: "mm" },
          { key: "outer_diameter", label: "Dış Çap", unit: "mm" },
          { key: "thickness", label: "Kalınlık", unit: "mm" },
          { key: "material", label: "Malzeme" },
        ],
        products: [
          {
            sku: "FAS-WSH-FLAT-M6",
            name: "Düz Rondela M6",
            description: "Genel amaçlı düz çelik rondela.",
            icon: "🔘",
            priceCents: 40,
            specs: { inner_diameter: "6.4", outer_diameter: "12.5", thickness: "1.6", material: "Çelik, Çinko Kaplama" },
          },
          {
            sku: "FAS-WSH-FLAT-M8",
            name: "Düz Rondela M8",
            description: "Genel amaçlı düz çelik rondela.",
            icon: "🔘",
            priceCents: 50,
            specs: { inner_diameter: "8.4", outer_diameter: "17", thickness: "2", material: "Çelik, Çinko Kaplama" },
          },
          {
            sku: "FAS-WSH-SPRING-M10",
            name: "Yaylı Rondela M10",
            description: "Titreşime karşı ön yük sağlayan yaylı (Grover) rondela.",
            icon: "🔘",
            priceCents: 70,
            specs: { inner_diameter: "10.2", outer_diameter: "18.1", thickness: "2.5", material: "Yaylı Çelik" },
          },
          {
            sku: "FAS-WSH-WIDE-M8",
            name: "Geniş Rondela M8",
            description: "Yumuşak veya delik toleransı geniş yüzeyler için geniş rondela.",
            icon: "🔘",
            priceCents: 80,
            specs: { inner_diameter: "8.4", outer_diameter: "24", thickness: "2", material: "Çelik, Çinko Kaplama" },
          },
        ],
      },
    ],
  },
  {
    slug: "el-aletleri",
    name: "El Aletleri",
    description: "Tornavida, pense, anahtar takımları ve diğer el aletleri.",
    icon: "🛠️",
    subcategories: [
      {
        slug: "tornavidalar",
        name: "Tornavidalar",
        description: "Yıldız, düz uçlu ve izoleli tornavidalar.",
        icon: "🪛",
        specDefs: [
          { key: "tip_type", label: "Uç Tipi" },
          { key: "tip_size", label: "Uç Genişliği", unit: "mm" },
          { key: "handle_material", label: "Sap Malzemesi" },
          { key: "total_length", label: "Toplam Uzunluk", unit: "mm" },
        ],
        products: [
          {
            sku: "TOOL-SD-PH2",
            name: "Yıldız Tornavida PH2",
            description: "Ergonomik saplı, manyetik uçlu PH2 yıldız tornavida.",
            icon: "🪛",
            priceCents: 4500,
            specs: { tip_type: "Yıldız (Phillips PH2)", tip_size: "6", handle_material: "PP/TPR", total_length: "215" },
          },
          {
            sku: "TOOL-SD-FLAT-5.5",
            name: "Düz Uçlu Tornavida 5.5mm",
            description: "Krom vanadyum çelik uçlu düz tornavida.",
            icon: "🪛",
            priceCents: 4200,
            specs: { tip_type: "Düz Uçlu", tip_size: "5.5", handle_material: "PP/TPR", total_length: "210" },
          },
          {
            sku: "TOOL-SD-INS-PH1-1000V",
            name: "İzole Tornavida PH1 (1000V)",
            description: "VDE onaylı, 1000V'a kadar izoleli elektrikçi tornavidası.",
            icon: "🪛",
            priceCents: 8900,
            specs: { tip_type: "Yıldız (Phillips PH1)", tip_size: "5", handle_material: "İzoleli PP", total_length: "195" },
          },
          {
            sku: "TOOL-SD-SET6",
            name: "Hassas Tornavida Seti (6 Parça)",
            description: "Elektronik cihazlar için hassas yıldız ve düz uçlu tornavida seti.",
            icon: "🪛",
            priceCents: 15900,
            specs: { tip_type: "Karışık (PH000-PH1, Düz)", tip_size: "1.5-3", handle_material: "Alüminyum", total_length: "150" },
          },
        ],
      },
      {
        slug: "pense-ve-kargaburunlar",
        name: "Pense ve Kargaburunlar",
        description: "Yan keski, kargaburun ve kombine pense çeşitleri.",
        icon: "🔧",
        specDefs: [
          { key: "type", label: "Tip" },
          { key: "length", label: "Uzunluk", unit: "mm" },
          { key: "material", label: "Malzeme" },
          { key: "insulation", label: "İzolasyon" },
        ],
        products: [
          {
            sku: "TOOL-PLR-CUT-160",
            name: "Yan Keski Pense 160mm",
            description: "İnce ve kalın teller için krom vanadyum çelik yan keski.",
            icon: "🔧",
            priceCents: 6500,
            specs: { type: "Yan Keski", length: "160", material: "Krom Vanadyum Çelik", insulation: "Yok" },
          },
          {
            sku: "TOOL-PLR-LONG-200",
            name: "Kargaburun Pense 200mm",
            description: "Dar alanlarda çalışmak için uzun ağızlı kargaburun.",
            icon: "🔧",
            priceCents: 7200,
            specs: { type: "Kargaburun", length: "200", material: "Krom Vanadyum Çelik", insulation: "Yok" },
          },
          {
            sku: "TOOL-PLR-COMBI-180-1000V",
            name: "İzoleli Kombine Pense 180mm (1000V)",
            description: "VDE 1000V onaylı izoleli kombine pense.",
            icon: "🔧",
            priceCents: 12500,
            specs: { type: "Kombine", length: "180", material: "Krom Vanadyum Çelik", insulation: "1000V VDE" },
          },
          {
            sku: "TOOL-PLR-WATER-250",
            name: "Su Pompası Pensesi 250mm",
            description: "Ayarlanabilir ağız açıklığına sahip su pompası pensesi.",
            icon: "🔧",
            priceCents: 9800,
            specs: { type: "Su Pompası", length: "250", material: "Krom Vanadyum Çelik", insulation: "Yok" },
          },
        ],
      },
      {
        slug: "anahtar-takimlari",
        name: "Anahtar Takımları",
        description: "Açık ağız, allen ve lokma anahtar takımları.",
        icon: "🔧",
        specDefs: [
          { key: "type", label: "Tip" },
          { key: "size_range", label: "Ölçü Aralığı" },
          { key: "material", label: "Malzeme" },
          { key: "piece_count", label: "Parça Sayısı" },
        ],
        products: [
          {
            sku: "TOOL-WR-COMBI-12PC",
            name: "Açık Ağız Yıldız Anahtar Takımı (12 Parça)",
            description: "8-22mm aralığında combine (açık ağız/yıldız) anahtar takımı.",
            icon: "🔧",
            priceCents: 89900,
            specs: { type: "Combine Anahtar", size_range: "8-22mm", material: "Krom Vanadyum Çelik", piece_count: "12" },
          },
          {
            sku: "TOOL-WR-ALLEN-9PC",
            name: "Allen Anahtar Seti (9 Parça)",
            description: "1.5-10mm aralığında L tipi altıgen (allen) anahtar seti.",
            icon: "🔧",
            priceCents: 24900,
            specs: { type: "Allen (L Tipi)", size_range: "1.5-10mm", material: "Krom Vanadyum Çelik", piece_count: "9" },
          },
          {
            sku: "TOOL-WR-SOCKET-24PC",
            name: "Lokma Takımı 1/2\" (24 Parça)",
            description: "10-32mm aralığında 1/2 inç sürücülü lokma takımı, çantalı.",
            icon: "🔧",
            priceCents: 149900,
            specs: { type: "Lokma", size_range: "10-32mm", material: "Krom Vanadyum Çelik", piece_count: "24" },
          },
          {
            sku: "TOOL-WR-ADJ-250",
            name: "Ayarlı İngiliz Anahtarı 250mm",
            description: "Ayarlanabilir ağız açıklığına sahip İngiliz anahtarı.",
            icon: "🔧",
            priceCents: 32900,
            specs: { type: "Ayarlı (İngiliz)", size_range: "0-30mm", material: "Krom Vanadyum Çelik", piece_count: "1" },
          },
        ],
      },
    ],
  },
  {
    slug: "hammadde",
    name: "Hammadde",
    description: "Alüminyum, paslanmaz çelik ve plastik ham malzemeler.",
    icon: "🏗️",
    subcategories: [
      {
        slug: "aluminyum-profil-ve-levhalar",
        name: "Alüminyum Profil ve Levhalar",
        description: "Alüminyum levha, köşebent ve perfore profiller.",
        icon: "⬜",
        specDefs: [
          { key: "alloy", label: "Alaşım" },
          { key: "thickness", label: "Kalınlık", unit: "mm" },
          { key: "width", label: "En", unit: "mm" },
          { key: "length", label: "Boy", unit: "mm" },
        ],
        products: [
          {
            sku: "RAW-AL-SHEET-6061-3",
            name: "Alüminyum Levha 6061 T6 3mm",
            description: "Genel amaçlı, yüksek mukavemetli 6061 T6 alüminyum levha.",
            icon: "⬜",
            priceCents: 68000,
            specs: { alloy: "6061 T6", thickness: "3", width: "1000", length: "2000" },
          },
          {
            sku: "RAW-AL-ANGLE-20X20",
            name: "Alüminyum Köşebent Profil 20x20mm",
            description: "Konstrüksiyon ve montaj için eşit kollu alüminyum köşebent.",
            icon: "⬜",
            priceCents: 12500,
            specs: { alloy: "6063 T5", thickness: "2", width: "20", length: "2000" },
          },
          {
            sku: "RAW-AL-SHEET-5754-5",
            name: "Alüminyum Levha 5754 5mm",
            description: "Deniz suyu ve kimyasallara dayanıklı 5754 alaşımlı levha.",
            icon: "⬜",
            priceCents: 98000,
            specs: { alloy: "5754", thickness: "5", width: "1000", length: "2000" },
          },
          {
            sku: "RAW-AL-PERF-2",
            name: "Delikli Alüminyum Levha (Perfore) 2mm",
            description: "Havalandırma ve dekoratif kaplamalar için delikli alüminyum levha.",
            icon: "⬜",
            priceCents: 54000,
            specs: { alloy: "1050", thickness: "2", width: "1000", length: "2000" },
          },
        ],
      },
      {
        slug: "paslanmaz-celik-cubuklar",
        name: "Paslanmaz Çelik Çubuklar",
        description: "Yuvarlak, altıgen ve kare profil paslanmaz çubuklar.",
        icon: "⬜",
        specDefs: [
          { key: "steel_grade", label: "Çelik Türü" },
          { key: "diameter", label: "Çap", unit: "mm" },
          { key: "length", label: "Boy", unit: "mm" },
        ],
        products: [
          {
            sku: "RAW-SS-ROUND-304-10",
            name: "Paslanmaz Çelik Yuvarlak Çubuk 304 Ø10mm",
            description: "Genel kullanım için 304 kalite paslanmaz yuvarlak çubuk.",
            icon: "⬜",
            priceCents: 28000,
            specs: { steel_grade: "304", diameter: "10", length: "1000" },
          },
          {
            sku: "RAW-SS-ROUND-316L-16",
            name: "Paslanmaz Çelik Yuvarlak Çubuk 316L Ø16mm",
            description: "Kimyasal ve deniz ortamlarına dayanıklı 316L paslanmaz çubuk.",
            icon: "⬜",
            priceCents: 61000,
            specs: { steel_grade: "316L", diameter: "16", length: "1000" },
          },
          {
            sku: "RAW-SS-HEX-304-17",
            name: "Paslanmaz Çelik Altıgen Çubuk 304 17mm",
            description: "CNC işleme için 304 kalite altıgen profil paslanmaz çubuk.",
            icon: "⬜",
            priceCents: 42000,
            specs: { steel_grade: "304", diameter: "17", length: "1000" },
          },
          {
            sku: "RAW-SS-SQUARE-304-20",
            name: "Paslanmaz Çelik Kare Profil 304 20x20mm",
            description: "Konstrüksiyon uygulamaları için 304 kalite kare profil.",
            icon: "⬜",
            priceCents: 45000,
            specs: { steel_grade: "304", diameter: "20", length: "1000" },
          },
        ],
      },
      {
        slug: "plastik-levhalar",
        name: "Plastik Levhalar",
        description: "Polikarbonat, POM, PVC ve akrilik levhalar.",
        icon: "🟦",
        specDefs: [
          { key: "material", label: "Malzeme" },
          { key: "thickness", label: "Kalınlık", unit: "mm" },
          { key: "color", label: "Renk" },
          { key: "length", label: "Boy", unit: "mm" },
        ],
        products: [
          {
            sku: "RAW-PL-PC-4",
            name: "Polikarbonat Şeffaf Levha 4mm",
            description: "Darbeye dayanıklı, şeffaf polikarbonat levha.",
            icon: "🟦",
            priceCents: 32000,
            specs: { material: "Polikarbonat", thickness: "4", color: "Şeffaf", length: "2000" },
          },
          {
            sku: "RAW-PL-POM-10",
            name: "POM (Delrin) Levha 10mm",
            description: "Düşük sürtünmeli, hassas işleme için POM mühendislik plastiği.",
            icon: "🟦",
            priceCents: 58000,
            specs: { material: "POM (Delrin)", thickness: "10", color: "Beyaz/Siyah", length: "1000" },
          },
          {
            sku: "RAW-PL-PVC-5-GRI",
            name: "PVC Sert Levha Gri 5mm",
            description: "Kimyasal dayanımı yüksek, işlenebilir sert PVC levha.",
            icon: "🟦",
            priceCents: 27000,
            specs: { material: "Sert PVC", thickness: "5", color: "Gri", length: "1000" },
          },
          {
            sku: "RAW-PL-ACR-3",
            name: "Akrilik (Pleksi) Levha Şeffaf 3mm",
            description: "Yüksek şeffaflıkta, kolay işlenebilir akrilik levha.",
            icon: "🟦",
            priceCents: 24000,
            specs: { material: "Akrilik (PMMA)", thickness: "3", color: "Şeffaf", length: "2000" },
          },
        ],
      },
    ],
  },
  {
    slug: "is-guvenligi",
    name: "İş Güvenliği",
    description: "Koruyucu gözlük, eldiven, baret ve kişisel koruyucu ekipmanlar.",
    icon: "🦺",
    subcategories: [
      {
        slug: "koruyucu-gozlukler",
        name: "Koruyucu Gözlükler",
        description: "Standartlara uygun iş güvenliği gözlükleri.",
        icon: "🥽",
        specDefs: [
          { key: "standard", label: "Standart" },
          { key: "lens_color", label: "Lens Rengi" },
          { key: "uv_protection", label: "UV Koruma" },
        ],
        products: [
          {
            sku: "PPE-GLS-CLEAR",
            name: "Şeffaf Koruyucu Gözlük EN166",
            description: "Darbeye dayanıklı, çizilmeye karşı kaplamalı şeffaf gözlük.",
            icon: "🥽",
            priceCents: 4500,
            specs: { standard: "EN166", lens_color: "Şeffaf", uv_protection: "Evet" },
          },
          {
            sku: "PPE-GLS-SUN",
            name: "Güneş Koruyucu İş Gözlüğü (Gri Lens)",
            description: "Açık alanda çalışanlar için güneş koruyucu iş gözlüğü.",
            icon: "🥽",
            priceCents: 5200,
            specs: { standard: "EN166", lens_color: "Gri", uv_protection: "Evet" },
          },
          {
            sku: "PPE-GLS-ANTIFOG",
            name: "Buğu Önleyici Koruyucu Gözlük",
            description: "Nemli ortamlar için buğu önleyici kaplamalı gözlük.",
            icon: "🥽",
            priceCents: 6800,
            specs: { standard: "EN166", lens_color: "Şeffaf", uv_protection: "Evet" },
          },
          {
            sku: "PPE-GLS-WELD-DIN5",
            name: "Kaynakçı Gözlüğü (Yeşil Lens, DIN 5)",
            description: "Gaz kaynağı ve kesme işlemleri için koyu yeşil lensli gözlük.",
            icon: "🥽",
            priceCents: 7900,
            specs: { standard: "EN169", lens_color: "Yeşil (DIN 5)", uv_protection: "Evet" },
          },
        ],
      },
      {
        slug: "is-eldivenleri",
        name: "İş Eldivenleri",
        description: "Kesilmeye dayanıklı, nitril ve deri iş eldivenleri.",
        icon: "🧤",
        specDefs: [
          { key: "material", label: "Malzeme" },
          { key: "size", label: "Beden" },
          { key: "use_case", label: "Kullanım Alanı" },
        ],
        products: [
          {
            sku: "PPE-GLV-CUT5-L",
            name: "Kesilmeye Dayanıklı Eldiven (Seviye 5)",
            description: "HPPE örgü, seviye 5 kesilme dirençli iş eldiveni.",
            icon: "🧤",
            priceCents: 8900,
            specs: { material: "HPPE Örgü", size: "L", use_case: "Metal İşleme, Cam" },
          },
          {
            sku: "PPE-GLV-NITRILE-M",
            name: "Nitril Kaplamalı İş Eldiveni",
            description: "Yağlı ve ıslak ortamlarda kavrama sağlayan nitril kaplı eldiven.",
            icon: "🧤",
            priceCents: 4200,
            specs: { material: "Pamuk/Nitril", size: "M", use_case: "Genel Amaçlı, Montaj" },
          },
          {
            sku: "PPE-GLV-LEATHER-WELD",
            name: "Deri Kaynakçı Eldiveni",
            description: "Isıya dayanıklı, uzun manşetli kaynakçı eldiveni.",
            icon: "🧤",
            priceCents: 11500,
            specs: { material: "Kalın Deri", size: "L/XL", use_case: "Kaynak, Sıcak İşler" },
          },
          {
            sku: "PPE-GLV-DISP-100",
            name: "Tek Kullanımlık Nitril Eldiven (Kutu, 100 Adet)",
            description: "Pudrasız, tek kullanımlık nitril muayene eldiveni.",
            icon: "🧤",
            priceCents: 15900,
            specs: { material: "Nitril", size: "M/L (Karışık Kutu)", use_case: "Hijyen, Hassas İşler" },
          },
        ],
      },
      {
        slug: "baret-ve-kafa-koruma",
        name: "Baret ve Kafa Koruma",
        description: "İş bareti, yüz siperliği ve kafa koruma aksesuarları.",
        icon: "⛑️",
        specDefs: [
          { key: "standard", label: "Standart" },
          { key: "color", label: "Renk" },
          { key: "adjustment", label: "Ayarlama Tipi" },
        ],
        products: [
          {
            sku: "PPE-HAT-WHITE",
            name: "Beyaz İş Bareti EN397",
            description: "Darbe emici, ayarlanabilir bantlı standart iş bareti.",
            icon: "⛑️",
            priceCents: 12900,
            specs: { standard: "EN397", color: "Beyaz", adjustment: "Cırt Cırtlı" },
          },
          {
            sku: "PPE-HAT-YELLOW-VENT",
            name: "Sarı İş Bareti Vantilasyonlu",
            description: "Sıcak ortamlar için havalandırma delikli iş bareti.",
            icon: "⛑️",
            priceCents: 14900,
            specs: { standard: "EN397", color: "Sarı", adjustment: "Vida Ayarlı" },
          },
          {
            sku: "PPE-HAT-SWEATBAND",
            name: "Baret Ter Bandı (Yedek)",
            description: "Bareti sabitleyen iç aparat için yedek ter emici bant.",
            icon: "⛑️",
            priceCents: 2900,
            specs: { standard: "-", color: "Siyah", adjustment: "Cırt Cırtlı" },
          },
          {
            sku: "PPE-FACESHIELD",
            name: "Yüz Koruma Siperliği (Bareti Uyumlu)",
            description: "Taşlama ve kesme işlerinde yüzü koruyan takılabilir siperlik.",
            icon: "⛑️",
            priceCents: 9800,
            specs: { standard: "EN166", color: "Şeffaf", adjustment: "Baret Klipsli" },
          },
        ],
      },
    ],
  },
  {
    slug: "elektrik",
    name: "Elektrik",
    description: "Kablo, sigorta, anahtar ve priz gibi elektrik malzemeleri.",
    icon: "⚡",
    subcategories: [
      {
        slug: "kablolar",
        name: "Kablolar",
        description: "NYA, NYM ve topraklama kabloları.",
        icon: "🔌",
        specDefs: [
          { key: "cross_section", label: "Kesit", unit: "mm²" },
          { key: "conductor_count", label: "İletken Sayısı" },
          { key: "insulation", label: "Yalıtım Tipi" },
          { key: "length", label: "Boy", unit: "m" },
        ],
        products: [
          {
            sku: "ELE-CBL-NYA-2.5-100",
            name: "NYA Tek Damarlı Kablo 2.5mm² (100m)",
            description: "Tesisat için tek damarlı, PVC izoleli NYA kablo.",
            icon: "🔌",
            priceCents: 89000,
            specs: { cross_section: "2.5", conductor_count: "1", insulation: "PVC", length: "100" },
          },
          {
            sku: "ELE-CBL-NYM-3X1.5-100",
            name: "NYM Çok Damarlı Kablo 3x1.5mm² (100m)",
            description: "Sıva altı/üstü kullanım için çift izoleli NYM kablo.",
            icon: "🔌",
            priceCents: 165000,
            specs: { cross_section: "1.5", conductor_count: "3", insulation: "PVC Çift İzoleli", length: "100" },
          },
          {
            sku: "ELE-CBL-GND-6",
            name: "Topraklama Kablosu 6mm² (Yeşil-Sarı)",
            description: "Topraklama hatları için yeşil-sarı işaretli kablo.",
            icon: "🔌",
            priceCents: 42000,
            specs: { cross_section: "6", conductor_count: "1", insulation: "PVC", length: "100" },
          },
          {
            sku: "ELE-CBL-FLEX-3X2.5",
            name: "Esnek Güç Kablosu 3x2.5mm²",
            description: "Hareketli ekipman bağlantıları için esnek güç kablosu.",
            icon: "🔌",
            priceCents: 195000,
            specs: { cross_section: "2.5", conductor_count: "3", insulation: "Kauçuk", length: "100" },
          },
        ],
      },
      {
        slug: "sigortalar",
        name: "Sigortalar",
        description: "Otomatik sigorta ve kaçak akım röleleri.",
        icon: "🧯",
        specDefs: [
          { key: "current_rating", label: "Anma Akımı", unit: "A" },
          { key: "poles", label: "Kutup Sayısı" },
          { key: "breaking_capacity", label: "Kesme Kapasitesi", unit: "kA" },
        ],
        products: [
          {
            sku: "ELE-MCB-C16-1P",
            name: "Otomatik Sigorta C16 (1 Kutup)",
            description: "Aydınlatma ve priz hatları için C tipi otomatik sigorta.",
            icon: "🧯",
            priceCents: 19500,
            specs: { current_rating: "16", poles: "1", breaking_capacity: "6" },
          },
          {
            sku: "ELE-MCB-C25-1P",
            name: "Otomatik Sigorta C25 (1 Kutup)",
            description: "Yüksek yüklü priz hatları için C tipi otomatik sigorta.",
            icon: "🧯",
            priceCents: 21500,
            specs: { current_rating: "25", poles: "1", breaking_capacity: "6" },
          },
          {
            sku: "ELE-RCD-30MA-40A",
            name: "Kaçak Akım Rölesi (RCD) 30mA 40A",
            description: "Elektrik çarpmasına karşı koruma sağlayan kaçak akım rölesi.",
            icon: "🧯",
            priceCents: 68000,
            specs: { current_rating: "40", poles: "2", breaking_capacity: "10" },
          },
          {
            sku: "ELE-MCB-B10-3P",
            name: "Otomatik Sigorta B10 (3 Kutup)",
            description: "Hassas elektronik yükler için B tipi 3 kutuplu sigorta.",
            icon: "🧯",
            priceCents: 54000,
            specs: { current_rating: "10", poles: "3", breaking_capacity: "6" },
          },
        ],
      },
      {
        slug: "anahtar-ve-prizler",
        name: "Anahtar ve Prizler",
        description: "Priz, anahtar ve kombinasyon panelleri.",
        icon: "🔌",
        specDefs: [
          { key: "type", label: "Tip" },
          { key: "current_rating", label: "Anma Akımı", unit: "A" },
          { key: "color", label: "Renk" },
        ],
        products: [
          {
            sku: "ELE-OUT-GROUND-WHITE",
            name: "Topraklı Priz (Beyaz)",
            description: "Sıva altı montaj için topraklı standart priz.",
            icon: "🔌",
            priceCents: 8900,
            specs: { type: "Topraklı Priz", current_rating: "16", color: "Beyaz" },
          },
          {
            sku: "ELE-SW-SINGLE-WHITE",
            name: "Tek Buton Anahtar (Beyaz)",
            description: "Sıva altı montaj için tek buton aydınlatma anahtarı.",
            icon: "🔌",
            priceCents: 7500,
            specs: { type: "Tek Buton Anahtar", current_rating: "10", color: "Beyaz" },
          },
          {
            sku: "ELE-OUT-IP44",
            name: "Su Geçirmez Priz (IP44)",
            description: "Nemli ortamlar ve dış mekan için IP44 korumalı priz.",
            icon: "🔌",
            priceCents: 15900,
            specs: { type: "Topraklı Priz (IP44)", current_rating: "16", color: "Gri" },
          },
          {
            sku: "ELE-COMBO-PANEL",
            name: "Kombinasyon Anahtar+Priz Paneli",
            description: "Tek çerçevede anahtar ve priz kombinasyonu paneli.",
            icon: "🔌",
            priceCents: 21900,
            specs: { type: "Anahtar + Priz", current_rating: "16", color: "Beyaz" },
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("Seeding database...");

  // Clean slate so this script is safely re-runnable.
  await prisma.productSpecValue.deleteMany();
  await prisma.product.deleteMany();
  await prisma.specDefinition.deleteMany();
  await prisma.category.deleteMany();

  let topSort = 0;
  for (const cat of CATEGORIES) {
    const topCategory = await prisma.category.create({
      data: {
        slug: cat.slug,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        sortOrder: topSort++,
      },
    });

    let subSort = 0;
    for (const sub of cat.subcategories) {
      const subCategory = await prisma.category.create({
        data: {
          slug: sub.slug,
          name: sub.name,
          description: sub.description,
          icon: sub.icon,
          sortOrder: subSort++,
          parentId: topCategory.id,
        },
      });

      const specDefByKey = new Map<string, string>();
      let specSort = 0;
      for (const specDef of sub.specDefs) {
        const created = await prisma.specDefinition.create({
          data: {
            categoryId: subCategory.id,
            key: specDef.key,
            label: specDef.label,
            unit: specDef.unit,
            sortOrder: specSort++,
          },
        });
        specDefByKey.set(specDef.key, created.id);
      }

      for (const product of sub.products) {
        await prisma.product.create({
          data: {
            slug: product.sku.toLowerCase(),
            sku: product.sku,
            name: product.name,
            description: product.description,
            icon: product.icon,
            priceCents: product.priceCents,
            categoryId: subCategory.id,
            specs: {
              create: Object.entries(product.specs).map(([key, value]) => ({
                specDefId: specDefByKey.get(key)!,
                value,
              })),
            },
          },
        });
      }
    }
  }

  const categoryCount = await prisma.category.count();
  const productCount = await prisma.product.count();
  console.log(`Seeded ${categoryCount} categories and ${productCount} products.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
