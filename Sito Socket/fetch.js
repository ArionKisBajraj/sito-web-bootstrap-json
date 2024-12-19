// Funzione per caricare il JSON da un file
function fetchJsonData() {
    fetch('index.json')  // Carica il file JSON
        .then(response => {
            // Verifica se la risposta è OK
            if (!response.ok) {
                throw new Error('Errore nel caricamento del file JSON');
            }
            return response.json();  // Converte la risposta in formato JSON
        })
        .then(data => {
            // Quando i dati vengono caricati correttamente, manipolali
            console.log(data);
            displayJsonData(data);
            filterSectionsByKeyword(data, 'TCP');
        })
        .catch(error => {
            // Gestisci eventuali errori
            console.error('Errore:', error);
        });
}

// Funzione per visualizzare i dati in console
function displayJsonData(data) {
    console.log("Pagina: ", data.page);
    console.log("Titolo: ", data.title);
    console.log("Descrizione: ", data.description);

    // Itera sulle sezioni e visualizza i dettagli
    data.sections.forEach(section => {
        console.log(`Sezione: ${section.header}`);
        console.log(`Contenuto: ${section.content}`);
    });
}

// Funzione per filtrare le sezioni in base a una parola chiave
function filterSectionsByKeyword(data, keyword) {
    const filteredSections = data.sections.filter(section => 
        section.header.toLowerCase().includes(keyword.toLowerCase()) ||
        section.content.toLowerCase().includes(keyword.toLowerCase())
    );

    console.log(`Sezioni che contengono la parola chiave "${keyword}":`);
    filteredSections.forEach(section => {
        console.log(`- ${section.header}`);
        console.log(`  ${section.content}`);
    });
}

// Funzione per aggiungere una nuova sezione
function addNewSection(data, header, content) {
    const newSection = { header, content };
    data.sections.push(newSection);
    console.log("Nuova sezione aggiunta:", newSection);
    console.log("Sezioni aggiornate:", data.sections);
}

// Esegui la funzione per caricare i dati JSON
fetchJsonData();
