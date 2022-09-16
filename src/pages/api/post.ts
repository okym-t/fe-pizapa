import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from 'src/lib/prismaClient'
import type { RegFormSchema } from 'src/schemas'

export interface Error {
  error: {
    message: string
  }
}

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
    const posts = await prisma.post.findMany()
    return res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}

async function createPost(req: NextApiRequest, res: NextApiResponse) {
  const { name, isAnonymous, title, description } = req.body as RegFormSchema
  try {
    const newEntry = await prisma.post.create({
      data: { name, isAnonymous, title, description },
    })
    return res.status(200).json(newEntry)
  } catch (error) {
    res.status(500).json({ error: { message: 'Server Error' } })
  }
}
