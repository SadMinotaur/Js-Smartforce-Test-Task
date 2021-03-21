import DaoIn from './../../../data/dao';

function query(body, res, resolve) {
  const {
    offset,
    priceStr,
    priceEnd,
    squareStr,
    squareEnd,
    name,
    builder,
    garage,
    bedrooms,
  } = body;
  DaoIn.getItems({
    offset: offset ? offset : 0,
    priceStr: priceStr ? priceStr : 0,
    priceEnd: priceEnd ? priceEnd : Number.MAX_SAFE_INTEGER,
    squareStr: squareStr ? squareStr : 0,
    squareEnd: squareEnd ? squareEnd : Number.MAX_SAFE_INTEGER,
    name: name ? name : '',
    builder: builder ? builder : '',
    garage: garage ? garage : 0,
    bedrooms: bedrooms ? bedrooms : 0,
  })
    .then((v) => {
      res.status(200).json(v);
      resolve(res);
    })
    .catch(() => {
      res.status(500).json([]);
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
    } else {
      query(req.body, res, resolve);
    }
  });
