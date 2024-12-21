// pages/api/updateRole.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/prisma';  // Assuming you are using Prisma for DB management

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, role } = req.body;

    if (!email || !role || (role !== 'admin' && role !== 'user')) {
      return res.status(400).json({ error: 'Invalid data. Ensure username and role are provided correctly.' });
    }

    try {
      // Find the user by their username
      const user = await prisma.user.update({
        where: { email: email },
        data: {
          role: role,  // Update the role to either 'admin' or 'user'
        },
      });

      return res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to update user role' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}