import fs from 'fs';

export default async (req, res) => {
  await new Promise((resolve, reject) =>
    fs.readFile('data/houses.json', (err, data) => {
      const offset = req.body.offset;
      const json = JSON.parse(data);
      res.status(200).json(json.slice(offset, offset + 20));
      resolve(res);
    }),
  );
};
