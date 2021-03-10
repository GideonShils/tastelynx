import { getAllConfigs } from './../../../models/Config';
import { NextApiRequest, NextApiResponse } from "next"



export default async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO: Add some kind of auth
  const allConfigs = await getAllConfigs();

  const playlistUpdatePromises = allConfigs.map(config => {
    const userId = config.userId;
  })

  return res.status(200);
};