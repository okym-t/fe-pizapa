import { PrismaClient } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { RegFormSchema } from 'src/schemas'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    return await getPosts(req, res)
  } else if (req.method === 'POST') {
    return await createPost(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getPosts(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = await prisma.post.findMany()
    return res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error' })
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
    res.status(500).json({ error: 'Error' })
  }
}
