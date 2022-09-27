import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return await getPostById(req, res)
  } else if (req.method === 'PUT') {
    return await updatePost(req, res)
  } else if (req.method === 'DELETE') {
    return await deletePostById(req, res)
  } else {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

const getPostById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        isAnonymous: true,
        title: true,
        description: true,
        status: true,
        tags: {
          select: {
            tag: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    })
    const response = {
      ...post,
      tags: post.tags.map(({ tag }) => ({ id: tag.id, name: tag.name })),
    }
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, isAnonymous, title, description, tags } = req.body
  try {
    await prisma.tag.createMany({
      data: tags,
      skipDuplicates: true,
    })

    const tagList = await prisma.tag.findMany({
      where: { name: { in: tags.map((tag: any) => tag.name) } },
    })
    const createRelation = tagList.map((tag) => {
      return {
        assignedBy: '',
        tag: {
          connect: {
            id: tag.id,
          },
        },
      }
    })
    return res.status(200).json('')
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

const deletePostById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const post = await prisma.post.delete({
      where: { id: Number(id) },
    })
    return res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

export default handler
