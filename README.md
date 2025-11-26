# 🌟 InclusieHelper

**AI-gestuurde ondersteuning voor inclusief onderwijs**

InclusieHelper is een privacy-first webapplicatie die leerkrachten, zorgcoördinatoren en ouders helpt bij het ondersteunen van leerlingen met specifieke zorgnoden zoals dyslexie, ADHD, ASS en meer.

![Version](https://img.shields.io/badge/version-2.6-blue)
![License](https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-lightgrey)
![React](https://img.shields.io/badge/React-18.2-61dafb)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff)

---

## ✨ Features

### 🤖 AI Chat met Meerdere Providers
- **OpenRouter** - Toegang tot Claude, GPT-4, Gemini, Llama via één API
- **Anthropic** - Direct verbinding met Claude
- **OpenAI** - GPT-4o en andere modellen
- **Groq** - Supersnelle inferentie met gratis tier

### 👤 Leerlingprofielen
- Maak profielen aan voor individuele leerlingen
- Selecteer relevante zorgnoden per leerling
- Voeg notities en bijzonderheden toe
- Profielen worden lokaal opgeslagen (privacy!)

### 📚 Uitgebreide Kennisbank
- Informatie over 7+ zorgnoden (dyslexie, dyscalculie, ADHD, ASS, hoogbegaafdheid, angst, DCD)
- Kenmerken en sterke punten per zorgnood
- Praktische tips voor school én thuis
- Links naar externe bronnen en organisaties

### 🛠️ AI Tools Database
- 15+ hulpmiddelen en software tools
- Filterbaar op zorgnood, categorie en prijs
- Directe links naar tools

### 💬 Contextuele Advieschat
- **School-modus**: Professioneel advies voor leerkrachten
- **Thuis-modus**: Toegankelijke tips voor ouders
- Document upload (PDF, DOCX, TXT) voor analyse
- Automatische detectie van gegenereerde hulpmaterialen

### 📋 Gespreksgeschiedenis
- Sla gesprekken op per leerlingprofiel
- Bekijk en download eerdere sessies
- Statistieken over gebruik

### 🔒 Privacy-First
- Alle data blijft lokaal in je browser (IndexedDB + LocalStorage)
- Geen tracking of analytics
- Directe API-verbinding (geen tussenliggende server)

---

## 🚀 Installatie

### Vereisten
- [Node.js](https://nodejs.org/) versie 18 of hoger
- npm (wordt meegeleverd met Node.js)
- Een API key van één van de ondersteunde providers

### Stap 1: Clone de repository

```bash
git clone https://github.com/JOUW-USERNAME/inclusiehelper.git
cd inclusiehelper
```

### Stap 2: Installeer dependencies

```bash
npm install
```

### Stap 3: Start de development server

```bash
npm run dev
```

De applicatie is nu beschikbaar op `http://localhost:5173`

### Optioneel: Build voor productie

```bash
npm run build
npm run preview
```

---

## ⚙️ Configuratie

### API Key verkrijgen

Kies één van de volgende providers:

| Provider | Gratis tier | Link |
|----------|-------------|------|
| **OpenRouter** | Ja (beperkt) | [openrouter.ai/keys](https://openrouter.ai/keys) |
| **Groq** | Ja (genereus) | [console.groq.com/keys](https://console.groq.com/keys) |
| **Anthropic** | Nee | [console.anthropic.com](https://console.anthropic.com) |
| **OpenAI** | Nee | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |

> 💡 **Tip**: OpenRouter en Groq bieden gratis tiers aan, ideaal om te starten!

### API Key instellen

1. Open de applicatie
2. Ga naar **⚙️ Instellingen**
3. Selecteer je provider
4. Vul je API key in
5. Kies eventueel een ander model

---

## 📖 Gebruik

### 1. Profiel aanmaken

1. Klik op **👤 Profielen** in de navigatie
2. Klik op **➕ Nieuw Profiel**
3. Vul de naam in (gebruik een alias voor privacy)
4. Selecteer de relevante zorgnoden
5. Voeg optioneel notities toe
6. Klik op **💾 Opslaan**

### 2. Advies vragen

1. Selecteer een profiel (via Profielen of Startpagina)
2. Klik op **💬 Advies**
3. Kies context: **🏫 School** of **🏠 Thuis**
4. Stel je vraag of gebruik een snelle vraag
5. Upload optioneel een document voor analyse

### 3. Document analyseren

1. Klik op **📎** in de chat
2. Selecteer een PDF, DOCX of TXT bestand
3. Voeg optioneel een vraag toe
4. De AI analyseert het document volgens het IOL-kwaliteitsmodel

### 4. Gesprek opslaan

1. Klik op **💾 Gesprek opslaan** onderaan de chat
2. Bekijk opgeslagen gesprekken via **📋 Geschiedenis**

---

## 🏗️ Technische Details

### Tech Stack

- **Frontend**: React 18 met hooks
- **Build tool**: Vite 7
- **Database**: Dexie.js (IndexedDB wrapper)
- **Styling**: Vanilla CSS met CSS variabelen
- **PDF parsing**: pdf.js
- **DOCX parsing**: mammoth.js
- **Markdown**: react-markdown

### Project Structuur

```
inclusiehelper/
├── src/
│   ├── App.jsx        # Hoofdcomponent met alle views
│   ├── App.css        # Styling
│   ├── main.jsx       # Entry point
│   └── zorgnoden.js   # Kennisbank data
├── index.html
├── package.json
└── vite.config.js
```

### Data Opslag

| Data | Opslag | Persistentie |
|------|--------|--------------|
| Profielen | IndexedDB | Permanent |
| Gesprekgeschiedenis | LocalStorage | Permanent |
| API Key | LocalStorage | Permanent |
| Provider/Model | LocalStorage | Permanent |

---

## 🔧 Beschikbare Scripts

```bash
# Development server starten
npm run dev

# Productie build maken
npm run build

# Productie build previewen
npm run preview
```

---

## 🤝 Bijdragen

Bijdragen zijn welkom! 

1. Fork de repository
2. Maak een feature branch (`git checkout -b feature/nieuwe-feature`)
3. Commit je wijzigingen (`git commit -m 'Voeg nieuwe feature toe'`)
4. Push naar de branch (`git push origin feature/nieuwe-feature`)
5. Open een Pull Request

### Ideeën voor bijdragen

- [ ] Meer zorgnoden toevoegen
- [ ] Meer AI tools in de database
- [ ] Exporteren naar Word/PDF
- [ ] Donkere modus
- [ ] Meertalige ondersteuning
- [ ] PWA ondersteuning (offline gebruik)

---

## 📝 Licentie

Dit project is gelicenseerd onder de **Creative Commons Naamsvermelding-NietCommercieel-GelijkDelen 4.0 Internationaal** licentie (CC BY-NC-SA 4.0).

[![CC BY-NC-SA 4.0](https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.nl)

**Dit betekent:**
- ✅ Je mag het materiaal kopiëren en verspreiden
- ✅ Je mag het materiaal bewerken en aanpassen
- ✅ Gratis gebruik in het onderwijs
- ⚠️ Naamsvermelding verplicht
- ⚠️ Niet voor commerciële doeleinden
- ⚠️ Aanpassingen delen onder dezelfde licentie

Zie het [LICENSE](LICENSE) bestand voor details.

---

## 🙏 Credits

- Kennisbank gebaseerd op informatie van [Balans Digitaal](https://www.balansdigitaal.nl), [Autisme Centraal](https://www.autismecentraal.com), en andere bronorganisaties
- IOL Kwaliteitsmodel voor lesmateriaal beoordeling
- Pictogrammen via emoji

---

## 📞 Support

Heb je vragen of problemen?

- Open een [GitHub Issue](https://github.com/JOUW-USERNAME/inclusiehelper/issues)
- Bekijk bestaande issues voor oplossingen

---

<p align="center">
  <strong>Gemaakt met ❤️ voor inclusief onderwijs</strong>
</p>
