const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

//get all hotels our database
const getHotels = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM hotels", (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    } catch (error_1) {
      console.error(error_1);
      throw new Error("Internal server error");
    }
  };
  //create a new hotel record in the databsse
  const createHotel = (body) => {
    return new Promise(function (resolve, reject) {
      const { name, address } = body;
      pool.query(
        "INSERT INTO hotels (name, address) VALUES ($1, $2) RETURNING *",
        [name, address],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new hotel has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  //delete a hotel
  const deleteHotel = (id) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM hotels WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Hotel deleted with ID: ${id}`);
        }
      );
    });
  };
  //update a hotel record
  const updateHotel = (id, body) => {
    return new Promise(function (resolve, reject) {
      const { name, address } = body;
      pool.query(
        "UPDATE hotels SET name = $1, address = $2 WHERE id = $3 RETURNING *",
        [name, address, id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Hotel updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };
  module.exports = {
    getHotels,
    createHotel,
    deleteHotel,
    updateHotel
  };