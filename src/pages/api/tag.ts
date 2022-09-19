import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getTags(req, res)
  } else {
    return res.status(405).json({ error: { message: 'Method not allowed' } })
  }
}

async function getTags(req: NextApiRequest, res: NextApiResponse) {
  try {
    const tags = await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    })
    return res.status(200).json(tags)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}
