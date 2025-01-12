import { prisma } from '../utils/prisma'

export const createRegionalSong = async (data: any) => {
  return await prisma.regionalSong.create({ data })
}

export const getRegionalSongs = async (filters: { title?: string } = {}) => {
  return await prisma.regionalSong.findMany(
    {
      where: {
        ...(filters.title && {
          title: {
            contains: filters.title,
            mode: 'insensitive'
          }
        }
      )
      }
    }
  )
}

export const getRegionalSongByCode = async (regionalSongCode: string) => {
  return await prisma.regionalSong.findUnique({
    where: { regionalSongCode },
  })
}

export const updateRegionalSong = async (regionalSongCode: string, data: any) => {
  return await prisma.regionalSong.update({
    where: { regionalSongCode },
    data,
  })
}

export const deleteRegionalSong = async (regionalSongCode: string) => {
  return await prisma.regionalSong.delete({
    where: { regionalSongCode },
  })
}
