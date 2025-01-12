import { prisma } from '../utils/prisma'

export const createCulture = async (data: any) => {
  return await prisma.culture.create({ data })
}

export const getCultures = async (filters: { name?: string; category?: string } = {}) => {
  return await prisma.culture.findMany(
    {
      where: {
        ...(filters.name && {
          name: {
            contains: filters.name,
            mode: 'insensitive', // Case-insensitive
          },
        }),
        ...(filters.category && {
          category: {
            equals: filters.category as any,
          },
        }),
      }
    }
  )
}

export const getCultureByCode = async (cultureCode: string) => {
  return await prisma.culture.findUnique({
    where: { cultureCode },
  })
}

export const updateCulture = async (cultureCode: string, data: any) => {
  return await prisma.culture.update({
    where: { cultureCode },
    data,
  })
}

export const deleteCulture = async (cultureCode: string) => {
  return await prisma.culture.delete({
    where: { cultureCode },
  })
}
