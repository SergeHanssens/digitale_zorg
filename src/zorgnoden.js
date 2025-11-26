/**
 * InclusieHelper 2.5 - Zorgnoden Kennisbank
 */

export const ZORGNODEN = {
  dyslexie: {
    id: 'dyslexie',
    naam: 'Dyslexie',
    icon: '📖',
    kleur: '#E57373',
    categorie: 'leren',
    beschrijving: 'Hardnekkige problemen met lezen en/of spellen ondanks voldoende onderwijs.',
    uitgebreideInfo: `Dyslexie is een specifieke leerstoornis die wordt gekenmerkt door hardnekkige problemen met accuraat en/of vlot lezen en spellen. Het is neurobiologisch van oorsprong.

**Prevalentie**: Ongeveer 5-10% van de bevolking.

**Belangrijk**: Dyslexie is geen ziekte maar een andere manier van informatieverwerking.`,
    kenmerken: [
      'Traag en/of moeizaam lezen',
      'Veel spelfouten maken',
      'Moeite met onthouden van woordbeelden',
      'Letters en cijfers omdraaien (b/d, 6/9)',
      'Moeite met vreemde talen leren',
      'Vermoeidheid bij lees- en schrijftaken'
    ],
    sterpieken: [
      'Creatief en beeldend denken',
      'Sterk ruimtelijk inzicht',
      'Goed in grote lijnen zien',
      'Goede probleemoplossers',
      'Doorzettingsvermogen'
    ],
    comorbiditeit: ['dyscalculie', 'adhd', 'dcd'],
    hulpmiddelen: ['voorleessoftware', 'spellingcontrole', 'digitale_schoolboeken'],
    links: [
      { naam: 'Dyslexie Centraal', url: 'https://www.dyslexiecentraal.nl', beschrijving: 'Kennisplatform' },
      { naam: 'Balans Digitaal', url: 'https://www.balansdigitaal.nl/stoornissen/dyslexie/', beschrijving: 'Info voor ouders' },
      { naam: 'Sprankel', url: 'https://www.sprankel.be', beschrijving: 'Dyslexievereniging Vlaanderen' }
    ],
    tipsSchool: [
      { titel: 'Voorleessoftware inzetten', beschrijving: 'Gebruik Sprint, Kurzweil of ClaroRead om teksten voor te laten lezen.', prioriteit: 'hoog' },
      { titel: 'Extra tijd geven', beschrijving: 'Geef 25-50% extra tijd bij toetsen.', prioriteit: 'hoog' },
      { titel: 'Digitale toetsen', beschrijving: 'Laat toetsen digitaal maken met spellingcontrole.', prioriteit: 'hoog' },
      { titel: 'Dyslexie-vriendelijk lettertype', beschrijving: 'Gebruik Arial of OpenDyslexic, minimaal 12pt met 1,5 regelafstand.', prioriteit: 'midden' }
    ],
    tipsThuis: [
      { titel: 'Luisterboeken gebruiken', beschrijving: 'Luisterpunt.nl biedt gratis luisterboeken.', prioriteit: 'hoog' },
      { titel: 'Voorlezen blijven doen', beschrijving: 'Blijf voorlezen, ook aan oudere kinderen.', prioriteit: 'hoog' },
      { titel: 'Geen straf voor spelfouten', beschrijving: 'Focus op de inhoud, niet op de spelling.', prioriteit: 'hoog' }
    ]
  },

  dyscalculie: {
    id: 'dyscalculie',
    naam: 'Dyscalculie',
    icon: '🔢',
    kleur: '#64B5F6',
    categorie: 'leren',
    beschrijving: 'Hardnekkige problemen met rekenen en wiskunde.',
    uitgebreideInfo: `Dyscalculie is een specifieke leerstoornis in rekenen en wiskunde.

**Prevalentie**: Ongeveer 3-6% van de bevolking.

**Gevolgen**: Moeite met klokkijken, geldzaken, afstanden inschatten.`,
    kenmerken: [
      'Moeite met automatiseren van tafels',
      'Getallen en cijfers verwisselen',
      'Problemen met klokkijken',
      'Moeite met hoofdrekenen',
      'Verkeerd inschatten van hoeveelheden'
    ],
    sterpieken: [
      'Vaak sterk in taal',
      'Creatief denken',
      'Goed in sociale situaties'
    ],
    comorbiditeit: ['dyslexie', 'adhd', 'nld'],
    hulpmiddelen: ['rekenmachine', 'tafelkaart', 'formulekaart'],
    links: [
      { naam: 'Balans - Dyscalculie', url: 'https://www.balansdigitaal.nl/stoornissen/dyscalculie/', beschrijving: 'Uitgebreide info' },
      { naam: 'Protocol ERWD', url: 'https://www.erwd.nl', beschrijving: 'Richtlijnen' }
    ],
    tipsSchool: [
      { titel: 'Rekenmachine toestaan', beschrijving: 'Laat een rekenmachine gebruiken.', prioriteit: 'hoog' },
      { titel: 'Formulekaart geven', beschrijving: 'Geef een kaart met formules en tafels.', prioriteit: 'hoog' },
      { titel: 'Concreet materiaal', beschrijving: 'Gebruik MAB-blokken of rekenrek.', prioriteit: 'hoog' }
    ],
    tipsThuis: [
      { titel: 'Rekenen in dagelijks leven', beschrijving: 'Oefen tijdens boodschappen of koken.', prioriteit: 'hoog' },
      { titel: 'Geen tijdsdruk', beschrijving: 'Geef je kind de tijd.', prioriteit: 'hoog' }
    ]
  },

  adhd: {
    id: 'adhd',
    naam: 'ADHD',
    icon: '⚡',
    kleur: '#FFB74D',
    categorie: 'gedrag',
    beschrijving: 'Aandachtstekortstoornis met hyperactiviteit.',
    uitgebreideInfo: `ADHD is een neurobiologische ontwikkelingsstoornis met problemen in aandacht, impulsiviteit en/of hyperactiviteit.

**Prevalentie**: Ongeveer 5% van kinderen, 2.5% van volwassenen.

**Belangrijk**: ADHD is geen karakterfout. Het brein werkt anders.`,
    kenmerken: [
      'Moeite met concentreren',
      'Snel afgeleid',
      'Moeite met organiseren en plannen',
      'Vergeetachtig',
      'Niet kunnen stilzitten',
      'Impulsief handelen'
    ],
    sterpieken: [
      'Hyperfocus op interessante taken',
      'Creatief denken',
      'Energiek en enthousiast',
      'Spontaan'
    ],
    comorbiditeit: ['dyslexie', 'dyscalculie', 'ass', 'angst'],
    hulpmiddelen: ['timer', 'fidgets', 'planbord', 'koptelefoon'],
    links: [
      { naam: 'ADHD Centraal', url: 'https://www.adhdcentraal.nl', beschrijving: 'Kenniscentrum' },
      { naam: 'ZitStil', url: 'https://www.zitstil.be', beschrijving: 'Vlaamse ADHD-vereniging' },
      { naam: 'Balans - ADHD', url: 'https://www.balansdigitaal.nl/stoornissen/adhd/', beschrijving: 'Info voor ouders' }
    ],
    tipsSchool: [
      { titel: 'Vooraan in de klas', beschrijving: 'Laat de leerling vooraan zitten, weg van afleiding.', prioriteit: 'hoog' },
      { titel: 'Beweging toelaten', beschrijving: 'Sta fidgets toe of korte pauzes.', prioriteit: 'hoog' },
      { titel: 'Korte instructies', beschrijving: 'Geef instructies in kleine stappen.', prioriteit: 'hoog' },
      { titel: 'Visuele timer', beschrijving: 'Gebruik een Time Timer.', prioriteit: 'hoog' }
    ],
    tipsThuis: [
      { titel: 'Vaste structuur', beschrijving: 'Houd vaste tijden aan.', prioriteit: 'hoog' },
      { titel: 'Visueel dagschema', beschrijving: 'Hang een schema op.', prioriteit: 'hoog' },
      { titel: 'Taken opdelen', beschrijving: 'Deel grote taken op in kleine stappen.', prioriteit: 'hoog' }
    ]
  },

  ass: {
    id: 'ass',
    naam: 'ASS (Autisme)',
    icon: '🧩',
    kleur: '#81C784',
    categorie: 'sociaal',
    beschrijving: 'Autismespectrumstoornis - andere informatieverwerking.',
    uitgebreideInfo: `ASS is een neurobiologische ontwikkelingsstoornis met een andere manier van informatieverwerking.

**Prevalentie**: Ongeveer 1-2% van de bevolking.

**Belangrijk**: Autisme is geen ziekte maar een andere manier van waarnemen.`,
    kenmerken: [
      'Moeite met sociale interactie',
      'Letterlijk taalgebruik',
      'Moeite met veranderingen',
      'Behoefte aan voorspelbaarheid',
      'Prikkelgevoeligheid',
      'Intense interesses'
    ],
    sterpieken: [
      'Eerlijk en betrouwbaar',
      'Oog voor detail',
      'Diepgaande kennis',
      'Systematisch',
      'Loyaal'
    ],
    comorbiditeit: ['adhd', 'angst', 'dcd', 'hoogbegaafdheid'],
    hulpmiddelen: ['pictogrammen', 'dagschema', 'oorbeschermers', 'social_stories'],
    links: [
      { naam: 'Autisme Centraal', url: 'https://www.autismecentraal.com', beschrijving: 'Vlaams expertisecentrum' },
      { naam: 'NVA', url: 'https://www.autisme.nl', beschrijving: 'Nederlandse Vereniging voor Autisme' },
      { naam: 'Sclera', url: 'https://www.sclera.be', beschrijving: 'Gratis pictogrammen' }
    ],
    tipsSchool: [
      { titel: 'Voorspelbaarheid', beschrijving: 'Geef duidelijke structuur, kondig veranderingen aan.', prioriteit: 'hoog' },
      { titel: 'Concrete taal', beschrijving: 'Wees expliciet, vermijd sarcasme.', prioriteit: 'hoog' },
      { titel: 'Prikkelarm hoekje', beschrijving: 'Zorg voor een rustige terugtrekplek.', prioriteit: 'hoog' },
      { titel: 'Visuele ondersteuning', beschrijving: 'Gebruik pictogrammen en schema\'s.', prioriteit: 'hoog' }
    ],
    tipsThuis: [
      { titel: 'Vaste routines', beschrijving: 'Houd routines vast, bereid veranderingen voor.', prioriteit: 'hoog' },
      { titel: 'Visueel dagschema', beschrijving: 'Schema met pictogrammen geeft rust.', prioriteit: 'hoog' },
      { titel: 'Rustmomenten', beschrijving: 'Plan rusttijd na school.', prioriteit: 'hoog' }
    ]
  },

  hoogbegaafdheid: {
    id: 'hoogbegaafdheid',
    naam: 'Hoogbegaafdheid',
    icon: '🧠',
    kleur: '#BA68C8',
    categorie: 'cognitief',
    beschrijving: 'IQ van 130+ met intensieve denkwijze.',
    uitgebreideInfo: `Hoogbegaafdheid is meer dan slim zijn. Hoogbegaafden denken sneller, abstracter, en in grotere verbanden.

**Prevalentie**: Ongeveer 2-3% van de bevolking.`,
    kenmerken: [
      'Snel en diep denken',
      'Intense nieuwsgierigheid',
      'Perfectionisme',
      'Sterk rechtvaardigheidsgevoel',
      'Asynchone ontwikkeling'
    ],
    sterpieken: [
      'Snel leren',
      'Creatief',
      'Verbanden zien',
      'Gedreven'
    ],
    comorbiditeit: ['adhd', 'ass', 'angst'],
    hulpmiddelen: ['mindmaps', 'verrijkingsmateriaal'],
    links: [
      { naam: 'Bekina', url: 'https://www.bekina.org', beschrijving: 'Belgisch Kenniscentrum' },
      { naam: 'Pharos', url: 'https://www.pharosnl.nl', beschrijving: 'Expertise hoogbegaafdheid' }
    ],
    tipsSchool: [
      { titel: 'Compacten en verrijken', beschrijving: 'Laat stof overslaan, bied verdieping.', prioriteit: 'hoog' },
      { titel: 'Intellectuele uitdaging', beschrijving: 'Bied complexe opdrachten.', prioriteit: 'hoog' }
    ],
    tipsThuis: [
      { titel: 'Interesses volgen', beschrijving: 'Laat diep duiken in interesses.', prioriteit: 'hoog' },
      { titel: 'Praten over perfectionisme', beschrijving: 'Help begrijpen dat fouten bij leren hoort.', prioriteit: 'hoog' }
    ]
  },

  angst: {
    id: 'angst',
    naam: 'Angststoornis',
    icon: '😰',
    kleur: '#90A4AE',
    categorie: 'sociaal',
    beschrijving: 'Aanhoudende, overmatige angst die het functioneren belemmert.',
    uitgebreideInfo: `Angststoornissen bij kinderen uiten zich in overmatige angst die niet passend is bij de situatie.

**Prevalentie**: 5-10% van de kinderen.`,
    kenmerken: [
      'Overmatig piekeren',
      'Vermijdingsgedrag',
      'Lichamelijke klachten',
      'Slaapproblemen'
    ],
    sterpieken: [
      'Zorgzaam',
      'Gevoelig',
      'Nauwkeurig'
    ],
    comorbiditeit: ['adhd', 'ass', 'hoogbegaafdheid'],
    hulpmiddelen: ['stress_thermometer', 'ontspanningsoefeningen'],
    links: [
      { naam: 'Angst de Baas', url: 'https://www.angstdebaas.nl', beschrijving: 'Hulp voor jongeren' },
      { naam: 'Awel', url: 'https://www.awel.be', beschrijving: 'Hulplijn jongeren' }
    ],
    tipsSchool: [
      { titel: 'Veilige omgeving', beschrijving: 'Creëer voorspelbaarheid.', prioriteit: 'hoog' },
      { titel: 'Kleine stappen', beschrijving: 'Help met kleine stappen.', prioriteit: 'hoog' }
    ],
    tipsThuis: [
      { titel: 'Angst bespreken', beschrijving: 'Praat over angsten zonder te bagatelliseren.', prioriteit: 'hoog' },
      { titel: 'Ademhalingsoefeningen', beschrijving: 'Leer ademhalingsoefeningen.', prioriteit: 'hoog' }
    ]
  },

  dcd: {
    id: 'dcd',
    naam: 'DCD / Dyspraxie',
    icon: '✋',
    kleur: '#FFD54F',
    categorie: 'motorisch',
    beschrijving: 'Moeite met motorische coördinatie.',
    kenmerken: ['Onhandig', 'Moeite met schrijven', 'Traag aankleden'],
    sterpieken: ['Verbaal sterk', 'Creatief'],
    comorbiditeit: ['adhd', 'dyslexie', 'ass'],
    hulpmiddelen: ['laptop', 'pengreep'],
    links: [
      { naam: 'Balans - DCD', url: 'https://www.balansdigitaal.nl/stoornissen/dcd/', beschrijving: 'Info en tips' }
    ],
    tipsSchool: [
      { titel: 'Laptop voor schrijven', beschrijving: 'Typen is vaak makkelijker.', prioriteit: 'hoog' }
    ],
    tipsThuis: [
      { titel: 'Oefenen zonder druk', beschrijving: 'Oefen speels.', prioriteit: 'hoog' }
    ]
  }
};

export const CATEGORIEEN = {
  leren: { naam: 'Leerstoornissen', icon: '📚' },
  gedrag: { naam: 'Gedrag & Aandacht', icon: '⚡' },
  sociaal: { naam: 'Sociaal-emotioneel', icon: '💚' },
  motorisch: { naam: 'Motorisch', icon: '✋' },
  cognitief: { naam: 'Cognitief', icon: '🧠' }
};

export const getAlleZorgnoden = () => Object.values(ZORGNODEN);
export const getZorgnoodById = (id) => ZORGNODEN[id];
export default ZORGNODEN;
