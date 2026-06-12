// Curated seed content for THE UNDERGROUND ARCHIVE.
// All entries are editable — add, remove, or expand freely.

export type Category = {
  id: string
  code: string
  title: string
  blurb: string
}

export const categories: Category[] = [
  {
    id: "art",
    code: "SEC-01",
    title: "Art Forms as Protest",
    blurb: "Aesthetics weaponized. Murals, song, theatre, and the body as instruments of dissent.",
  },
  {
    id: "interventions",
    code: "SEC-02",
    title: "Creative Interventions",
    blurb: "A timeline of actions that hijacked public space and attention.",
  },
  {
    id: "tech",
    code: "SEC-03",
    title: "Alternative Use of Technology",
    blurb: "Repurposed tools, mesh networks, and circumvention tactics.",
  },
  {
    id: "library",
    code: "SEC-04",
    title: "Library & Documentation",
    blurb: "Books, field manuals, and archives. Read before you act.",
  },
  {
    id: "radio",
    code: "SEC-05",
    title: "The Transmission / Radio",
    blurb: "Our pirate frequency. Sound travels where bodies cannot.",
  },
  {
    id: "tools",
    code: "SEC-06",
    title: "Other Tools & Resources",
    blurb: "Field equipment, legal aid, and the practical kit.",
  },
]

// ── SEC-01 — Art Forms as Protest ───────────────────────────────
export type ArtForm = {
  name: string
  medium: string
  origin: string
  description: string
}

export const artForms: ArtForm[] = [
  {
    name: "Arpilleras",
    medium: "Textile / Embroidery",
    origin: "Chile, 1970s",
    description:
      "Women under Pinochet stitched scenes of repression and disappearance into burlap tapestries, smuggling testimony out of the country as folk craft.",
  },
  {
    name: "Murals of Resistance",
    medium: "Public Painting",
    origin: "Northern Ireland / Mexico",
    description:
      "Walls turned into the front page of the dispossessed — from Belfast's political gables to the Mexican muralist tradition of Rivera and Siqueiros.",
  },
  {
    name: "Protest Song",
    medium: "Music",
    origin: "Global",
    description:
      "From Chilean nueva canción to American folk to Estonia's Singing Revolution, collective voice as a tool that cannot be confiscated.",
  },
  {
    name: "Invisible Theatre",
    medium: "Performance",
    origin: "Brazil (Augusto Boal)",
    description:
      "Theatre of the Oppressed staged scenes in public without announcing them as fiction, provoking real bystanders into political dialogue.",
  },
  {
    name: "Guerrilla Poetry / Spoken Word",
    medium: "Language",
    origin: "Global",
    description:
      "Verse pasted on walls, chanted in squares, and printed in samizdat — language faster to spread than it is to censor.",
  },
  {
    name: "Tactical Costume & Mask",
    medium: "Body / Disguise",
    origin: "Global",
    description:
      "Pussy Riot's balaclavas, Guy Fawkes masks, the Zapatista pasamontañas — anonymity transformed into a recognizable collective face.",
  },
]

// ── SEC-02 — Creative Interventions (timeline) ──────────────────
export type TimelineEvent = {
  year: string
  title: string
  place: string
  description: string
}

export const timeline: TimelineEvent[] = [
  {
    year: "1968",
    title: "Situationist Slogans",
    place: "Paris, France",
    description:
      "May '68 students filled the city with poetic graffiti — 'Sous les pavés, la plage' — turning walls into a manifesto.",
  },
  {
    year: "1989",
    title: "Tank Man",
    place: "Beijing, China",
    description:
      "A single figure with shopping bags halting a column of tanks — the body as the most minimal and total intervention.",
  },
  {
    year: "1989",
    title: "The Baltic Way",
    place: "Estonia / Latvia / Lithuania",
    description:
      "Two million people joined hands in a 675km human chain — choreography as a sovereign declaration.",
  },
  {
    year: "2010",
    title: "Pots & Pans (Cacerolazo)",
    place: "Iceland / Latin America",
    description:
      "Households banging cookware turned domestic objects into a percussive, deniable mass instrument of protest.",
  },
  {
    year: "2013",
    title: "Standing Man",
    place: "Istanbul, Turkey",
    description:
      "Erdem Gündüz stood motionless in Taksim Square for hours — stillness as a form that police had no script to disperse.",
  },
  {
    year: "2019",
    title: "Lennon Walls",
    place: "Hong Kong",
    description:
      "Mosaics of sticky notes blanketed public surfaces; when torn down, they reappeared overnight, decentralized and self-healing.",
  },
  {
    year: "2020",
    title: "Projection Bombing",
    place: "Global",
    description:
      "Light projected onto monuments and buildings to reclaim narrative space without leaving a physical trace.",
  },
]

// ── SEC-03 — Alternative Use of Technology ──────────────────────
export type TechTactic = {
  name: string
  category: string
  description: string
  link?: string
}

export const techTactics: TechTactic[] = [
  {
    name: "Mesh Networks",
    category: "Off-grid comms",
    description:
      "Bluetooth/peer-to-peer apps like Bridgefy and Briar let crowds communicate when the state shuts down the internet.",
    link: "https://briarproject.org",
  },
  {
    name: "Laser Pointers vs. Surveillance",
    category: "Counter-surveillance",
    description:
      "Hong Kong protesters aimed laser arrays at facial-recognition cameras and disrupted tear-gas-firing drones.",
  },
  {
    name: "Air-drop Flyers",
    category: "Proximity broadcast",
    description:
      "AirDrop used to push protest material to nearby strangers on transit, bypassing censored networks entirely.",
  },
  {
    name: "Encrypted Messaging",
    category: "Secure coordination",
    description:
      "Signal and similar end-to-end tools for organizing without exposing membership lists to interception.",
    link: "https://signal.org",
  },
  {
    name: "Telegram & Decentralized Logistics",
    category: "Crowd logistics",
    description:
      "Anonymous polls and channels used to crowd-source frontline supply runs, exits, and live hazard maps.",
  },
  {
    name: "Tor & Mirroring",
    category: "Circumvention",
    description:
      "Censored sites mirrored onto distributed networks and accessed via Tor to keep documentation reachable.",
    link: "https://www.torproject.org",
  },
]

// ── SEC-04 — Library & Documentation ────────────────────────────
export type Resource = {
  title: string
  author: string
  year: string
  note: string
  link?: string
}

export const library: Resource[] = [
  {
    title: "From Dictatorship to Democracy",
    author: "Gene Sharp",
    year: "1993",
    note: "The field manual of nonviolent struggle, with 198 methods of nonviolent action. Translated and smuggled worldwide.",
    link: "https://www.aeinstein.org/nonviolentaction/from-dictatorship-to-democracy/",
  },
  {
    title: "Pedagogy of the Oppressed",
    author: "Paulo Freire",
    year: "1968",
    note: "Foundational text on critical consciousness and education as a practice of freedom.",
  },
  {
    title: "Beautiful Trouble: A Toolbox for Revolution",
    author: "Andrew Boyd (ed.)",
    year: "2012",
    note: "A practical catalog of creative-action tactics, principles, and case studies.",
    link: "https://beautifultrouble.org",
  },
  {
    title: "Theatre of the Oppressed",
    author: "Augusto Boal",
    year: "1974",
    note: "The methodology behind forum and invisible theatre as rehearsal for revolution.",
  },
  {
    title: "Hope in the Dark",
    author: "Rebecca Solnit",
    year: "2004",
    note: "On the unpredictable, often invisible victories of grassroots movements.",
  },
  {
    title: "The Interventionists",
    author: "Nato Thompson (ed.)",
    year: "2004",
    note: "Survey of artists and collectives using everyday life as a medium for political intervention.",
  },
]

// ── SEC-06 — Other Tools & Resources ────────────────────────────
export type ToolItem = {
  name: string
  use: string
  description: string
  link?: string
}

export const tools: ToolItem[] = [
  {
    name: "Security Culture Primer",
    use: "Operational safety",
    description:
      "Guidelines for protecting yourself and others when organizing — what to share, what never to.",
  },
  {
    name: "Legal Observer Network",
    use: "Rights / legal aid",
    description:
      "Trained observers document arrests and police conduct. Know your jurisdiction's rights card.",
  },
  {
    name: "Riso & Photocopy Zines",
    use: "Analog distribution",
    description:
      "Cheap, fast, untraceable print runs — the backbone of samizdat and DIY propaganda.",
  },
  {
    name: "First Aid / Street Medic Kit",
    use: "Care",
    description:
      "Saline for tear gas, trauma basics, and the buddy system. Care work is movement infrastructure.",
  },
  {
    name: "Open Archive Tools",
    use: "Preservation",
    description:
      "Tools like the Wayback Machine and decentralized storage to preserve evidence before it disappears.",
    link: "https://web.archive.org",
  },
  {
    name: "Map / Route Planning",
    use: "Logistics",
    description:
      "Offline maps and pre-planned exits. Never rely on a single channel that can be switched off.",
  },
]

// ── RADIO STATIONS ───────────────────────────────────────────────
// The player streams these in order. Drop in the stream URL(s) from
// your radio project. `src` must be a direct audio stream/file URL
// (e.g. an Icecast/Shoutcast .mp3/.aac endpoint or an .mp3 file).
// Add, remove, or reorder freely.
export type Station = {
  id: string
  name: string
  frequency: string
  description: string
  src: string
}

export const stations: Station[] = [
  {
    id: "main",
    name: "Free Radio — Main Channel",
    frequency: "101.4",
    description: "The signal from the previous project. Replace src with your live stream URL.",
    src: "", // <- paste your stream URL here
  },
  {
    id: "archive",
    name: "Archive Loop",
    frequency: "97.2",
    description: "A looping playlist of recorded transmissions and field recordings.",
    src: "",
  },
  {
    id: "emergency",
    name: "Emergency Broadcast",
    frequency: "88.0",
    description: "Reserved low-band channel for coordinated actions and alerts.",
    src: "",
  },
]
