import { formEntry } from '../../../activists';

export type Args = {
  fields: string;
  widget_id: number;
};


interface Request {
  method: 'POST' | string
  body: Args
}

interface Response {
  status: (code: number) => any | { json: (vars: any) => any }
}

export default async (req: Request, res: Response) => {
  if (req.method === 'POST') {
    const result = await formEntry(req.body);
    return res.status(200).json(result);
  }

  return res.status(200).json({ message: 'request GET' });
}