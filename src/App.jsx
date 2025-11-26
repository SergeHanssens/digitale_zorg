import React, { useState, useEffect, useRef } from 'react';
import Dexie from 'dexie';
import { useLiveQuery } from 'dexie-react-hooks';
import ReactMarkdown from 'react-markdown';
import * as pdfjsLib from 'pdfjs-dist';
import { ZORGNODEN, CATEGORIEEN, getAlleZorgnoden } from './zorgnoden';

// PDF.js worker configuratie - gebruik een CDN met fallback
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

// ============================================
// DATABASE
// ============================================
const db = new Dexie('InclusieHelperDB');
db.version(5).stores({
  profielen: '++id, naam, aangemaakt, laatstGebruikt',
  gesprekken: '++id, profielId, titel, berichten, aangemaakt',
  outputs: '++id, profielId, type, inhoud, aangemaakt',
  sessies: '++id, profielId, context, startTijd, eindTijd, samenvatting, aantalBerichten',
  hulpmaterialen: '++id, profielId, sessieId, type, titel, inhoud, zorgnoden, aangemaakt'
});

// ============================================
// AI TOOLS DATABASE
// ============================================
const AI_TOOLS = [
  {
    id: 'kurzweil',
    naam: 'Kurzweil 3000',
    categorie: 'voorlezen',
    zorgnoden: ['dyslexie', 'adhd'],
    beschrijving: 'Professionele voorleessoftware met studietools.',
    url: 'https://www.sensotec.be/kurzweil',
    gratis: false,
    platforms: ['Windows', 'Mac', 'Web']
  },
  {
    id: 'sprint',
    naam: 'Sprint Plus',
    categorie: 'voorlezen',
    zorgnoden: ['dyslexie'],
    beschrijving: 'Nederlandstalige voorleessoftware.',
    url: 'https://www.lexima.nl/sprint',
    gratis: false,
    platforms: ['Windows']
  },
  {
    id: 'claroread',
    naam: 'ClaroRead',
    categorie: 'voorlezen',
    zorgnoden: ['dyslexie', 'adhd'],
    beschrijving: 'Voorleessoftware met tekstmarkering.',
    url: 'https://www.clarosoftware.com',
    gratis: false,
    platforms: ['Windows', 'Mac', 'iOS']
  },
  {
    id: 'snap_type',
    naam: 'SnapType',
    categorie: 'schrijven',
    zorgnoden: ['dcd', 'dyslexie'],
    beschrijving: 'Foto van werkblad maken en digitaal invullen.',
    url: 'https://www.snaptype.co',
    gratis: true,
    platforms: ['iOS', 'Android']
  },
  {
    id: 'mindmeister',
    naam: 'MindMeister',
    categorie: 'organiseren',
    zorgnoden: ['adhd', 'ass', 'hoogbegaafdheid'],
    beschrijving: 'Online mindmapping tool.',
    url: 'https://www.mindmeister.com',
    gratis: true,
    platforms: ['Web', 'iOS', 'Android']
  },
  {
    id: 'timetimer',
    naam: 'Time Timer',
    categorie: 'plannen',
    zorgnoden: ['adhd', 'ass'],
    beschrijving: 'Visuele timer die tijd zichtbaar maakt.',
    url: 'https://www.timetimer.com',
    gratis: false,
    platforms: ['iOS', 'Android', 'Fysiek']
  },
  {
    id: 'pictogenda',
    naam: 'Pictogenda',
    categorie: 'plannen',
    zorgnoden: ['ass', 'adhd'],
    beschrijving: 'Agenda met pictogrammen.',
    url: 'https://www.pictogenda.nl',
    gratis: false,
    platforms: ['iOS', 'Android', 'Papier']
  },
  {
    id: 'speechtexter',
    naam: 'SpeechTexter',
    categorie: 'spraak-naar-tekst',
    zorgnoden: ['dyslexie', 'dcd'],
    beschrijving: 'Gratis spraak-naar-tekst in browser.',
    url: 'https://www.speechtexter.com',
    gratis: true,
    platforms: ['Web']
  },
  {
    id: 'google_dictation',
    naam: 'Google Spraaktypen',
    categorie: 'spraak-naar-tekst',
    zorgnoden: ['dyslexie', 'dcd'],
    beschrijving: 'Ingebouwd in Google Docs.',
    url: 'https://docs.google.com',
    gratis: true,
    platforms: ['Web']
  },
  {
    id: 'luisterpunt',
    naam: 'Luisterpunt',
    categorie: 'luisterboeken',
    zorgnoden: ['dyslexie'],
    beschrijving: 'Gratis luisterboeken voor mensen met leesbeperking.',
    url: 'https://www.luisterpunt.nl',
    gratis: true,
    platforms: ['Web', 'App']
  },
  {
    id: 'dedicon',
    naam: 'Dedicon',
    categorie: 'aangepaste_boeken',
    zorgnoden: ['dyslexie'],
    beschrijving: 'Schoolboeken in aangepaste formats.',
    url: 'https://www.dedicon.nl',
    gratis: true,
    platforms: ['Web']
  },
  {
    id: 'sclera',
    naam: 'Sclera Pictogrammen',
    categorie: 'pictogrammen',
    zorgnoden: ['ass'],
    beschrijving: 'Gratis zwart-wit pictogrammen.',
    url: 'https://www.sclera.be',
    gratis: true,
    platforms: ['Web']
  },
  {
    id: 'arasaac',
    naam: 'ARASAAC',
    categorie: 'pictogrammen',
    zorgnoden: ['ass'],
    beschrijving: 'Grote bibliotheek gratis pictogrammen.',
    url: 'https://arasaac.org',
    gratis: true,
    platforms: ['Web']
  },
  {
    id: 'focus_keeper',
    naam: 'Focus Keeper',
    categorie: 'concentratie',
    zorgnoden: ['adhd'],
    beschrijving: 'Pomodoro timer app.',
    url: 'https://focuskeeper.co',
    gratis: true,
    platforms: ['iOS', 'Android']
  },
  {
    id: 'forest',
    naam: 'Forest',
    categorie: 'concentratie',
    zorgnoden: ['adhd'],
    beschrijving: 'Gamified focus app - plant bomen tijdens concentratie.',
    url: 'https://www.forestapp.cc',
    gratis: false,
    platforms: ['iOS', 'Android']
  }
];

// ============================================
// IOL KWALITEITSMODEL
// ============================================
const IOL_KWALITEITSMODEL = {
  didactischeKwaliteit: {
    naam: 'Didactische kwaliteit',
    criteria: [
      { id: 'leerdoelen', naam: 'Duidelijke leerdoelen', beschrijving: 'Zijn de leerdoelen expliciet vermeld?' },
      { id: 'voorkennis', naam: 'Aansluiting voorkennis', beschrijving: 'Sluit het aan bij wat leerlingen al weten?' },
      { id: 'opbouw', naam: 'Logische opbouw', beschrijving: 'Is de lesstof logisch opgebouwd?' },
      { id: 'oefeningen', naam: 'Oefenmogelijkheden', beschrijving: 'Zijn er voldoende oefeningen aanwezig?' },
      { id: 'feedback', naam: 'Feedback mogelijkheden', beschrijving: 'Krijgen leerlingen feedback?' }
    ]
  },
  vakinhoud: {
    naam: 'Vakinhoudelijke kwaliteit',
    criteria: [
      { id: 'correct', naam: 'Inhoudelijk correct', beschrijving: 'Klopt de vakinhoud?' },
      { id: 'actueel', naam: 'Actueel', beschrijving: 'Is de informatie up-to-date?' },
      { id: 'consistent', naam: 'Consistent', beschrijving: 'Is er consistentie in terminologie?' },
      { id: 'begrijpelijk', naam: 'Begrijpelijk niveau', beschrijving: 'Past het taalniveau bij de doelgroep?' }
    ]
  },
  toegankelijkheid: {
    naam: 'Toegankelijkheid',
    criteria: [
      { id: 'structuur', naam: 'Duidelijke structuur', beschrijving: 'Is er een heldere structuur?' },
      { id: 'leesbaarheid', naam: 'Leesbaarheid', beschrijving: 'Is de tekst goed leesbaar?' },
      { id: 'navigatie', naam: 'Navigatie', beschrijving: 'Is het materiaal makkelijk te navigeren?' },
      { id: 'multimedia', naam: 'Multimedia ondersteuning', beschrijving: 'Zijn er afbeeldingen/video\'s?' }
    ]
  }
};

// ============================================
// PROMPTS
// ============================================
const PROFESSIONAL_PROMPT = `Je bent InclusieHelper, een AI-assistent voor leerkrachten en zorgcoördinatoren.

PROFIEL LEERLING:
{profielInfo}

BESCHIKBARE ZORGNODEN KENNIS:
{zorgnoden}

IOL KWALITEITSMODEL voor lesmateriaal:
- Didactische kwaliteit: leerdoelen, voorkennis, opbouw, oefeningen, feedback
- Vakinhoudelijke kwaliteit: correct, actueel, consistent, begrijpelijk
- Toegankelijkheid: structuur, leesbaarheid, navigatie, multimedia

Je helpt met:
1. Concrete hulpmaterialen maken (hulpkaarten, stappenplannen, sociale verhalen)
2. Lesmateriaal beoordelen volgens IOL-model
3. Praktische tips voor differentiatie
4. Onderbouwde adviezen met bronnen

Gebruik professionele maar toegankelijke taal. Verwijs naar externe bronnen waar relevant.`;

const OUDER_PROMPT = `Je bent InclusieHelper, een vriendelijke helper voor ouders en verzorgers.

PROFIEL KIND:
{profielInfo}

Je helpt met:
1. Uitleg in eenvoudige taal over zorgnoden
2. Thuisactiviteiten en oefeningen
3. Tips voor huiswerk begeleiding
4. Emotionele ondersteuning en begrip

Gebruik warme, toegankelijke taal. Vermijd jargon. Geef praktische, direct toepasbare tips.`;

// ============================================
// HELPER FUNCTIONS - Document Parsing
// ============================================

// Dynamisch laden van mammoth voor DOCX bestanden
async function parseDOCX(arrayBuffer) {
  try {
    // Dynamisch importeren van mammoth
    const mammoth = await import('mammoth');
    // mammoth kan zowel default als named export hebben
    const extractRawText = mammoth.default?.extractRawText || mammoth.extractRawText;
    
    if (typeof extractRawText !== 'function') {
      throw new Error('mammoth.extractRawText is niet beschikbaar');
    }
    
    const result = await extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    console.error('DOCX parsing error:', error);
    throw new Error(`Kon DOCX bestand niet lezen: ${error.message}`);
  }
}

// PDF parsing met betere error handling
async function parsePDF(arrayBuffer) {
  try {
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      try {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(' ') + '\n';
      } catch (pageError) {
        console.warn(`Kon pagina ${i} niet lezen:`, pageError);
        text += `[Pagina ${i} kon niet worden gelezen]\n`;
      }
    }
    
    return text;
  } catch (error) {
    console.error('PDF parsing error:', error);
    throw new Error(`Kon PDF bestand niet lezen: ${error.message}`);
  }
}

// ============================================
// COMPONENTS
// ============================================

// Header Component
const Header = ({ huidigeView, setHuidigeView, huidigProfiel }) => (
  <header className="header">
    <div className="header-content">
      <div className="logo" onClick={() => setHuidigeView('start')}>
        <span className="logo-icon">🌟</span>
        <span className="logo-text">InclusieHelper</span>
        <span className="version">2.5</span>
      </div>
      <nav className="nav">
        <button 
          className={`nav-btn ${huidigeView === 'start' ? 'active' : ''}`}
          onClick={() => setHuidigeView('start')}
        >
          🏠 Start
        </button>
        <button 
          className={`nav-btn ${huidigeView === 'profielen' ? 'active' : ''}`}
          onClick={() => setHuidigeView('profielen')}
        >
          👤 Profielen
        </button>
        <button 
          className={`nav-btn ${huidigeView === 'kennisbank' ? 'active' : ''}`}
          onClick={() => setHuidigeView('kennisbank')}
        >
          📚 Kennisbank
        </button>
        <button 
          className={`nav-btn ${huidigeView === 'tools' ? 'active' : ''}`}
          onClick={() => setHuidigeView('tools')}
        >
          🛠️ AI Tools
        </button>
        {huidigProfiel && (
          <>
            <button 
              className={`nav-btn ${huidigeView === 'advies' ? 'active' : ''}`}
              onClick={() => setHuidigeView('advies')}
            >
              💬 Advies
            </button>
            <button 
              className={`nav-btn ${huidigeView === 'geschiedenis' ? 'active' : ''}`}
              onClick={() => setHuidigeView('geschiedenis')}
            >
              📋 Geschiedenis
            </button>
          </>
        )}
        <button 
          className={`nav-btn ${huidigeView === 'instellingen' ? 'active' : ''}`}
          onClick={() => setHuidigeView('instellingen')}
        >
          ⚙️
        </button>
      </nav>
    </div>
  </header>
);

// StartView Component
const StartView = ({ setHuidigeView, huidigProfiel, setHuidigProfiel, profielen }) => (
  <div className="start-view">
    <div className="hero">
      <h1>🌟 Welkom bij InclusieHelper</h1>
      <p className="hero-subtitle">
        Ondersteuning op maat voor leerlingen met specifieke zorgnoden
      </p>
      
      <div className="privacy-banner">
        <span className="privacy-icon">🔒</span>
        <div className="privacy-text">
          <strong>Privacy-first:</strong> Al je gegevens blijven lokaal op dit apparaat. 
          Er wordt niets naar externe servers gestuurd.
        </div>
      </div>
    </div>

    <div className="quick-actions">
      <div className="action-card" onClick={() => setHuidigeView('profielen')}>
        <span className="action-icon">👤</span>
        <h3>Leerling profiel</h3>
        <p>Maak of selecteer een profiel</p>
      </div>
      
      <div className="action-card" onClick={() => setHuidigeView('kennisbank')}>
        <span className="action-icon">📚</span>
        <h3>Kennisbank</h3>
        <p>Info over zorgnoden en aanpak</p>
      </div>
      
      <div className="action-card" onClick={() => setHuidigeView('tools')}>
        <span className="action-icon">🛠️</span>
        <h3>AI Tools</h3>
        <p>Hulpmiddelen en software</p>
      </div>
    </div>

    {profielen && profielen.length > 0 && (
      <div className="recent-profielen">
        <h2>📋 Recent gebruikte profielen</h2>
        <div className="profiel-chips">
          {profielen.slice(0, 5).map(p => (
            <button 
              key={p.id} 
              className={`profiel-chip ${huidigProfiel?.id === p.id ? 'active' : ''}`}
              onClick={() => {
                setHuidigProfiel(p);
                setHuidigeView('advies');
              }}
            >
              <span>{p.naam}</span>
              <span className="zorgnoden-mini">
                {p.zorgnoden?.map(z => ZORGNODEN[z]?.icon).join(' ')}
              </span>
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);

// ProfielenView Component
const ProfielenView = ({ 
  profielen, 
  huidigProfiel, 
  setHuidigProfiel, 
  setHuidigeView,
  bewerkProfiel,
  setBewerkProfiel,
  nieuwProfiel,
  setNieuwProfiel,
  opslaanProfiel,
  verwijderProfiel
}) => {
  const [toonNieuw, setToonNieuw] = useState(false);
  
  const handleNieuwProfiel = () => {
    setNieuwProfiel({
      naam: '',
      geboortejaar: '',
      klas: '',
      school: '',
      zorgnoden: [],
      notities: ''
    });
    setToonNieuw(true);
    setBewerkProfiel(null);
  };

  const handleOpslaan = async () => {
    await opslaanProfiel(nieuwProfiel);
    setToonNieuw(false);
    setNieuwProfiel(null);
    setBewerkProfiel(null);
  };

  const toggleZorgnood = (id) => {
    const huidige = nieuwProfiel?.zorgnoden || [];
    const nieuwe = huidige.includes(id) 
      ? huidige.filter(z => z !== id)
      : [...huidige, id];
    setNieuwProfiel({...nieuwProfiel, zorgnoden: nieuwe});
  };

  return (
    <div className="profielen-view">
      <div className="view-header">
        <h1>👤 Leerling Profielen</h1>
        <button className="btn-primary" onClick={handleNieuwProfiel}>
          ➕ Nieuw Profiel
        </button>
      </div>

      {(toonNieuw || bewerkProfiel) && (
        <div className="profiel-form">
          <h2>{bewerkProfiel ? '✏️ Profiel bewerken' : '➕ Nieuw profiel'}</h2>
          
          <div className="form-group">
            <label>Naam / Alias *</label>
            <input
              type="text"
              value={nieuwProfiel?.naam || ''}
              onChange={e => setNieuwProfiel({...nieuwProfiel, naam: e.target.value})}
              placeholder="Bijv. 'Emma' of 'Leerling A'"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Geboortejaar</label>
              <input
                type="number"
                value={nieuwProfiel?.geboortejaar || ''}
                onChange={e => setNieuwProfiel({...nieuwProfiel, geboortejaar: e.target.value})}
                placeholder="2015"
              />
            </div>
            <div className="form-group">
              <label>Klas</label>
              <input
                type="text"
                value={nieuwProfiel?.klas || ''}
                onChange={e => setNieuwProfiel({...nieuwProfiel, klas: e.target.value})}
                placeholder="3B"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Zorgnoden</label>
            <div className="zorgnoden-selector">
              {Object.entries(CATEGORIEEN).map(([catId, cat]) => (
                <div key={catId} className="zorgnood-categorie">
                  <h4>{cat.icon} {cat.naam}</h4>
                  <div className="zorgnood-opties">
                    {getAlleZorgnoden()
                      .filter(z => z.categorie === catId)
                      .map(z => (
                        <button
                          key={z.id}
                          className={`zorgnood-optie ${nieuwProfiel?.zorgnoden?.includes(z.id) ? 'selected' : ''}`}
                          onClick={() => toggleZorgnood(z.id)}
                          style={{'--zorgnood-kleur': z.kleur}}
                        >
                          {z.icon} {z.naam}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Notities</label>
            <textarea
              value={nieuwProfiel?.notities || ''}
              onChange={e => setNieuwProfiel({...nieuwProfiel, notities: e.target.value})}
              placeholder="Bijzonderheden, sterke punten, aandachtspunten..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button className="btn-secondary" onClick={() => {
              setToonNieuw(false);
              setBewerkProfiel(null);
            }}>
              Annuleren
            </button>
            <button 
              className="btn-primary" 
              onClick={handleOpslaan}
              disabled={!nieuwProfiel?.naam}
            >
              💾 Opslaan
            </button>
          </div>
        </div>
      )}

      <div className="profielen-lijst">
        {profielen?.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">👤</span>
            <p>Nog geen profielen. Maak een nieuw profiel aan om te beginnen.</p>
          </div>
        ) : (
          profielen?.map(p => (
            <div 
              key={p.id} 
              className={`profiel-card ${huidigProfiel?.id === p.id ? 'active' : ''}`}
            >
              <div className="profiel-header">
                <h3>{p.naam}</h3>
                {p.klas && <span className="klas-badge">{p.klas}</span>}
              </div>
              
              <div className="profiel-zorgnoden">
                {p.zorgnoden?.map(zId => {
                  const z = ZORGNODEN[zId];
                  return z ? (
                    <span key={zId} className="zorgnood-badge" style={{backgroundColor: z.kleur}}>
                      {z.icon} {z.naam}
                    </span>
                  ) : null;
                })}
              </div>
              
              {p.notities && <p className="profiel-notities">{p.notities}</p>}
              
              <div className="profiel-actions">
                <button 
                  className="btn-small btn-primary"
                  onClick={() => {
                    setHuidigProfiel(p);
                    setHuidigeView('advies');
                  }}
                >
                  💬 Advies
                </button>
                <button 
                  className="btn-small"
                  onClick={() => {
                    setNieuwProfiel(p);
                    setBewerkProfiel(p);
                    setToonNieuw(true);
                  }}
                >
                  ✏️
                </button>
                <button 
                  className="btn-small btn-danger"
                  onClick={() => verwijderProfiel(p.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// KennisbankView Component
const KennisbankView = ({ setHuidigeView }) => {
  const [geselecteerdeZorgnood, setGeselecteerdeZorgnood] = useState(null);
  const [filterCategorie, setFilterCategorie] = useState(null);

  const gefilterd = filterCategorie 
    ? getAlleZorgnoden().filter(z => z.categorie === filterCategorie)
    : getAlleZorgnoden();

  return (
    <div className="kennisbank-view">
      <div className="view-header">
        <h1>📚 Kennisbank</h1>
        <p>Uitgebreide informatie over zorgnoden en ondersteuning</p>
      </div>

      <div className="categorie-filter">
        <button 
          className={`filter-btn ${!filterCategorie ? 'active' : ''}`}
          onClick={() => setFilterCategorie(null)}
        >
          Alle
        </button>
        {Object.entries(CATEGORIEEN).map(([id, cat]) => (
          <button 
            key={id}
            className={`filter-btn ${filterCategorie === id ? 'active' : ''}`}
            onClick={() => setFilterCategorie(id)}
          >
            {cat.icon} {cat.naam}
          </button>
        ))}
      </div>

      {!geselecteerdeZorgnood ? (
        <div className="zorgnoden-grid">
          {gefilterd.map(z => (
            <div 
              key={z.id}
              className="zorgnood-card"
              style={{'--zorgnood-kleur': z.kleur}}
              onClick={() => setGeselecteerdeZorgnood(z)}
            >
              <span className="zorgnood-icon">{z.icon}</span>
              <h3>{z.naam}</h3>
              <p>{z.beschrijving}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="zorgnood-detail">
          <button className="btn-back" onClick={() => setGeselecteerdeZorgnood(null)}>
            ← Terug naar overzicht
          </button>
          
          <div className="detail-header" style={{backgroundColor: geselecteerdeZorgnood.kleur}}>
            <span className="detail-icon">{geselecteerdeZorgnood.icon}</span>
            <h1>{geselecteerdeZorgnood.naam}</h1>
          </div>

          {geselecteerdeZorgnood.uitgebreideInfo && (
            <section className="detail-section">
              <h2>📖 Wat is het?</h2>
              <div className="info-text">
                <ReactMarkdown>{geselecteerdeZorgnood.uitgebreideInfo}</ReactMarkdown>
              </div>
            </section>
          )}

          {geselecteerdeZorgnood.kenmerken && (
            <section className="detail-section">
              <h2>🔍 Kenmerken</h2>
              <ul className="kenmerken-lijst">
                {geselecteerdeZorgnood.kenmerken.map((k, i) => (
                  <li key={i}>{k}</li>
                ))}
              </ul>
            </section>
          )}

          {geselecteerdeZorgnood.sterpieken && (
            <section className="detail-section sterke-punten">
              <h2>⭐ Sterke punten</h2>
              <ul className="sterke-lijst">
                {geselecteerdeZorgnood.sterpieken.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </section>
          )}

          {geselecteerdeZorgnood.tipsSchool && (
            <section className="detail-section">
              <h2>🏫 Tips voor school</h2>
              <div className="tips-grid">
                {geselecteerdeZorgnood.tipsSchool.map((tip, i) => (
                  <div key={i} className={`tip-card prioriteit-${tip.prioriteit}`}>
                    <h4>{tip.titel}</h4>
                    <p>{tip.beschrijving}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {geselecteerdeZorgnood.tipsThuis && (
            <section className="detail-section">
              <h2>🏠 Tips voor thuis</h2>
              <div className="tips-grid">
                {geselecteerdeZorgnood.tipsThuis.map((tip, i) => (
                  <div key={i} className={`tip-card prioriteit-${tip.prioriteit}`}>
                    <h4>{tip.titel}</h4>
                    <p>{tip.beschrijving}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {geselecteerdeZorgnood.links && geselecteerdeZorgnood.links.length > 0 && (
            <section className="detail-section">
              <h2>🔗 Externe bronnen</h2>
              <div className="links-grid">
                {geselecteerdeZorgnood.links.map((link, i) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="extern-link"
                  >
                    <span className="link-naam">{link.naam}</span>
                    <span className="link-beschrijving">{link.beschrijving}</span>
                    <span className="link-arrow">→</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {geselecteerdeZorgnood.comorbiditeit && (
            <section className="detail-section">
              <h2>🔄 Vaak gecombineerd met</h2>
              <div className="comorbiditeit-chips">
                {geselecteerdeZorgnood.comorbiditeit.map(cId => {
                  const c = ZORGNODEN[cId];
                  return c ? (
                    <button 
                      key={cId}
                      className="comorbiditeit-chip"
                      onClick={() => setGeselecteerdeZorgnood(c)}
                      style={{backgroundColor: c.kleur}}
                    >
                      {c.icon} {c.naam}
                    </button>
                  ) : null;
                })}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

// ToolsView Component
const ToolsView = () => {
  const [filterZorgnood, setFilterZorgnood] = useState(null);
  const [filterCategorie, setFilterCategorie] = useState(null);
  const [toonAlleenGratis, setToonAlleenGratis] = useState(false);

  const categorieNamen = {
    voorlezen: '🔊 Voorlezen',
    schrijven: '✍️ Schrijven',
    organiseren: '📋 Organiseren',
    plannen: '📅 Plannen',
    'spraak-naar-tekst': '🎤 Spraak naar tekst',
    luisterboeken: '🎧 Luisterboeken',
    aangepaste_boeken: '📚 Aangepaste boeken',
    pictogrammen: '🖼️ Pictogrammen',
    concentratie: '🎯 Concentratie'
  };

  const gefilterd = AI_TOOLS.filter(tool => {
    if (filterZorgnood && !tool.zorgnoden.includes(filterZorgnood)) return false;
    if (filterCategorie && tool.categorie !== filterCategorie) return false;
    if (toonAlleenGratis && !tool.gratis) return false;
    return true;
  });

  return (
    <div className="tools-view">
      <div className="view-header">
        <h1>🛠️ AI Tools & Hulpmiddelen</h1>
        <p>Software en hulpmiddelen voor leerlingen met specifieke zorgnoden</p>
      </div>

      <div className="tools-filters">
        <div className="filter-group">
          <label>Zorgnood:</label>
          <select 
            value={filterZorgnood || ''} 
            onChange={e => setFilterZorgnood(e.target.value || null)}
          >
            <option value="">Alle zorgnoden</option>
            {getAlleZorgnoden().map(z => (
              <option key={z.id} value={z.id}>{z.icon} {z.naam}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Categorie:</label>
          <select 
            value={filterCategorie || ''} 
            onChange={e => setFilterCategorie(e.target.value || null)}
          >
            <option value="">Alle categorieën</option>
            {Object.entries(categorieNamen).map(([id, naam]) => (
              <option key={id} value={id}>{naam}</option>
            ))}
          </select>
        </div>

        <label className="checkbox-filter">
          <input 
            type="checkbox" 
            checked={toonAlleenGratis}
            onChange={e => setToonAlleenGratis(e.target.checked)}
          />
          Alleen gratis
        </label>
      </div>

      <div className="tools-grid">
        {gefilterd.map(tool => (
          <div key={tool.id} className="tool-card">
            <div className="tool-header">
              <h3>{tool.naam}</h3>
              {tool.gratis && <span className="gratis-badge">Gratis</span>}
            </div>
            <p className="tool-beschrijving">{tool.beschrijving}</p>
            <div className="tool-meta">
              <span className="tool-categorie">{categorieNamen[tool.categorie]}</span>
              <div className="tool-zorgnoden">
                {tool.zorgnoden.map(zId => {
                  const z = ZORGNODEN[zId];
                  return z ? <span key={zId} title={z.naam}>{z.icon}</span> : null;
                })}
              </div>
            </div>
            <div className="tool-platforms">
              {tool.platforms.map(p => (
                <span key={p} className="platform-badge">{p}</span>
              ))}
            </div>
            <a 
              href={tool.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="tool-link"
            >
              Bekijk tool →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

// AdviesView Component (Chat Interface)
const AdviesView = ({ 
  huidigProfiel, 
  apiKey,
  provider,
  model,
  setHuidigeView,
  geschiedenisData,
  setGeschiedenisData
}) => {
  const [context, setContext] = useState('school');
  const [berichten, setBerichten] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [opgeslagenMaterialen, setOpgeslagenMaterialen] = useState([]);
  const [laatstOpgeslagen, setLaatstOpgeslagen] = useState(null);
  const chatRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [berichten]);

  if (!huidigProfiel) {
    return (
      <div className="advies-view geen-profiel">
        <div className="empty-state">
          <span className="empty-icon">👤</span>
          <h2>Selecteer eerst een profiel</h2>
          <p>Om gepersonaliseerd advies te krijgen, selecteer of maak eerst een leerlingprofiel.</p>
          <button className="btn-primary" onClick={() => setHuidigeView('profielen')}>
            Naar profielen
          </button>
        </div>
      </div>
    );
  }

  const profielInfo = `
Naam: ${huidigProfiel.naam}
${huidigProfiel.klas ? `Klas: ${huidigProfiel.klas}` : ''}
Zorgnoden: ${huidigProfiel.zorgnoden?.map(z => ZORGNODEN[z]?.naam).join(', ') || 'Geen'}
${huidigProfiel.notities ? `Notities: ${huidigProfiel.notities}` : ''}
  `.trim();

  const zorgnoodInfo = huidigProfiel.zorgnoden?.map(zId => {
    const z = ZORGNODEN[zId];
    if (!z) return '';
    return `
## ${z.naam}
${z.uitgebreideInfo || z.beschrijving}
Tips school: ${z.tipsSchool?.map(t => t.titel).join(', ')}
Tips thuis: ${z.tipsThuis?.map(t => t.titel).join(', ')}
    `;
  }).join('\n') || '';

  const systemPrompt = (context === 'school' ? PROFESSIONAL_PROMPT : OUDER_PROMPT)
    .replace('{profielInfo}', profielInfo)
    .replace('{zorgnoden}', zorgnoodInfo);

  // GEFIXTE FILE UPLOAD HANDLER
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadError(null);
    
    try {
      let text = '';
      
      if (file.type === 'application/pdf') {
        // PDF parsing
        const arrayBuffer = await file.arrayBuffer();
        text = await parsePDF(arrayBuffer);
      } else if (file.name.endsWith('.docx') || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        // DOCX parsing met dynamische import
        const arrayBuffer = await file.arrayBuffer();
        text = await parseDOCX(arrayBuffer);
      } else if (file.type.startsWith('text/') || file.name.endsWith('.txt') || file.name.endsWith('.md')) {
        // Plain text bestanden
        text = await file.text();
      } else {
        throw new Error(`Bestandstype niet ondersteund: ${file.type || file.name.split('.').pop()}`);
      }
      
      if (!text || text.trim().length === 0) {
        throw new Error('Kon geen tekst uit het bestand halen. Het bestand is mogelijk leeg of bevat alleen afbeeldingen.');
      }
      
      setUploadedDoc({ name: file.name, content: text.slice(0, 5000) });
      
    } catch (error) {
      console.error('Fout bij uploaden:', error);
      setUploadError(error.message || 'Kon bestand niet lezen');
      setUploadedDoc(null);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const slaGesprekOp = () => {
    if (berichten.length === 0) return;

    const sessieId = Date.now().toString();
    const nieuweSessie = {
      id: sessieId,
      datum: new Date().toISOString(),
      context,
      berichten: [...berichten],
      samenvatting: genereerSamenvatting(berichten),
      hulpmaterialen: [...opgeslagenMaterialen]
    };

    setGeschiedenisData(prev => {
      const profielData = prev[huidigProfiel.id] || { sessies: [] };
      return {
        ...prev,
        [huidigProfiel.id]: {
          ...profielData,
          sessies: [...profielData.sessies, nieuweSessie]
        }
      };
    });

    setOpgeslagenMaterialen([]);
    setLaatstOpgeslagen(new Date());
    alert('✅ Gesprek en materialen opgeslagen in de geschiedenis!');
  };

  const genereerSamenvatting = (msgs) => {
    const onderwerpen = [];
    const tekst = msgs.map(m => m.tekst.toLowerCase()).join(' ');
    
    if (tekst.includes('hulpkaart')) onderwerpen.push('hulpkaarten');
    if (tekst.includes('stappenplan')) onderwerpen.push('stappenplan');
    if (tekst.includes('emotie') || tekst.includes('gevoel')) onderwerpen.push('emoties');
    if (tekst.includes('huiswerk')) onderwerpen.push('huiswerk');
    if (tekst.includes('lezen')) onderwerpen.push('lezen');
    if (tekst.includes('concentra')) onderwerpen.push('concentratie');
    
    return onderwerpen.length > 0 
      ? `Besproken: ${onderwerpen.join(', ')}`
      : `Gesprek met ${msgs.length} berichten`;
  };

  const verstuurBericht = async () => {
    if (!input.trim() && !uploadedDoc) return;
    if (!apiKey) {
      alert('Voer eerst een API key in bij Instellingen');
      return;
    }

    let berichtTekst = input;
    if (uploadedDoc) {
      berichtTekst = `[Document: ${uploadedDoc.name}]\n\n${uploadedDoc.content}\n\n${input || 'Analyseer dit document.'}`;
    }

    const nieuwBericht = { rol: 'user', tekst: berichtTekst };
    setBerichten(prev => [...prev, nieuwBericht]);
    setInput('');
    setUploadedDoc(null);
    setUploadError(null);
    setIsLoading(true);

    try {
      // Gebruik de nieuwe callAI functie die met alle providers werkt
      const antwoord = await callAI(
        provider,
        apiKey,
        model,
        systemPrompt,
        [...berichten, nieuwBericht]
      );
      
      setBerichten(prev => [...prev, { rol: 'assistant', tekst: antwoord }]);
      
      // Check of er materiaal is gegenereerd
      if (antwoord.includes('Hulpkaart') || antwoord.includes('Stappenplan') || 
          antwoord.includes('Sociaal verhaal') || antwoord.includes('Checklist')) {
        setOpgeslagenMaterialen(prev => [...prev, {
          type: 'materiaal',
          titel: 'Gegenereerd materiaal',
          inhoud: antwoord,
          datum: new Date().toISOString()
        }]);
      }
    } catch (error) {
      console.error('API Error:', error);
      setBerichten(prev => [...prev, { 
        rol: 'assistant', 
        tekst: `Er is een fout opgetreden: ${error.message}\n\nControleer je API key en internetverbinding in de Instellingen.`
      }]);
    }

    setIsLoading(false);
  };

  const snelVragen = context === 'school' ? [
    'Maak een hulpkaart voor lezen',
    'Geef tips voor toetsafname',
    'Stappenplan voor instructie',
    'Analyseer geüpload lesmateriaal'
  ] : [
    'Tips voor huiswerk maken',
    'Hoe leg ik dit uit?',
    'Spelletjes om te oefenen',
    'Omgaan met frustratie'
  ];

  const providerNaam = API_PROVIDERS[provider]?.naam || provider;

  return (
    <div className="advies-view">
      <div className="advies-header">
        <div className="profiel-info">
          <h2>{huidigProfiel.naam}</h2>
          <div className="zorgnoden-badges">
            {huidigProfiel.zorgnoden?.map(zId => {
              const z = ZORGNODEN[zId];
              return z ? (
                <span key={zId} className="badge" style={{backgroundColor: z.kleur}}>
                  {z.icon} {z.naam}
                </span>
              ) : null;
            })}
          </div>
        </div>
        
        <div className="context-switch">
          <button 
            className={`context-btn ${context === 'school' ? 'active' : ''}`}
            onClick={() => setContext('school')}
          >
            🏫 School
          </button>
          <button 
            className={`context-btn ${context === 'thuis' ? 'active' : ''}`}
            onClick={() => setContext('thuis')}
          >
            🏠 Thuis
          </button>
        </div>
      </div>

      <div className="privacy-mini">
        🔒 Gesprekken via {providerNaam} | 🤖 {model.split('/').pop()}
      </div>

      <div className="chat-container" ref={chatRef}>
        {berichten.length === 0 ? (
          <div className="chat-welkom">
            <h3>{context === 'school' ? '👋 Hallo collega!' : '👋 Hallo!'}</h3>
            <p>
              {context === 'school' 
                ? 'Ik help je met advies en materialen voor ' + huidigProfiel.naam
                : 'Ik help je met tips voor thuis voor ' + huidigProfiel.naam
              }
            </p>
            <div className="snel-vragen">
              {snelVragen.map((vraag, i) => (
                <button key={i} onClick={() => setInput(vraag)}>
                  {vraag}
                </button>
              ))}
            </div>
          </div>
        ) : (
          berichten.map((b, i) => (
            <div key={i} className={`bericht ${b.rol}`}>
              <div className="bericht-content">
                <ReactMarkdown>{b.tekst}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="bericht assistant loading">
            <div className="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-actions">
        {opgeslagenMaterialen.length > 0 && (
          <span className="materialen-badge">
            📎 {opgeslagenMaterialen.length} materiaal(en) nog op te slaan
          </span>
        )}
        <button 
          className="btn-opslaan" 
          onClick={slaGesprekOp}
          disabled={berichten.length === 0}
        >
          💾 Gesprek opslaan
        </button>
        {laatstOpgeslagen && (
          <span className="laatst-opgeslagen">
            ✓ Opgeslagen {laatstOpgeslagen.toLocaleTimeString()}
          </span>
        )}
      </div>

      <div className="chat-input-area">
        {uploadError && (
          <div className="upload-error">
            ⚠️ {uploadError}
            <button onClick={() => setUploadError(null)}>✕</button>
          </div>
        )}
        {uploadedDoc && (
          <div className="upload-preview">
            📄 {uploadedDoc.name}
            <button onClick={() => setUploadedDoc(null)}>✕</button>
          </div>
        )}
        <div className="input-row">
          <button 
            className="upload-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Document uploaden (PDF, DOCX, TXT)"
          >
            📎
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
            style={{display: 'none'}}
            onChange={handleFileUpload}
          />
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                verstuurBericht();
              }
            }}
            placeholder="Stel een vraag of upload een document..."
            rows={1}
          />
          <button 
            className="send-btn"
            onClick={verstuurBericht}
            disabled={isLoading || (!input.trim() && !uploadedDoc)}
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

// GeschiedenisView Component
const GeschiedenisView = ({ 
  huidigProfiel, 
  geschiedenisData, 
  setGeschiedenisData,
  setHuidigeView 
}) => {
  const [geselecteerdeSessie, setGeselecteerdeSessie] = useState(null);
  const [filterContext, setFilterContext] = useState('alle');

  if (!huidigProfiel) {
    return (
      <div className="geschiedenis-view geen-profiel">
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h2>Selecteer eerst een profiel</h2>
          <button className="btn-primary" onClick={() => setHuidigeView('profielen')}>
            Naar profielen
          </button>
        </div>
      </div>
    );
  }

  const profielGeschiedenis = geschiedenisData[huidigProfiel.id] || { sessies: [] };
  const sessies = profielGeschiedenis.sessies || [];
  
  const gefilterdeSessies = filterContext === 'alle' 
    ? sessies 
    : sessies.filter(s => s.context === filterContext);

  const totaalBerichten = sessies.reduce((sum, s) => sum + (s.berichten?.length || 0), 0);
  const totaalMaterialen = sessies.reduce((sum, s) => sum + (s.hulpmaterialen?.length || 0), 0);

  const verwijderSessie = (sessieId) => {
    if (!confirm('Weet je zeker dat je deze sessie wilt verwijderen?')) return;
    
    setGeschiedenisData(prev => ({
      ...prev,
      [huidigProfiel.id]: {
        ...prev[huidigProfiel.id],
        sessies: sessies.filter(s => s.id !== sessieId)
      }
    }));
    
    if (geselecteerdeSessie?.id === sessieId) {
      setGeselecteerdeSessie(null);
    }
  };

  const downloadGesprek = (sessie) => {
    let content = `InclusieHelper - Gesprek ${new Date(sessie.datum).toLocaleDateString('nl-NL')}\n`;
    content += `Context: ${sessie.context === 'school' ? 'School' : 'Thuis'}\n`;
    content += `Profiel: ${huidigProfiel.naam}\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    sessie.berichten?.forEach((b, i) => {
      content += `[${b.rol === 'user' ? 'Jij' : 'Assistent'}]\n${b.tekst}\n\n`;
    });
    
    if (sessie.hulpmaterialen?.length > 0) {
      content += `\n${'='.repeat(50)}\nGEGENEREERDE MATERIALEN\n${'='.repeat(50)}\n\n`;
      sessie.hulpmaterialen.forEach(m => {
        content += `--- ${m.titel} ---\n${m.inhoud}\n\n`;
      });
    }
    
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `inclusiehelper-gesprek-${new Date(sessie.datum).toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="geschiedenis-view">
      <div className="view-header">
        <h1>📋 Geschiedenis voor {huidigProfiel.naam}</h1>
        <div className="filter-bar">
          <button 
            className={`filter-btn ${filterContext === 'alle' ? 'active' : ''}`}
            onClick={() => setFilterContext('alle')}
          >
            Alle
          </button>
          <button 
            className={`filter-btn ${filterContext === 'school' ? 'active' : ''}`}
            onClick={() => setFilterContext('school')}
          >
            🏫 School
          </button>
          <button 
            className={`filter-btn ${filterContext === 'thuis' ? 'active' : ''}`}
            onClick={() => setFilterContext('thuis')}
          >
            🏠 Thuis
          </button>
        </div>
      </div>

      <div className="statistieken-cards">
        <div className="stat-card">
          <span className="stat-nummer">{sessies.length}</span>
          <span className="stat-label">Sessies</span>
        </div>
        <div className="stat-card">
          <span className="stat-nummer">{totaalBerichten}</span>
          <span className="stat-label">Berichten</span>
        </div>
        <div className="stat-card">
          <span className="stat-nummer">{totaalMaterialen}</span>
          <span className="stat-label">Materialen</span>
        </div>
      </div>

      {!geselecteerdeSessie ? (
        <div className="sessies-lijst">
          {gefilterdeSessies.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>Nog geen opgeslagen gesprekken voor dit profiel.</p>
            </div>
          ) : (
            gefilterdeSessies.map(sessie => (
              <div key={sessie.id} className="sessie-card">
                <div className="sessie-header">
                  <span className="sessie-context">
                    {sessie.context === 'school' ? '🏫' : '🏠'}
                  </span>
                  <span className="sessie-datum">
                    {new Date(sessie.datum).toLocaleDateString('nl-NL', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <p className="sessie-samenvatting">{sessie.samenvatting}</p>
                <div className="sessie-meta">
                  <span className="meta-badge">💬 {sessie.berichten?.length || 0} berichten</span>
                  {sessie.hulpmaterialen?.length > 0 && (
                    <span className="meta-badge">📎 {sessie.hulpmaterialen.length} materialen</span>
                  )}
                </div>
                <div className="sessie-actions">
                  <button onClick={() => setGeselecteerdeSessie(sessie)}>
                    👁️ Bekijken
                  </button>
                  <button onClick={() => downloadGesprek(sessie)}>
                    📥 Download
                  </button>
                  <button className="btn-danger" onClick={() => verwijderSessie(sessie.id)}>
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="sessie-detail">
          <button className="btn-back" onClick={() => setGeselecteerdeSessie(null)}>
            ← Terug naar overzicht
          </button>
          
          <div className="detail-header">
            <h2>
              {geselecteerdeSessie.context === 'school' ? '🏫' : '🏠'}{' '}
              {new Date(geselecteerdeSessie.datum).toLocaleDateString('nl-NL')}
            </h2>
            <button onClick={() => downloadGesprek(geselecteerdeSessie)}>
              📥 Download gesprek
            </button>
          </div>

          <div className="berichten-lijst">
            {geselecteerdeSessie.berichten?.map((b, i) => (
              <div key={i} className={`bericht-log ${b.rol}`}>
                <span className="bericht-rol">
                  {b.rol === 'user' ? '👤 Jij' : '🤖 Assistent'}
                </span>
                <div className="bericht-tekst">
                  <ReactMarkdown>{b.tekst}</ReactMarkdown>
                </div>
              </div>
            ))}
          </div>

          {geselecteerdeSessie.hulpmaterialen?.length > 0 && (
            <div className="hulpmaterialen-sectie">
              <h3>📎 Gegenereerde hulpmaterialen</h3>
              <div className="hulpmaterialen-log">
                {geselecteerdeSessie.hulpmaterialen.map((m, i) => (
                  <div key={i} className="materiaal-card">
                    <h4>{m.titel}</h4>
                    <p className="materiaal-preview">
                      {m.inhoud.substring(0, 200)}...
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// API PROVIDERS CONFIGURATIE
// ============================================
const API_PROVIDERS = {
  anthropic: {
    naam: 'Anthropic (Direct)',
    beschrijving: 'Directe verbinding met Claude API',
    url: 'https://api.anthropic.com/v1/messages',
    keyPlaceholder: 'sk-ant-...',
    keyLink: 'https://console.anthropic.com',
    keyLinkText: 'console.anthropic.com',
    modellen: [
      { id: 'claude-sonnet-4-20250514', naam: 'Claude Sonnet 4 (Nieuwste)' },
      { id: 'claude-3-5-sonnet-20241022', naam: 'Claude 3.5 Sonnet' },
      { id: 'claude-3-haiku-20240307', naam: 'Claude 3 Haiku (Snel)' }
    ],
    defaultModel: 'claude-sonnet-4-20250514'
  },
  openrouter: {
    naam: 'OpenRouter',
    beschrijving: 'Toegang tot meerdere AI modellen via één API',
    url: 'https://openrouter.ai/api/v1/chat/completions',
    keyPlaceholder: 'sk-or-...',
    keyLink: 'https://openrouter.ai/keys',
    keyLinkText: 'openrouter.ai/keys',
    modellen: [
      { id: 'anthropic/claude-sonnet-4', naam: 'Claude Sonnet 4' },
      { id: 'anthropic/claude-3.5-sonnet', naam: 'Claude 3.5 Sonnet' },
      { id: 'anthropic/claude-3-haiku', naam: 'Claude 3 Haiku (Snel)' },
      { id: 'openai/gpt-4o', naam: 'GPT-4o' },
      { id: 'openai/gpt-4o-mini', naam: 'GPT-4o Mini (Goedkoop)' },
      { id: 'google/gemini-pro-1.5', naam: 'Gemini Pro 1.5' },
      { id: 'meta-llama/llama-3.1-70b-instruct', naam: 'Llama 3.1 70B' }
    ],
    defaultModel: 'anthropic/claude-sonnet-4'
  },
  openai: {
    naam: 'OpenAI',
    beschrijving: 'Directe verbinding met OpenAI API',
    url: 'https://api.openai.com/v1/chat/completions',
    keyPlaceholder: 'sk-...',
    keyLink: 'https://platform.openai.com/api-keys',
    keyLinkText: 'platform.openai.com',
    modellen: [
      { id: 'gpt-4o', naam: 'GPT-4o (Nieuwste)' },
      { id: 'gpt-4o-mini', naam: 'GPT-4o Mini (Goedkoop)' },
      { id: 'gpt-4-turbo', naam: 'GPT-4 Turbo' }
    ],
    defaultModel: 'gpt-4o'
  },
  groq: {
    naam: 'Groq',
    beschrijving: 'Supersnelle inferentie, gratis tier beschikbaar',
    url: 'https://api.groq.com/openai/v1/chat/completions',
    keyPlaceholder: 'gsk_...',
    keyLink: 'https://console.groq.com/keys',
    keyLinkText: 'console.groq.com',
    modellen: [
      { id: 'llama-3.3-70b-versatile', naam: 'Llama 3.3 70B' },
      { id: 'llama-3.1-8b-instant', naam: 'Llama 3.1 8B (Supersnel)' },
      { id: 'mixtral-8x7b-32768', naam: 'Mixtral 8x7B' }
    ],
    defaultModel: 'llama-3.3-70b-versatile'
  }
};

// API Call functie die werkt met alle providers
async function callAI(provider, apiKey, model, systemPrompt, messages) {
  const providerConfig = API_PROVIDERS[provider];
  
  if (!providerConfig) {
    throw new Error(`Onbekende provider: ${provider}`);
  }

  // Anthropic heeft een ander API format
  if (provider === 'anthropic') {
    const response = await fetch(providerConfig.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 4096,
        system: systemPrompt,
        messages: messages.map(m => ({
          role: m.rol === 'user' ? 'user' : 'assistant',
          content: m.tekst
        }))
      })
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Anthropic API fout');
    }
    
    if (data.content && data.content[0]) {
      return data.content[0].text;
    }
    
    throw new Error('Onverwacht antwoord van Anthropic API');
  }
  
  // OpenAI-compatible APIs (OpenRouter, OpenAI, Groq)
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`
  };
  
  // OpenRouter heeft extra headers nodig
  if (provider === 'openrouter') {
    headers['HTTP-Referer'] = window.location.origin;
    headers['X-Title'] = 'InclusieHelper';
  }

  const response = await fetch(providerConfig.url, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      max_tokens: 4096,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({
          role: m.rol === 'user' ? 'user' : 'assistant',
          content: m.tekst
        }))
      ]
    })
  });

  const data = await response.json();
  
  if (data.error) {
    throw new Error(data.error.message || `${providerConfig.naam} API fout`);
  }
  
  if (data.choices && data.choices[0] && data.choices[0].message) {
    return data.choices[0].message.content;
  }
  
  throw new Error(`Onverwacht antwoord van ${providerConfig.naam} API`);
}

// InstellingenView Component
const InstellingenView = ({ apiKey, setApiKey, provider, setProvider, model, setModel }) => {
  const [toonKey, setToonKey] = useState(false);
  const providerConfig = API_PROVIDERS[provider];

  const handleProviderChange = (newProvider) => {
    setProvider(newProvider);
    // Reset model naar default voor nieuwe provider
    setModel(API_PROVIDERS[newProvider].defaultModel);
  };

  return (
    <div className="instellingen-view">
      <div className="view-header">
        <h1>⚙️ Instellingen</h1>
      </div>

      <section className="instelling-sectie">
        <h2>🔌 API Provider</h2>
        <p className="sectie-intro">Kies waar je AI-verzoeken naartoe worden gestuurd</p>
        
        <div className="provider-grid">
          {Object.entries(API_PROVIDERS).map(([id, prov]) => (
            <div 
              key={id}
              className={`provider-card ${provider === id ? 'active' : ''}`}
              onClick={() => handleProviderChange(id)}
            >
              <h4>{prov.naam}</h4>
              <p>{prov.beschrijving}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="instelling-sectie">
        <h2>🔑 API Key voor {providerConfig.naam}</h2>
        <div className="form-group">
          <label>API Key</label>
          <div className="api-input-row">
            <input
              type={toonKey ? 'text' : 'password'}
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder={providerConfig.keyPlaceholder}
            />
            <button onClick={() => setToonKey(!toonKey)}>
              {toonKey ? '🙈' : '👁️'}
            </button>
          </div>
          <p className="hint">
            Krijg een API key op{' '}
            <a href={providerConfig.keyLink} target="_blank" rel="noopener noreferrer">
              {providerConfig.keyLinkText}
            </a>
          </p>
        </div>
      </section>

      <section className="instelling-sectie">
        <h2>🤖 AI Model</h2>
        <div className="form-group">
          <label>Selecteer model</label>
          <select 
            value={model} 
            onChange={e => setModel(e.target.value)}
            className="model-select"
          >
            {providerConfig.modellen.map(m => (
              <option key={m.id} value={m.id}>{m.naam}</option>
            ))}
          </select>
          <p className="hint">
            Verschillende modellen hebben verschillende snelheden en kosten.
          </p>
        </div>
      </section>

      <section className="instelling-sectie privacy-sectie">
        <h2>🔒 Privacy</h2>
        <div className="privacy-info">
          <h3>Hoe we met je gegevens omgaan:</h3>
          <ul>
            <li>✅ Alle profielen worden <strong>lokaal</strong> opgeslagen in je browser</li>
            <li>✅ Je API key wordt <strong>lokaal</strong> opgeslagen</li>
            <li>✅ Gesprekken gaan <strong>direct</strong> naar {providerConfig.naam}</li>
            <li>✅ We verzamelen <strong>geen</strong> analytics of tracking data</li>
            <li>⚠️ Gebruik aliassen in plaats van echte namen voor extra privacy</li>
          </ul>
        </div>
        <button 
          className="btn-danger"
          onClick={() => {
            if (confirm('Weet je zeker dat je alle lokale gegevens wilt wissen?')) {
              localStorage.clear();
              indexedDB.deleteDatabase('InclusieHelperDB');
              window.location.reload();
            }
          }}
        >
          🗑️ Wis alle lokale gegevens
        </button>
      </section>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [huidigeView, setHuidigeView] = useState('start');
  const [huidigProfiel, setHuidigProfiel] = useState(null);
  const [bewerkProfiel, setBewerkProfiel] = useState(null);
  const [nieuwProfiel, setNieuwProfiel] = useState(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('inclusiehelper-apikey') || '');
  const [provider, setProvider] = useState(() => localStorage.getItem('inclusiehelper-provider') || 'openrouter');
  const [model, setModel] = useState(() => localStorage.getItem('inclusiehelper-model') || API_PROVIDERS['openrouter'].defaultModel);
  const [geschiedenisData, setGeschiedenisData] = useState(() => {
    const saved = localStorage.getItem('inclusiehelper-geschiedenis');
    return saved ? JSON.parse(saved) : {};
  });

  // Bewaar API key
  useEffect(() => {
    localStorage.setItem('inclusiehelper-apikey', apiKey);
  }, [apiKey]);

  // Bewaar provider
  useEffect(() => {
    localStorage.setItem('inclusiehelper-provider', provider);
  }, [provider]);

  // Bewaar model
  useEffect(() => {
    localStorage.setItem('inclusiehelper-model', model);
  }, [model]);

  // Bewaar geschiedenis
  useEffect(() => {
    localStorage.setItem('inclusiehelper-geschiedenis', JSON.stringify(geschiedenisData));
  }, [geschiedenisData]);

  // Live query voor profielen
  const profielen = useLiveQuery(
    () => db.profielen.orderBy('laatstGebruikt').reverse().toArray(),
    []
  );

  const opslaanProfiel = async (profiel) => {
    const data = {
      ...profiel,
      laatstGebruikt: new Date().toISOString()
    };
    
    if (profiel.id) {
      await db.profielen.update(profiel.id, data);
    } else {
      data.aangemaakt = new Date().toISOString();
      const id = await db.profielen.add(data);
      data.id = id;
    }
    
    setHuidigProfiel(data);
  };

  const verwijderProfiel = async (id) => {
    if (!confirm('Weet je zeker dat je dit profiel wilt verwijderen?')) return;
    await db.profielen.delete(id);
    if (huidigProfiel?.id === id) {
      setHuidigProfiel(null);
    }
  };

  return (
    <div className="app">
      <Header 
        huidigeView={huidigeView} 
        setHuidigeView={setHuidigeView} 
        huidigProfiel={huidigProfiel}
      />
      
      <main className="main-content">
        {huidigeView === 'start' && (
          <StartView 
            setHuidigeView={setHuidigeView}
            huidigProfiel={huidigProfiel}
            setHuidigProfiel={setHuidigProfiel}
            profielen={profielen}
          />
        )}
        
        {huidigeView === 'profielen' && (
          <ProfielenView 
            profielen={profielen}
            huidigProfiel={huidigProfiel}
            setHuidigProfiel={setHuidigProfiel}
            setHuidigeView={setHuidigeView}
            bewerkProfiel={bewerkProfiel}
            setBewerkProfiel={setBewerkProfiel}
            nieuwProfiel={nieuwProfiel}
            setNieuwProfiel={setNieuwProfiel}
            opslaanProfiel={opslaanProfiel}
            verwijderProfiel={verwijderProfiel}
          />
        )}
        
        {huidigeView === 'kennisbank' && (
          <KennisbankView setHuidigeView={setHuidigeView} />
        )}
        
        {huidigeView === 'tools' && (
          <ToolsView />
        )}
        
        {huidigeView === 'advies' && (
          <AdviesView 
            huidigProfiel={huidigProfiel}
            apiKey={apiKey}
            provider={provider}
            model={model}
            setHuidigeView={setHuidigeView}
            geschiedenisData={geschiedenisData}
            setGeschiedenisData={setGeschiedenisData}
          />
        )}
        
        {huidigeView === 'geschiedenis' && (
          <GeschiedenisView 
            huidigProfiel={huidigProfiel}
            geschiedenisData={geschiedenisData}
            setGeschiedenisData={setGeschiedenisData}
            setHuidigeView={setHuidigeView}
          />
        )}
        
        {huidigeView === 'instellingen' && (
          <InstellingenView 
            apiKey={apiKey} 
            setApiKey={setApiKey}
            provider={provider}
            setProvider={setProvider}
            model={model}
            setModel={setModel}
          />
        )}
      </main>

      <footer className="footer">
        <p>InclusieHelper 2.5 © 2024 | 🔒 Privacy-first | 📋 IOL Kwaliteitsmodel | 📚 Geschiedenis</p>
      </footer>
    </div>
  );
}
