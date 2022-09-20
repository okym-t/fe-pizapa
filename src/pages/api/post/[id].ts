import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return await getPostById(req, res)
  } else {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

const getPostById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  try {
    const post = await prisma.post.findUniqueOrThrow({
      where: { id: Number(id) },
    })
    return res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

export default handler
