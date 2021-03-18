import fs from 'fs';

export default async (req, res) => {
  await new Promise((resolve, reject) =>
    fs.readFile('data/houses.json', (err, data) => {
      res
        .status(200)
        .json(
          JSON.parse(data).filter((s) => s.id === parseInt(req.query.item)),
        );
      resolve(res);
    }),
  );
};
