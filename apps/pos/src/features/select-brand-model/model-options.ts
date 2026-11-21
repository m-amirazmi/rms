import type { DeviceCategory } from "@/features/wizard"

import type { DeviceModel } from "./types"

const mockModels = (...names: string[]): DeviceModel[] =>
  names.map((name) => ({
    id: `mock-${name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")}`,
    name,
  }))

export const MODEL_OPTIONS_BY_CATEGORY: Record<
  DeviceCategory,
  Record<string, DeviceModel[]>
> = {
  smartphone: {
    apple: [
      { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max" },
      { id: "iphone-16-pro", name: "iPhone 16 Pro" },
      { id: "iphone-15", name: "iPhone 15" },
      ...mockModels("iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11"),
    ],
    samsung: [
      { id: "galaxy-s25-ultra", name: "Galaxy S25 Ultra" },
      { id: "galaxy-s24", name: "Galaxy S24" },
      { id: "galaxy-a55", name: "Galaxy A55" },
      ...mockModels("Galaxy S23", "Galaxy S22", "Galaxy A54", "Galaxy Note20"),
    ],
    xiaomi: [
      { id: "xiaomi-15-pro", name: "Xiaomi 15 Pro" },
      { id: "redmi-note-14-pro", name: "Redmi Note 14 Pro" },
      { id: "redmi-14", name: "Redmi 14" },
      ...mockModels(
        "Xiaomi 14",
        "Xiaomi 13T Pro",
        "Redmi Note 13 Pro",
        "Poco X6 Pro"
      ),
    ],
    oppo: [
      { id: "find-x8-pro", name: "Find X8 Pro" },
      { id: "reno-13-pro", name: "Reno 13 Pro" },
      { id: "a5-pro", name: "A5 Pro" },
      ...mockModels("Find X7 Ultra", "Reno 12 Pro", "Reno 11", "A3 Pro"),
    ],
    google: mockModels(
      "Pixel 9 Pro",
      "Pixel 9",
      "Pixel 8 Pro",
      "Pixel 8a",
      "Pixel 7 Pro",
      "Pixel 7",
      "Pixel 6a"
    ),
    oneplus: mockModels(
      "OnePlus 13",
      "OnePlus 12",
      "OnePlus 12R",
      "OnePlus 11",
      "OnePlus Nord 4",
      "OnePlus Nord CE4",
      "OnePlus Nord N30"
    ),
    motorola: mockModels(
      "Motorola razr 50 ultra",
      "Motorola edge 50 pro",
      "Motorola edge 50 fusion",
      "Moto g85",
      "Moto g75",
      "Moto g54",
      "Motorola razr 40"
    ),
    sony: mockModels(
      "Xperia 1 VI",
      "Xperia 5 V",
      "Xperia 10 VI",
      "Xperia 1 V",
      "Xperia 5 IV",
      "Xperia 10 V",
      "Xperia 1 IV"
    ),
    nokia: mockModels(
      "Nokia G42",
      "Nokia G60",
      "Nokia X30",
      "Nokia XR21",
      "Nokia C32",
      "Nokia 8.3 5G",
      "Nokia G22"
    ),
    honor: mockModels(
      "HONOR Magic7 Pro",
      "HONOR Magic6 Pro",
      "HONOR 200 Pro",
      "HONOR 200",
      "HONOR X9c",
      "HONOR X8b",
      "HONOR 90"
    ),
  },
  laptop: {
    apple: [
      { id: "macbook-air-13-m4", name: "MacBook Air 13-inch (M4)" },
      { id: "macbook-pro-14-m4", name: "MacBook Pro 14-inch (M4)" },
      { id: "macbook-air-15-m3", name: "MacBook Air 15-inch (M3)" },
      ...mockModels(
        "MacBook Pro 16-inch (M4)",
        "MacBook Pro 14-inch (M3)",
        "MacBook Air 13-inch (M3)",
        "MacBook Pro 13-inch (M2)"
      ),
    ],
    dell: [
      { id: "xps-13-9340", name: "XPS 13 (9340)" },
      { id: "inspiron-14-plus", name: "Inspiron 14 Plus" },
      { id: "latitude-5450", name: "Latitude 5450" },
      ...mockModels("XPS 15", "XPS 16", "Inspiron 16 Plus", "Latitude 7440"),
    ],
    hp: [
      { id: "spectre-x360-14", name: "Spectre x360 14" },
      { id: "pavilion-plus-14", name: "Pavilion Plus 14" },
      { id: "elitebook-840-g11", name: "EliteBook 840 G11" },
      ...mockModels(
        "Spectre x360 16",
        "Envy x360 14",
        "Pavilion Aero 13",
        "EliteBook 860 G11"
      ),
    ],
    lenovo: [
      { id: "thinkpad-x1-carbon-gen-12", name: "ThinkPad X1 Carbon Gen 12" },
      { id: "yoga-7i-14", name: "Yoga 7i 14" },
      { id: "ideapad-slim-5", name: "IdeaPad Slim 5" },
      ...mockModels(
        "ThinkPad T14 Gen 5",
        "ThinkPad X1 Yoga Gen 9",
        "Yoga Pro 9i",
        "Legion Pro 7i"
      ),
    ],
    asus: mockModels(
      "Zenbook 14 OLED",
      "Vivobook S 14",
      "ROG Zephyrus G14",
      "TUF Gaming A15",
      "ExpertBook B9",
      "Zenbook S 16",
      "ProArt P16"
    ),
    acer: mockModels(
      "Swift Go 14",
      "Aspire 5",
      "Predator Helios Neo 16",
      "Nitro V 15",
      "Swift X 14",
      "Chromebook Plus 514",
      "TravelMate P4"
    ),
    microsoft: mockModels(
      "Surface Laptop 7",
      "Surface Pro 11",
      "Surface Laptop Go 3",
      "Surface Laptop Studio 2",
      "Surface Pro 10",
      "Surface Go 4",
      "Surface Laptop 6"
    ),
    msi: mockModels(
      "Stealth 14 AI Studio",
      "Raider GE78 HX",
      "Crosshair 16 HX",
      "Cyborg 15",
      "Modern 14",
      "Prestige 16 AI Studio",
      "Creator Z17 HX Studio"
    ),
    razer: mockModels(
      "Blade 14",
      "Blade 15",
      "Blade 16",
      "Blade 18",
      "Blade Stealth 13",
      "Book 13",
      "Blade 17"
    ),
    samsung: mockModels(
      "Galaxy Book4 Ultra",
      "Galaxy Book4 Pro",
      "Galaxy Book4 360",
      "Galaxy Book3 Ultra",
      "Galaxy Book3 Pro",
      "Galaxy Book4 Edge",
      "Galaxy Book4 Pro 360"
    ),
  },
  tablet: {
    apple: [
      { id: "ipad-pro-13-m4", name: "iPad Pro 13-inch (M4)" },
      { id: "ipad-air-11-m3", name: "iPad Air 11-inch (M3)" },
      { id: "ipad-mini-a17-pro", name: "iPad mini (A17 Pro)" },
      ...mockModels(
        "iPad Pro 11-inch (M4)",
        "iPad Air 13-inch (M3)",
        "iPad 10th gen",
        "iPad 9th gen"
      ),
    ],
    samsung: [
      { id: "galaxy-tab-s10-ultra", name: "Galaxy Tab S10 Ultra" },
      { id: "galaxy-tab-s10-plus", name: "Galaxy Tab S10+" },
      { id: "galaxy-tab-a9-plus", name: "Galaxy Tab A9+" },
      ...mockModels(
        "Galaxy Tab S10",
        "Galaxy Tab S9 Ultra",
        "Galaxy Tab S9 FE",
        "Galaxy Tab S8"
      ),
    ],
    huawei: [
      { id: "matepad-pro-13-2", name: "MatePad Pro 13.2" },
      { id: "matepad-11-5-s", name: "MatePad 11.5 S" },
      { id: "matepad-se-11", name: "MatePad SE 11" },
      ...mockModels(
        "MatePad Pro 11",
        "MatePad 11",
        "MatePad 10.4",
        "MatePad T10s"
      ),
    ],
    xiaomi: [
      { id: "xiaomi-pad-7-pro", name: "Xiaomi Pad 7 Pro" },
      { id: "xiaomi-pad-7", name: "Xiaomi Pad 7" },
      { id: "redmi-pad-pro", name: "Redmi Pad Pro" },
      ...mockModels(
        "Xiaomi Pad 6S Pro",
        "Xiaomi Pad 6",
        "Redmi Pad SE",
        "Xiaomi Pad 5"
      ),
    ],
    lenovo: mockModels(
      "Tab P12",
      "Tab M11",
      "Legion Tab Gen 3",
      "Yoga Tab 13",
      "Tab Extreme",
      "Idea Tab Pro",
      "Tab P11 Pro Gen 2"
    ),
    oneplus: mockModels(
      "OnePlus Pad 2",
      "OnePlus Pad",
      "OnePlus Pad Go",
      "OnePlus Pad Pro",
      "OnePlus Pad 2 12GB",
      "OnePlus Pad 2 16GB",
      "OnePlus Pad Go LTE"
    ),
    oppo: mockModels(
      "OPPO Pad 3 Pro",
      "OPPO Pad 3",
      "OPPO Pad Neo",
      "OPPO Pad 2",
      "OPPO Pad Air",
      "OPPO Pad Air 2",
      "OPPO Pad"
    ),
    honor: mockModels(
      "HONOR Pad 9",
      "HONOR Pad X9",
      "HONOR Pad 8",
      "HONOR Pad V8 Pro",
      "HONOR Pad X8",
      "HONOR Pad 7",
      "HONOR Pad 6"
    ),
    amazon: mockModels(
      "Fire Max 11",
      "Fire HD 10",
      "Fire HD 8",
      "Fire HD 10 Kids",
      "Fire HD 8 Kids",
      "Fire 7",
      "Fire Max 11 Kids"
    ),
    realme: mockModels(
      "realme Pad 2",
      "realme Pad Mini",
      "realme Pad X",
      "realme Pad 2 Lite",
      "realme Pad",
      "realme Pad 5G",
      "realme Pad Pro"
    ),
  },
  wearable: {
    apple: [
      { id: "apple-watch-series-10", name: "Apple Watch Series 10" },
      { id: "apple-watch-ultra-2", name: "Apple Watch Ultra 2" },
      { id: "apple-watch-se-2", name: "Apple Watch SE (2nd gen)" },
      ...mockModels(
        "Apple Watch Series 9",
        "Apple Watch Series 8",
        "Apple Watch Ultra",
        "Apple Watch SE (1st gen)"
      ),
    ],
    samsung: [
      { id: "galaxy-watch-7", name: "Galaxy Watch7" },
      { id: "galaxy-watch-ultra", name: "Galaxy Watch Ultra" },
      { id: "galaxy-watch-fe", name: "Galaxy Watch FE" },
      ...mockModels(
        "Galaxy Watch6 Classic",
        "Galaxy Watch6",
        "Galaxy Watch5 Pro",
        "Galaxy Watch5"
      ),
    ],
    garmin: [
      { id: "forerunner-965", name: "Forerunner 965" },
      { id: "fenix-8", name: "Fenix 8" },
      { id: "venu-3", name: "Venu 3" },
      ...mockModels(
        "Forerunner 265",
        "Fenix 7 Pro",
        "Venu 2 Plus",
        "Instinct 2X"
      ),
    ],
    huawei: [
      { id: "watch-gt-5-pro", name: "Watch GT 5 Pro" },
      { id: "watch-fit-3", name: "Watch Fit 3" },
      { id: "watch-ultimate", name: "Watch Ultimate" },
      ...mockModels("Watch GT 4", "Watch GT 3 Pro", "Watch 4 Pro", "Watch D2"),
    ],
    fitbit: mockModels(
      "Sense 2",
      "Versa 4",
      "Charge 6",
      "Inspire 3",
      "Luxe",
      "Versa 3",
      "Charge 5"
    ),
    amazfit: mockModels(
      "Balance",
      "GTR 4",
      "GTS 4",
      "T-Rex 3",
      "Active 2",
      "Bip 5",
      "GTR Mini"
    ),
    xiaomi: mockModels(
      "Watch S4",
      "Watch 2 Pro",
      "Smart Band 9 Pro",
      "Smart Band 9",
      "Redmi Watch 5",
      "Redmi Watch 4",
      "Watch 2"
    ),
    google: mockModels(
      "Pixel Watch 3 45mm",
      "Pixel Watch 3 41mm",
      "Pixel Watch 2",
      "Pixel Watch LTE",
      "Pixel Watch Wi-Fi",
      "Pixel Watch 2 LTE",
      "Pixel Watch 2 Wi-Fi"
    ),
    fossil: mockModels(
      "Gen 6 Wellness Edition",
      "Gen 6 44mm",
      "Gen 6 42mm",
      "Gen 6 Hybrid",
      "Gen 5 LTE",
      "Gen 5E",
      "Gen 4 Explorist"
    ),
    oneplus: mockModels(
      "OnePlus Watch 2",
      "OnePlus Watch 2R",
      "OnePlus Watch",
      "OnePlus Band",
      "OnePlus Watch 2 46mm",
      "OnePlus Watch 2 Nordic Blue",
      "OnePlus Watch 2R Forest Green"
    ),
  },
  console: {
    sony: [
      { id: "playstation-5", name: "PlayStation 5" },
      { id: "playstation-5-slim", name: "PlayStation 5 Slim" },
      { id: "playstation-5-pro", name: "PlayStation 5 Pro" },
      ...mockModels(
        "PlayStation 4 Pro",
        "PlayStation 4 Slim",
        "PlayStation 4",
        "PlayStation 3"
      ),
    ],
    nintendo: [
      { id: "nintendo-switch-oled", name: "Nintendo Switch OLED" },
      { id: "nintendo-switch-lite", name: "Nintendo Switch Lite" },
      { id: "nintendo-switch", name: "Nintendo Switch" },
      ...mockModels(
        "Nintendo 3DS XL",
        "Nintendo 2DS",
        "New Nintendo 3DS",
        "Nintendo Wii U"
      ),
    ],
    microsoft: [
      { id: "xbox-series-x", name: "Xbox Series X" },
      { id: "xbox-series-s", name: "Xbox Series S" },
      { id: "xbox-one-x", name: "Xbox One X" },
      ...mockModels(
        "Xbox One S",
        "Xbox One",
        "Xbox 360",
        "Xbox Series X Digital"
      ),
    ],
    steam: [
      { id: "steam-deck-oled", name: "Steam Deck OLED" },
      { id: "steam-deck-lcd", name: "Steam Deck LCD" },
      { id: "steam-deck-256gb", name: "Steam Deck 256GB" },
      ...mockModels(
        "Steam Deck 512GB",
        "Steam Deck 1TB",
        "Steam Deck 64GB",
        "Steam Deck OLED 1TB"
      ),
    ],
    atari: mockModels(
      "Atari VCS",
      "Atari 2600+",
      "Atari 7800+",
      "Atari Flashback 12",
      "Atari 50th Anniversary Console",
      "Atari VCS All-in",
      "Atari Flashback 11"
    ),
    sega: mockModels(
      "Genesis Mini 2",
      "Mega Drive Mini",
      "Genesis Mini",
      "Saturn",
      "Dreamcast",
      "Master System",
      "SG-1000"
    ),
    razer: mockModels(
      "Razer Edge Wi-Fi",
      "Razer Edge 5G",
      "Wolverine V2 Pro",
      "Kishi V2 Pro",
      "Kishi Ultra",
      "Wolverine V3 Pro",
      "Kitsune"
    ),
    asus: mockModels(
      "ROG Ally X",
      "ROG Ally Z1 Extreme",
      "ROG Ally Z1",
      "ROG Ally 2023",
      "ROG Ally 2024",
      "ROG Ally X 1TB",
      "ROG Ally Z1 512GB"
    ),
    lenovo: mockModels(
      "Legion Go",
      "Legion Go S",
      "Legion Go 2",
      "Legion Go 8APU1",
      "Legion Go S SteamOS",
      "Legion Go S Windows",
      "Legion Go 1TB"
    ),
    logitech: mockModels(
      "G Cloud",
      "G Cloud White",
      "G29 Driving Force",
      "G923 Racing Wheel",
      "F310 Gamepad",
      "G435 Lightspeed",
      "G502 X Plus"
    ),
  },
  other: {
    dji: [
      { id: "dji-mini-4-pro", name: "DJI Mini 4 Pro" },
      { id: "dji-mavic-3-pro", name: "DJI Mavic 3 Pro" },
      { id: "dji-air-3", name: "DJI Air 3" },
      ...mockModels(
        "DJI Air 3S",
        "DJI Mini 3 Pro",
        "DJI Mini 2 SE",
        "DJI Avata 2"
      ),
    ],
    bose: [
      {
        id: "quietcomfort-ultra-headphones",
        name: "QuietComfort Ultra Headphones",
      },
      { id: "quietcomfort-45", name: "QuietComfort 45" },
      { id: "soundlink-flex", name: "SoundLink Flex" },
      ...mockModels(
        "QuietComfort Ultra Earbuds",
        "QuietComfort Headphones",
        "SoundLink Revolve+ II",
        "SoundLink Max"
      ),
    ],
    sony: [
      { id: "wh-1000xm5", name: "WH-1000XM5" },
      { id: "wf-1000xm5", name: "WF-1000XM5" },
      { id: "playstation-portal", name: "PlayStation Portal" },
      ...mockModels("WH-1000XM4", "WF-1000XM4", "SRS-XB100", "LinkBuds S"),
    ],
    canon: [
      { id: "eos-r6-mark-ii", name: "EOS R6 Mark II" },
      { id: "eos-r50", name: "EOS R50" },
      { id: "powershot-g7-x-mark-iii", name: "PowerShot G7 X Mark III" },
      ...mockModels("EOS R5", "EOS R8", "EOS R10", "PowerShot V10"),
    ],
    jbl: mockModels(
      "JBL Charge 5",
      "JBL Flip 6",
      "JBL Boombox 3",
      "JBL Tune 770NC",
      "JBL Live 770NC",
      "JBL Clip 5",
      "JBL PartyBox Encore"
    ),
    gopro: mockModels(
      "HERO13 Black",
      "HERO12 Black",
      "HERO11 Black",
      "HERO10 Black",
      "HERO9 Black",
      "MAX",
      "HERO11 Mini"
    ),
    fujifilm: mockModels(
      "X100VI",
      "X-T5",
      "X-S20",
      "X-T50",
      "GFX100S II",
      "X-H2",
      "X-M5"
    ),
    nikon: mockModels("Z8", "Z6III", "Zf", "Z50II", "Z7II", "Z30", "D850"),
    anker: mockModels(
      "Soundcore Liberty 4 NC",
      "Soundcore Space One",
      "Soundcore Motion X600",
      "Nebula Capsule 3",
      "Anker 737 Power Bank",
      "Soundcore Q45",
      "Nebula Mars 3"
    ),
    logitech: mockModels(
      "MX Master 3S",
      "MX Keys S",
      "Brio 4K",
      "G Pro X Superlight 2",
      "C920s Pro HD",
      "G Cloud",
      "Zone Vibe 100"
    ),
  },
}
