import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma'; // Assuming you are using Prisma for DB management

const getUserBlackListStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid data. Ensure email is provided correctly.' });
    }

    try {
      // Find the user by their email
      const userBlacklistStatus = await prisma.user.findUnique({
        where: { email },
        select: { blacklisted: true },
      });

      return res.status(200).send(userBlacklistStatus);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch user blacklist status' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

const updateUserBlackListStatus = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const { email, blockStatus } = req.body;

    if (!email || blockStatus === undefined || (blockStatus !== 'false' && blockStatus !== 'true')) {
      return res.status(400).json({ error: 'Invalid data. Ensure email and blockStatus are provided correctly.' });
    }

    try {
      // Update the user's blacklist status
      const user = await prisma.user.update({
        where: { email },
        data: {
          blacklisted: blockStatus === 'true', // Convert blockStatus to a boolean
        },
      });

      return res.status(200).json({ message: 'User block status updated successfully', user });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update block status' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return getUserBlackListStatus(req, res);
    case 'POST':
    case 'PUT':
      return updateUserBlackListStatus(req, res);
    default:
      return res.status(405).json({ error: 'Method Not Allowed' });
  }
}