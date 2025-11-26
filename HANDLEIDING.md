# 📖 Handleiding InclusieHelper

Deze handleiding helpt je stap voor stap om InclusieHelper te installeren en te gebruiken.

---

## 📋 Inhoudsopgave

1. [Wat is InclusieHelper?](#wat-is-inclusiehelper)
2. [Installatie](#installatie)
3. [API Key instellen](#api-key-instellen)
4. [Profielen beheren](#profielen-beheren)
5. [De Kennisbank gebruiken](#de-kennisbank-gebruiken)
6. [AI Tools verkennen](#ai-tools-verkennen)
7. [Advies vragen](#advies-vragen)
8. [Documenten analyseren](#documenten-analyseren)
9. [Geschiedenis bekijken](#geschiedenis-bekijken)
10. [Veelgestelde vragen](#veelgestelde-vragen)

---

## Wat is InclusieHelper?

InclusieHelper is een hulpmiddel voor:

- **Leerkrachten** die leerlingen met zorgnoden willen ondersteunen
- **Zorgcoördinatoren** die advies willen over aanpassingen
- **Ouders** die hun kind thuis willen helpen

De app gebruikt AI om gepersonaliseerd advies te geven op basis van het profiel van de leerling.

### Privacy

🔒 **Belangrijk**: Al je gegevens blijven op jouw computer. Er wordt niets opgeslagen op externe servers. Alleen wanneer je een vraag stelt, wordt deze naar de AI-provider gestuurd.

---

## Installatie

### Wat heb je nodig?

1. Een computer met Windows, Mac of Linux
2. [Node.js](https://nodejs.org/) (versie 18 of nieuwer)
3. Internettoegang
4. Een API key (zie volgende sectie)

### Stappen

#### 1. Download Node.js

Ga naar [nodejs.org](https://nodejs.org/) en download de **LTS versie**. Installeer deze.

#### 2. Download InclusieHelper

**Optie A: Via Git**
```bash
git clone https://github.com/SergeHanssens/digitale_zorg.git
```

**Optie B: Als ZIP**
Download de ZIP van GitHub en pak deze uit.

#### 3. Open een terminal/opdrachtprompt

- **Windows**: Zoek naar "Opdrachtprompt" of "PowerShell"
- **Mac**: Open "Terminal" (in Programma's > Hulpprogramma's)
- **Linux**: Open je terminal

#### 4. Ga naar de map

```bash
cd pad/naar/inclusiehelper
```

Bijvoorbeeld:
```bash
cd Downloads/inclusiehelper
```

#### 5. Installeer de vereiste onderdelen

```bash
npm install
```

Dit kan een paar minuten duren.

#### 6. Start de applicatie

```bash
npm run dev
```

#### 7. Open je browser

Ga naar: **http://localhost:5173**

🎉 **De applicatie draait nu!**

---

## API Key instellen

Om de AI-chat te gebruiken heb je een API key nodig.

### Welke provider kiezen?

| Provider | Voordelen | Nadelen |
|----------|-----------|---------|
| **OpenRouter** | Veel modellen, deels gratis | Account nodig |
| **Groq** | Gratis, supersnel | Beperkte modellen |
| **Anthropic** | Beste Claude modellen | Betaald |
| **OpenAI** | GPT-4 modellen | Betaald |

### Aanbeveling voor beginners

Start met **Groq** - deze is gratis en snel:

1. Ga naar [console.groq.com](https://console.groq.com)
2. Maak een account aan
3. Ga naar "API Keys"
4. Klik op "Create API Key"
5. Kopieer de key (begint met `gsk_`)

### API Key invoeren

1. Open InclusieHelper
2. Klik op **⚙️** (Instellingen) rechtsboven
3. Klik op de gewenste provider (bijv. "Groq")
4. Plak je API key in het veld
5. Kies eventueel een model

✅ Je bent nu klaar om de chat te gebruiken!

---

## Profielen beheren

### Een profiel aanmaken

1. Klik op **👤 Profielen** in de navigatie
2. Klik op **➕ Nieuw Profiel**
3. Vul in:
   - **Naam/Alias**: Gebruik een alias voor privacy (bijv. "Leerling A")
   - **Geboortejaar**: Optioneel
   - **Klas**: Optioneel
   - **Zorgnoden**: Selecteer alle relevante zorgnoden
   - **Notities**: Belangrijke informatie over de leerling
4. Klik op **💾 Opslaan**

### Zorgnoden selecteren

Klik op de zorgnoden die van toepassing zijn. Je kunt er meerdere selecteren:

- 📖 **Dyslexie** - Lees- en spellingsproblemen
- 🔢 **Dyscalculie** - Rekenproblemen
- ⚡ **ADHD** - Aandacht en concentratie
- 🧩 **ASS** - Autisme spectrum
- 🧠 **Hoogbegaafdheid** - IQ 130+
- 😰 **Angst** - Angststoornis
- ✋ **DCD/Dyspraxie** - Motorische problemen

### Profiel bewerken of verwijderen

- Klik op **✏️** om te bewerken
- Klik op **🗑️** om te verwijderen

---

## De Kennisbank gebruiken

De kennisbank bevat informatie over alle zorgnoden.

### Navigeren

1. Klik op **📚 Kennisbank**
2. Filter optioneel op categorie (Leerstoornissen, Gedrag, etc.)
3. Klik op een zorgnood voor details

### Wat vind je per zorgnood?

- **Wat is het?** - Uitleg over de zorgnood
- **Kenmerken** - Hoe herken je het?
- **Sterke punten** - Wat kunnen deze leerlingen goed?
- **Tips voor school** - Praktische aanpassingen
- **Tips voor thuis** - Ondersteuning thuis
- **Externe bronnen** - Links naar meer informatie
- **Vaak gecombineerd met** - Comorbiditeit

---

## AI Tools verkennen

Een overzicht van handige software en hulpmiddelen.

### Tools bekijken

1. Klik op **🛠️ AI Tools**
2. Filter op:
   - **Zorgnood** - Bijv. alleen dyslexie-tools
   - **Categorie** - Bijv. voorleessoftware
   - **Alleen gratis** - Vink aan voor gratis tools

### Categorieën

- 🔊 Voorleessoftware
- ✍️ Schrijfhulp
- 📋 Organiseren
- 📅 Plannen
- 🎤 Spraak naar tekst
- 🎧 Luisterboeken
- 🖼️ Pictogrammen
- 🎯 Concentratie

---

## Advies vragen

Hier gebeurt de magie! Vraag gepersonaliseerd advies voor een leerling.

### Starten

1. Selecteer eerst een profiel (via Profielen of Startpagina)
2. Klik op **💬 Advies**

### Context kiezen

- **🏫 School**: Professionele taal, focus op onderwijsaanpassingen
- **🏠 Thuis**: Eenvoudige taal, focus op thuisondersteuning

### Vragen stellen

Type je vraag of gebruik een snelle vraag:

**School-modus:**
- "Maak een hulpkaart voor lezen"
- "Geef tips voor toetsafname"
- "Stappenplan voor instructie"

**Thuis-modus:**
- "Tips voor huiswerk maken"
- "Hoe leg ik dit uit?"
- "Spelletjes om te oefenen"

### Tips voor goede vragen

✅ **Goed:**
- "Maak een visueel stappenplan voor het maken van een werkstuk"
- "Welke aanpassingen kan ik doen bij een dictee?"
- "Hoe kan ik thuis oefenen met tafelsom 7?"

❌ **Minder goed:**
- "Help" (te vaag)
- "Wat moet ik doen?" (te algemeen)

---

## Documenten analyseren

Upload lesmateriaal voor analyse en advies.

### Ondersteunde bestanden

- 📄 **PDF** - Lesboeken, werkbladen
- 📝 **DOCX** - Word documenten
- 📃 **TXT** - Tekstbestanden

### Hoe uploaden?

1. Klik op **📎** links van het tekstveld
2. Selecteer een bestand
3. Het bestand verschijnt in een blauw vak
4. Voeg optioneel een vraag toe, bijv.:
   - "Is dit geschikt voor een leerling met dyslexie?"
   - "Hoe kan ik dit toegankelijker maken?"
5. Klik op **➤** om te versturen

### IOL Kwaliteitsmodel

De AI beoordeelt materiaal op:

1. **Didactische kwaliteit**
   - Duidelijke leerdoelen?
   - Aansluiting bij voorkennis?
   - Voldoende oefeningen?

2. **Vakinhoudelijke kwaliteit**
   - Inhoudelijk correct?
   - Actueel?
   - Begrijpelijk niveau?

3. **Toegankelijkheid**
   - Duidelijke structuur?
   - Goede leesbaarheid?
   - Multimedia ondersteuning?

---

## Geschiedenis bekijken

Bekijk en beheer opgeslagen gesprekken.

### Gesprek opslaan

1. Na een gesprek, klik op **💾 Gesprek opslaan**
2. Het gesprek wordt gekoppeld aan het huidige profiel

### Geschiedenis bekijken

1. Selecteer een profiel
2. Klik op **📋 Geschiedenis**
3. Je ziet:
   - Statistieken (aantal sessies, berichten, materialen)
   - Lijst van opgeslagen gesprekken
4. Filter op School/Thuis indien gewenst

### Acties

- **👁️ Bekijken** - Lees het volledige gesprek
- **📥 Download** - Download als tekstbestand
- **🗑️ Verwijderen** - Verwijder de sessie

---

## Veelgestelde vragen

### De app start niet

**Probleem**: `npm run dev` geeft een fout

**Oplossing**:
1. Controleer of Node.js is geïnstalleerd: `node --version`
2. Verwijder `node_modules` en probeer opnieuw:
   ```bash
   rm -rf node_modules
   npm install
   npm run dev
   ```

### De chat werkt niet

**Probleem**: Foutmelding bij versturen

**Oplossing**:
1. Controleer of je API key correct is ingevuld
2. Controleer of je de juiste provider hebt geselecteerd
3. Controleer je internetverbinding
4. Probeer een ander model

### Document uploaden mislukt

**Probleem**: Fout bij PDF/DOCX upload

**Oplossing**:
1. Controleer of het bestand niet beveiligd is
2. Probeer een kleiner bestand
3. Zet het om naar TXT en probeer opnieuw

### Mijn data is weg

**Probleem**: Profielen of geschiedenis verdwenen

**Mogelijke oorzaak**:
- Browser data gewist
- Andere browser gebruikt
- Incognito modus gebruikt

**Oplossing**: Data wordt lokaal opgeslagen. Gebruik dezelfde browser en wis geen site-data.

### Hoe wis ik alle data?

1. Ga naar **⚙️ Instellingen**
2. Scroll naar **🔒 Privacy**
3. Klik op **🗑️ Wis alle lokale gegevens**

---

## 💡 Tips

1. **Gebruik aliassen** - Noem leerlingen "Leerling A" of "Emma" in plaats van echte namen
2. **Wees specifiek** - Hoe specifieker je vraag, hoe beter het advies
3. **Sla gesprekken op** - Zo kun je later terugkijken
4. **Probeer verschillende modellen** - Sommige zijn sneller, andere slimmer
5. **Gebruik de kennisbank** - Veel antwoorden staan daar al!

---

## 🆘 Hulp nodig?

- Open een [GitHub Issue](https://github.com/SergeHanssens/digitale_zorg/issues)
- Beschrijf je probleem zo volledig mogelijk
- Voeg screenshots toe indien relevant

---

<p align="center">
  <em>Veel succes met InclusieHelper! 🌟</em>
</p>
