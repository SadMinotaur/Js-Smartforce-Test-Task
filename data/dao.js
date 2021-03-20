import {Sequelize, DataTypes, Model} from 'sequelize';
import fs from 'fs';

class Dao {
  model;

  async init() {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'data/database.sqlite',
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
    await sequelize.sync({force: true});
    fs.readFile('data/houses.json', (err, data) =>
      JSON.parse(data).forEach((json) => {
        Product.create({
          ...json,
          // Arrays only in Postgres
          amenities: {amenities: json.amenities},
          images: {images: json.images},
        });
      }),
    );
    this.model = Product;
  }

  async getItems(params) {
    if (!this.model) {
      try {
        await this.init();
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        return [];
      }
    }
    const prd = await this.model.findAll({
      where: {
        id: 1,
      },
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
