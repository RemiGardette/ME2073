import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req:any, res:any) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { courseCode } = req.query;

  try {
    const course = await prisma.course.findUnique({
      where: { courseId: courseCode }
    });

    if (course) {
      res.status(200).json({ exists: true });
    } else {
      res.status(200).json({ exists: false });
    }
  } catch (error) {
    console.error('Error checking course:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
