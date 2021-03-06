import {Sequelize, DataTypes, Model} from 'sequelize';
import fs from 'fs';

class Dao {
  op = Sequelize.Op;
  model;

  async init() {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'data/database.sqlite',
      logging: false,
    });
    await sequelize.authenticate();
    class Product extends Model {}
    Product.init(
      {
        id: {type: Sequelize.INTEGER, primaryKey: true},
        product: Sequelize.STRING,
        builder: Sequelize.STRING,
        price: Sequelize.INTEGER,
        phone: Sequelize.STRING,
        square: Sequelize.INTEGER,
        hasBasement: Sequelize.BOOLEAN,
        description: Sequelize.STRING,
        garage: Sequelize.INTEGER,
        bedrooms: Sequelize.INTEGER,
        type: Sequelize.STRING,
        address: DataTypes.JSON,
        amenities: DataTypes.JSON,
        images: DataTypes.JSON,
      },
      {sequelize, modelName: 'product'},
    );
    await sequelize.sync();
    this.model = Product;
    for (const json of JSON.parse(fs.readFileSync('data/houses.json'))) {
      await Product.findOrCreate({
        where: {
          id: json.id,
        },
        defaults: {
          ...json,
          // Arrays only in Postgres
          amenities: {amenities: json.amenities},
          images: {images: json.images},
        },
      }).catch((e) => {
        console.log(e);
      });
    }
    console.log('done insert');
  }

  async getItems(params) {
    const {
      id,
      offset,
      priceStr,
      priceEnd,
      name,
      builder,
      garage,
      bedrooms,
      squareStr,
      squareEnd,
    } = params;
    const prd = await this.model
      .findAndCountAll({
        where:
          id !== undefined
            ? params
            : {
                price: {[this.op.between]: [priceStr, priceEnd]},
                square: {[this.op.between]: [squareStr, squareEnd]},
                product: {[this.op.startsWith]: [name]},
                builder: {[this.op.startsWith]: [builder]},
                garage: {[this.op.gte]: [garage]},
                bedrooms: {[this.op.gte]: [bedrooms]},
              },
        offset: offset,
        limit: 20,
      })
      .catch((e) => {
        console.log(e);
      });
    return prd;
  }
}

const DaoIn = new Dao();
export default DaoIn;

// Previous attempt
// class Coordinates extends Model {}
// Coordinates.init(
//   {
//     latitude: Sequelize.STRING,
//     longitude: Sequelize.STRING,
//   },
//   {sequelize, modelName: 'coordinates'},
// );
// class Address extends Model {}
// Address.init(
//   {
//     street: Sequelize.STRING,
//     city: Sequelize.STRING,
//     state: Sequelize.STRING,
//     zip: Sequelize.STRING,
//   },
//   {sequelize, modelName: 'address'},
// );
// class Product extends Model {}
// Product.init(
//   {
//     id: {type: Sequelize.INTEGER, primaryKey: true},
//     product: Sequelize.STRING,
//     builder: Sequelize.STRING,
//     price: Sequelize.INTEGER,
//     phone: Sequelize.STRING,
//     square: Sequelize.INTEGER,
//     hasBasement: Sequelize.BOOLEAN,
//     description: Sequelize.STRING,
//     garage: Sequelize.INTEGER,
//     bedrooms: Sequelize.INTEGER,
//     type: Sequelize.STRING,
//     amenities: DataTypes.ARRAY(DataTypes.STRING),
//     images: DataTypes.ARRAY(DataTypes.STRING),
//   },
//   {sequelize, modelName: 'product'},
// );
// Address.Coordinates = Address.hasOne(Coordinates);
// Product.Address = Product.hasOne(Address);
