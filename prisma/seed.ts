import { PrismaClient } from "@prisma/client";
import provincesData from "../src/seeding/outputProvince.json"
import ethnicGroupData from "../src/seeding/outputEthnic.json"

const prisma = new PrismaClient()

async function main() {
    // Seeding Province
    await prisma.province.createMany({
        data: provincesData,
    })
    console.log('Seeding Provinces completed.')

    //
    await prisma.ethnicGroup.createMany({
        data: ethnicGroupData,
    })
    console.log('Seeding Ethnic Code completed.')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })