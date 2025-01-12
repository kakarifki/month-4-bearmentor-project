import { prisma } from '../utils/prisma'


export const createProvince = async (data: any) => {
  return await prisma.province.create({ data })
}

export const getProvinces = async () => {
    return await prisma.province.findMany({
      include: {
        ethnicgroups: true,
        cultures: true,
        regional_songs: true,
        cuisines: true,
      }
    })
  }

export const getProvinceByCode = async (provinceCode: string) => {
  return await prisma.province.findUnique({ 
        where: { provinceCode },
        include: {
          ethnicgroups: true,
          cultures: true,
          regional_songs: true,
          cuisines: true,
        }
    })
}

export const updateProvince = async (provinceCode: string, data: any) => {
    return await prisma.province.update({
      where: { provinceCode },
      data,
    })
  }

export const deleteProvince = async (provinceCode: string) => {
    return await prisma.province.delete({ where: { provinceCode } })
}