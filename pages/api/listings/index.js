import DaoIn from './../../../data/dao';

export default async (req, res) =>
  await new Promise((resolve, reject) =>
    DaoIn.getItems({}).then((v) => {
      res.status(200).json(v);
      resolve(res);
    }),
  );
