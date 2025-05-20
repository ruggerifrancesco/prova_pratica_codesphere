# Ordini Dashboard

Un'applicazione moderna per la gestione degli ordini con dashboard analitica e funzionalità complete di gestione.

![Dashboard Screenshot](https://placeholder.svg?height=400&width=800)

## Descrizione

Ordini Dashboard è un'applicazione web completa per la gestione degli ordini, progettata per aiutare le aziende a monitorare e gestire i loro ordini in modo efficiente. L'applicazione offre una dashboard analitica con visualizzazioni grafiche e tabelle dettagliate, oltre a funzionalità complete di gestione degli ordini.

## Funzionalità

### Homepage

### Pagine di autenticazione
- **Form di registrazione**: Pagina con form da compilare per registrarsi all' applicazione e averne accesso
- **Form di login**: Pagina con form da compilare per accedere all' applicazione e averne accesso

### Dashboard
- **Panoramica degli ordini**: Visualizzazione rapida del numero di ordini in lavorazione, spediti e annullati
- **Grafici analitici**: Visualizzazione dell'andamento degli ordini per stato nell'ultimo mese
- **Tabella ordini recenti**: Visualizzazione degli ordini più recenti con paginazione
- **Ricerca rapida**: Ricerca di ordini direttamente dalla dashboard

### Gestione Ordini
- **Elenco completo**: Visualizzazione di tutti gli ordini con paginazione
- **Filtri avanzati**:
  - Filtro per stato (In lavorazione, Spedito, Annullato)
  - Filtro per intervallo di date
  - Ricerca per ID o nome prodotto
- **Ordinamento**: Ordinamento per ID, nome prodotto, data ordine e stato
- **Azioni rapide**: Menu contestuale per ogni ordine con azioni come visualizzazione dettagli, aggiornamento stato e annullamento
- **Indicatori visivi**: Badge colorati per identificare rapidamente lo stato degli ordini
- **Esportazione dati**: Funzionalità per esportare i dati degli ordini

### Interfaccia Utente
- **Design responsivo**: Funziona su desktop, tablet e dispositivi mobili
- **Interfaccia moderna**: UI pulita e moderna con componenti shadcn/ui
- **Navigazione intuitiva**: Facile da usare con layout ben organizzato
- **Feedback visivo**: Indicatori di stato e feedback per le azioni dell'utente

## Struttura del Progetto

\`\`\`
ordini-dashboard/
├── app/                    # Cartella principale dell'applicazione Next.js
│   ├── layout.tsx          # Layout principale dell'applicazione
│   ├── page.tsx            # Pagina dashboard principale
│   └── orders/             # Pagina di gestione ordini
├── components/             # Componenti React riutilizzabili
│   ├── dashboard.tsx       # Componente dashboard principale
│   ├── orders-chart.tsx    # Componente per i grafici degli ordini
│   ├── orders-list.tsx     # Componente per la lista completa degli ordini
│   └── orders-table.tsx    # Componente tabella ordini per la dashboard
├── data/                   # Dati dell'applicazione
│   └── orders.json         # Dati di esempio degli ordini
├── types/                  # Definizioni TypeScript
│   └── index.ts            # Interfacce e tipi per l'applicazione
└── public/                 # File statici
\`\`\`

## Tecnologie Utilizzate

- **Next.js**: Framework React per applicazioni web
- **TypeScript**: Per la tipizzazione statica e una migliore esperienza di sviluppo
- **Tailwind CSS**: Per lo styling e il design responsivo
- **shadcn/ui**: Componenti UI riutilizzabili
- **Recharts**: Per la visualizzazione dei dati tramite grafici
- **date-fns**: Per la manipolazione e formattazione delle date

## Installazione

\`\`\`bash
# Installa le dipendenze
npm install

# Avvia il server di sviluppo
npm run dev
\`\`\`

## Utilizzo

Dopo aver avviato l'applicazione, puoi accedere a:

- **Dashboard**: http://localhost:3000/dashboard
- **Gestione Ordini**: http://localhost:3000/orders

### Dashboard

La dashboard fornisce una panoramica rapida degli ordini con:
- Conteggio degli ordini per stato
- Gr
