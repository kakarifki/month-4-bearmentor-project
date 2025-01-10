import { prisma } from '../utils/prisma'

export const createCuisine = async (data: any) => {
  return await prisma.cuisine.create({ data })
}

export const getCuisines = async () => {
  return await prisma.cuisine.findMany()
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
