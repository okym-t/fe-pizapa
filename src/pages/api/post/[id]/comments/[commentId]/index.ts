import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PATCH') {
    return await updateComment(req, res)
  } else if (req.method === 'DELETE') {
    return await deleteComment(req, res)
  } else {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

async function updateComment(req: NextApiRequest, res: NextApiResponse) {
  const { id, description } = req.body
  try {
    const post = await prisma.comment.update({
      where: { id: Number(id) },
      data: { content: description },
    })
    return res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

async function deleteComment(req: NextApiRequest, res: NextApiResponse) {
  const { commentId } = req.query
  try {
    const post = await prisma.comment.delete({
      where: { id: Number(commentId) },
    })
    return res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}
