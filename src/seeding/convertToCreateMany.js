import csv from 'csvtojson'
import fs from 'fs'

// Konfigurasi model
const config = {
    model: 'EthnicGroup', // Ganti dengan nama model Anda: Province, EthnicGroup, Culture, RegionalSong, atau Cuisine
    csvFilePath: './ethnic.csv', // Path ke file CSV
    outputJsonFilePath: './outputEthnic.json', // Path file output JSON
}

// Mapping kolom untuk setiap model
const fieldMappings = {
    Province: (item) => ({
        name: item.name,
        provinceCode: item.provinceCode,
        capital_city: item.capital_city,
        population: item.population ? parseInt(item.population, 10) : null,
        area_size: item.area_size ? parseFloat(item.area_size) : null,
    }),
    EthnicGroup: (item) => ({
        name: item.name,
        ethnicGroupCode: item.ethnicGroupCode,
        provinceCode: item.provinceCode,
    }),
    Culture: (item) => ({
        name: item.name,
        cultureCode: item.cultureCode,
        category: item.category, // Pastikan value sesuai enum (e.g., "DANCE")
        description: item.description || null,
        provinceCode: item.provinceCode,
    }),
    RegionalSong: (item) => ({
        title: item.title,
        regionalSongCode: item.regionalSongCode,
        composer: item.composer || null,
        provinceCode: item.provinceCode,
    }),
    Cuisine: (item) => ({
        name: item.name,
        cuisineCode: item.cuisineCode,
        description: item.description || null,
        provinceCode: item.provinceCode,
    }),
}

async function convertCSVtoCreateMany() {
    try {
        console.log(`Converting CSV to JSON for model: ${config.model}...`)

        // Konversi CSV ke JSON
        const jsonArray = await csv().fromFile(config.csvFilePath)

        // Format ulang data berdasarkan model
        const formattedData = jsonArray.map(fieldMappings[config.model])

        // Simpan hasil ke file JSON
        fs.writeFileSync(config.outputJsonFilePath, JSON.stringify(formattedData, null, 2))
        console.log(`Conversion completed. JSON saved to ${config.outputJsonFilePath}`)
    } catch (error) {
        console.error('Error during conversion:', error)
    }
}

convertCSVtoCreateMany()
