import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'
import { PostStatus } from 'src/types/api.types'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getPosts(req, res)
  } else if (req.method === 'POST') {
    return await createPost(req, res)
  } else {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        name: true,
        isAnonymous: true,
        title: true,
        description: true,
        avatarLink: true,
        status: true,
        tags: {
          select: {
            assignedBy: true,
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
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    })
    const response = posts.map((post) => ({
      ...post,
      name: post.isAnonymous ? '' : post.name,
      avatarLink: post.isAnonymous ? '' : post.avatarLink,
      tags: post.tags.map(({ tag }) => ({ id: tag.id, name: tag.name })),
    }))
    return res.status(200).json(response)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const { userId, name, isAnonymous, title, description, avatarLink, tags } =
    req.body
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
    const newEntry = await prisma.post.create({
      data: {
        userId,
        name,
        isAnonymous,
        title,
        description,
        avatarLink,
        status: PostStatus.open,
        tags: {
          create: createRelation,
        },
      },
    })

    return res.status(200).json(newEntry)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}
