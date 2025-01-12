import { PrismaClient, CultureCategory } from "@prisma/client";
import provincesData from "../src/seeding/outputProvince.json";
import ethnicGroupData from "../src/seeding/outputEthnic.json";
import culturesData from "../src/seeding/outputCulture.json";
import regionalSongsData from "../src/seeding/outputSong.json";
import cuisinesData from "../src/seeding/outputCuisine.json";

const prisma = new PrismaClient()

async function main() {
    // Seeding Province
    await prisma.province.createMany({
        data: provincesData,
    })
    console.log('Seeding Provinces completed.')

    // Seeding Ethnic Group
    await prisma.ethnicGroup.createMany({
        data: ethnicGroupData,
    })
    console.log('Seeding Ethnic Groups completed.')

    // Format Category menjadi enum
    const formattedCulturesData = culturesData.map((culture) => ({
        ...culture,
        category: CultureCategory[culture.category as keyof typeof CultureCategory],
    }))

    // Seeding Culture
    await prisma.culture.createMany({
        data: formattedCulturesData,
    })
    console.log('Seeding Cultures completed.')

    // Seeding Regional Song
    await prisma.regionalSong.createMany({
        data: regionalSongsData,
    })
    console.log('Seeding Regional Songs completed.')

    // Seeding Cuisine
    await prisma.cuisine.createMany({
        data: cuisinesData,
    })
    console.log('Seeding Cuisines completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })