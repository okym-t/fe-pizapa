import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getComments(req, res)
  } else if (req.method === 'POST') {
    return await postComment(req, res)
  } else {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

async function getComments(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  try {
    const comments = await prisma.comment.findMany({
      select: {
        id: true,
        name: true,
        content: true,
        avatarLink: true,
        userId: true,
      },
      where: {
        postId: Number(id),
      },
    })
    return res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

async function postComment(req: NextApiRequest, res: NextApiResponse) {
  const { name, postId, avatarLink, content, userId } = req.body

  console.log({ name, postId, avatarLink, content, userId })

  try {
    const newEntry = await prisma.comment.create({
      data: {
        name,
        postId: Number(postId),
        avatarLink,
        content,
        userId,
      },
    })
    return res.status(200).json(newEntry)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}
