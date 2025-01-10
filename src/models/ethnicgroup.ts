import { prisma } from '../utils/prisma'

export const createEthnicGroup = async (data: any) => {
  return await prisma.ethnicGroup.create({ data })
}

export const getEthnicGroups = async () => {
  return await prisma.ethnicGroup.findMany()
}

export const getEthnicGroupByCode = async (ethnicGroupCode: string) => {
  return await prisma.ethnicGroup.findUnique({
    where: { ethnicGroupCode },
  })
}

export const updateEthnicGroup = async (ethnicGroupCode: string, data: any) => {
  return await prisma.ethnicGroup.update({
    where: { ethnicGroupCode },
    data,
  })
}

export const deleteEthnicGroup = async (ethnicGroupCode: string) => {
  return await prisma.ethnicGroup.delete({
    where: { ethnicGroupCode },
  })
}
