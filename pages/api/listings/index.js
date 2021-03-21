import DaoIn from './../../../data/dao';

function query(body, res, resolve) {
  const {offset, price, name} = body;
  DaoIn.getItems({
    offset: offset ? offset : 0,
    price: price ? price : Number.MAX_SAFE_INTEGER,
    name: name ? name : '',
  }).then((v) => {
    res.status(200).json(v);
    resolve(res);
  });
}

export default async (req, res) =>
  await new Promise((resolve, reject) => {
    if (!DaoIn.model) {
      try {
        DaoIn.init().then(() => {
          query(req.body, res, resolve);
        });
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.status(500).json([]);
        resolve(res);
      }
    }
    query(req.body, res, resolve);
  });
