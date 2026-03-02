export type Exhibition = {
  id: number;
  slug: string;
  artist: string;
  projectName: string;
  image: string;
  orientation: "horizontal" | "vertical";
  introduction: string;
  collaboration?: string;
  exhibitionSpace?: string;
};

export const exhibitions: Exhibition[] = [
  {
    id: 1,
    slug: "giulia-piermartiri-e-edoardo-delille",
    artist: "Giulia Piermartiri e Edoardo Delille",
    projectName: "progetto in arrivo",
    image: "/mostre/mostra-1.jpg",
    orientation: "horizontal",
    introduction:
      "Giulia Piermartiri ed Edoardo Delille sono fotografi italiani attivi nella fotografia documentaria e di ricerca. Il loro lavoro indaga il rapporto tra territorio, comunità e trasformazioni ambientali e sociali, con un approccio che unisce rigore documentaristico e costruzione narrativa.\n\nLavorano insieme al progetto a lungo termine Atlas of the New World, una ricerca visiva sul cambiamento climatico e sui suoi effetti concreti sui paesaggi e sulle popolazioni, sviluppata attraverso un lavoro sul campo in diverse aree del mondo. Le loro immagini sono state esposte e pubblicate a livello internazionale, affermando una fotografia che non si limita alla testimonianza, ma invita a riflettere su scenari presenti e futuri.",
    collaboration: "collaborazione con la fondazione",
    exhibitionSpace: "spazio1",
  },
  {
    id: 2,
    slug: "cristina-vatielli",
    artist: "Cristina Vatielli",
    projectName: "progetto in arrivo",
    image: "/mostre/mostra-2.jpg",
    orientation: "vertical",
    introduction:
      "Cristina Vatielli è una fotografa italiana nata a Roma e riconosciuta per il suo lavoro che fonde approccio documentario, ritrattistico e narrazione visiva. Dopo essersi diplomata presso la Scuola Romana di Fotografia, ha iniziato la sua carriera come assistente e specialista in post-produzione collaborando con fotografi internazionali, tra cui Paolo Pellegrin.\n\nDalla metà degli anni 2000 ha sviluppato progetti personali di ricerca visiva che esplorano memoria storica, identità collettiva e rappresentazione scenica, come Le Donne di Picasso, una serie di ritratti reenacted sulle donne che hanno influenzato Pablo Picasso, e Exilio de dentro, un lavoro sulla memoria della Guerra Civile Spagnola. Il suo linguaggio unisce elementi documentari e staged photography, con un uso intenso del ritratto e della luce per restituire storie complesse.\n\nVatielli ha ricevuto riconoscimenti importanti, tra cui il Sony World Photography Award, il Julia Margaret Cameron Award, PX3 e IPA, e le sue opere sono rappresentate dalla Galleria del Cembalo a Roma e pubblicate su riviste internazionali. Il suo impegno creativo comprende anche mostre come Terra Mater, che affrontano tematiche contemporanee legate alla natura e all'esperienza umana.",
    collaboration: "collaborazione con la fondazione",
    exhibitionSpace: "spazio1",
  },
  {
    id: 3,
    slug: "francesco-pistilli",
    artist: "Francesco Pistilli",
    projectName: "progetto in arrivo",
    image: "/mostre/mostra-3.jpg",
    orientation: "vertical",
    introduction:
      "Francesco Pistilli è un fotografo documentarista, filmmaker e docente italiano noto a livello internazionale per il suo lavoro che indaga temi politici, sociali e umanitari attraverso immagini di forte impatto e profonda empatia. Nel 2018 ha ricevuto il World Press Photo Award nella categoria General News Stories per la serie Lives in Limbo, un progetto che documenta le condizioni e le esperienze dei migranti in transito in Europa e oltre.\n\nIl suo lavoro è stato pubblicato su testate di rilievo mondiale quali TIME, National Geographic, Nature, Libération, BBC, Le Monde, L'Espresso, Internazionale, Politico, Wired, Elle e Vanity Fair, e il suo archivio è rappresentato dall'agenzia Laif.\n\nPistilli combina reportage visivo e narrazione cinematografica per esplorare questioni di migrazione, conflitto, crisi ambientali e diritti umani, collaborando regolarmente con ONG e fondazioni internazionali. Ha svolto progetti sul campo in Africa, Medio Oriente, Europa, Asia e Americhe, documentando storie che connettono esperienze locali a dinamiche globali.",
    collaboration: "collaborazione con la fondazione",
    exhibitionSpace: "spazio1",
  },
  {
    id: 4,
    slug: "ronin-platform",
    artist: "Ronin Platform",
    projectName: "progetto in arrivo",
    image: "/mostre/mostra-4.jpg",
    orientation: "horizontal",
    introduction:
      "Ronin Platform è un piattaforma indipendente di fotografia e narrazione visiva composta da quattro fotografi: Alfredo Bosco, Giacomo d'Orlando, Karl Mancini e Annalaura Cattelan. Il collettivo lavora nel campo della fotografia documentaria e del reportage contemporaneo, con un focus sulle trasformazioni sociali, ambientali e culturali del mondo attuale.\n\nRonin Platform sviluppa progetti editoriali e di ricerca visiva attraverso un approccio rigoroso al racconto fotografico, collaborando con media, istituzioni culturali e organizzazioni internazionali. La piattaforma nasce come spazio condiviso di produzione, confronto e formazione, con l'obiettivo di promuovere una fotografia consapevole, critica e profondamente legata al contesto contemporaneo.",
    collaboration: "collaborazione con la fondazione",
    exhibitionSpace: "spazio1",
  },
];

export function getExhibitionBySlug(slug: string): Exhibition | undefined {
  return exhibitions.find((exhibition) => exhibition.slug === slug);
}

