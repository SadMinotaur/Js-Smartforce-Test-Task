import fs from 'fs';

export default async (req, res) =>
  await new Promise((resolve, reject) =>
    DaoIn.getItems({id: parseInt(req.query.item)}).then((v) => {
      res.status(200).json(v);
      resolve(res);
    }),
  );
