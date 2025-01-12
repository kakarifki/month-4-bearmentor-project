import { prisma } from '../utils/prisma'

export const createCuisine = async (data: any) => {
  return await prisma.cuisine.create({ data })
}

export const getCuisines = async (filters: { name?: string } ={} ) => {
  return await prisma.cuisine.findMany(
    {
      where: {
        ...(filters.name && {
          name: {
            contains: filters.name,
            mode: 'insensitive',
          }
        })
      },
    }
  )
}

export const getCuisineByCode = async (cuisineCode: string) => {
  return await prisma.cuisine.findUnique({
    where: { cuisineCode },
  })
}

export const updateCuisine = async (cuisineCode: string, data: any) => {
  return await prisma.cuisine.update({
    where: { cuisineCode },
    data,
  })
}

export const deleteCuisine = async (cuisineCode: string) => {
  return await prisma.cuisine.delete({
    where: { cuisineCode },
  })
}
