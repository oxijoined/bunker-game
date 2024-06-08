import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { actions } = req.body;

    const devices = config.YANDEX_LAMP_IDS.map((id: string) => ({
      id: id,
      actions: actions
    }));

    const dataJson = { devices };

    const response = await axios.post("https://api.iot.yandex.net/v1.0/devices/actions", dataJson, {
      headers: {
        'Authorization': `Bearer ${config.YANDEX_OAUTH}`,
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);
  } catch (err) {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export default handler;
