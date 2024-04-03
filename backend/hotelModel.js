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
      const { name, address, id, rooms, chain_name, ratings } = body;
      pool.query(
        "INSERT INTO hotels (name, address, id, rooms, chain_name, ratings) VALUES ($1, $2, $3, $4, 5$, 6$) RETURNING *",
        [name, address, id, rooms, chain_name, ratings],
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
      const { name, address, rooms, rating } = body;
      pool.query(
        "UPDATE hotels SET name = $1, address = $2, rooms = $3, rating = $4 WHERE id = $5 RETURNING *",
        [name, address, rooms, rating],
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
  //get all clients
  const getClients = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM clients", (error, results) => {
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
  //create a new client record
  const createClient = (body) => {
    return new Promise(function (resolve, reject) {
      const { f_name, l_name, sin, address, r_date, password } = body;
      pool.query(
        "INSERT INTO clients (f_name, l_name, sin, address, r_date, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [f_name, l_name, sin, address, r_date, password],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new client has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );});
    };

    //delete a client
  const deleteClient = (sin) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM clients WHERE sin = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Client deleted with sin: ${sin}`);
        }
      );
    });
  };

  //update a client record
  const updateClient = (body) => {
    return new Promise(function (resolve, reject) {
      const { fname, lname, sin, address, r_date, password } = body;
      pool.query(
        "UPDATE clients SET fname = $1, lname = $2, sin = $3, address = $4, r_date = $5, password = $6 WHERE sin = $3 RETURNING *",
        [fname, lname, sin, address, r_date, password],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Client updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //get all chains
  const getChains = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM chains", (error, results) => {
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

  //create a new chain
  const createChain = (body) => {
    return new Promise(function (resolve, reject) {
      const { name, address, num_hotels } = body;
      pool.query(
        "INSERT INTO chains (name, address, num_hotels) VALUES ($1, $2, $3) RETURNING *",
        [name, address, num_hotels],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new chain has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };

  //delete a chain
  const deleteChain = (name) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM chains WHERE name = $1",
        [name],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Chain deleted with name: ${name}`);
        }
      );
    });
  };

  //update a chain
  const updateChain = (body) => {
    return new Promise(function (resolve, reject) {
      const { oldName, name, address, num_hotels } = body;
      pool.query(
        "UPDATE chains SET name = $2, address = $3, num_hotels = $4 WHERE name = $1 RETURNING *",
        [oldName, name, address, num_hotels],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Chain updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //get all rooms
  const getRooms = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM rooms", (error, results) => {
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

  //create a new room
  const createRoom = (body) => {
    return new Promise(function (resolve, reject) {
      const { id, hotel_id, price, capacity, view, problems, expanding } = body;
      pool.query(
        "INSERT INTO rooms (id, hotel_id, price, capacity, view, problems, expanding) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [id, hotel_id, price, capacity, view, problems, expanding],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new room has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };

  //delete a room
  const deleteRoom = (id) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM rooms WHERE id = $1",
        [id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Room deleted with ID: ${id}`);
        }
      );
    });
  };

  //update a room
  const updateRoom = (body) => {
    return new Promise(function (resolve, reject) {
      const { id, hotel_id, price, capacity, view, problems, expanding } = body;
      pool.query(
        "UPDATE rooms SET id = $1, hotel_id = $2, price = $3, capacity = $4, view = $5, problems = $6, expanding = $7 WHERE id = $1 RETURNING *",
        [id, hotel_id, price, capacity, view, problems, expanding],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Room updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        });
      });
    };


    //get all reservations
  const getReservations = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM reservations", (error, results) => {
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
  }

  //create a new reservation
  const createReservation = (body) => {
    return new Promise(function (resolve, reject) {
      const { client_sin, id_room, s_date, e_date } = body;
      pool.query(
        "INSERT INTO reservations (client_sin, id_room, s_date, e_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [client_sin, id_room, s_date, e_date],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new reservation has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };

  //delete a reservation
  //THIS IS ALSO CHANGED FROM ORIGINAL AND WORKS NOW
  const deleteReservation = (client_sin, id_room) => {
    return new Promise(function (resolve, reject) {
      //const { client_sin, id_room } = body;
      pool.query(
        "DELETE FROM reservations WHERE client_sin = $1 AND id_room = $2",
        [client_sin, id_room],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Reservation deleted with client sin: ${client_sin} and room id: ${id_room}`);
        }
      );
    });
  };
  
  //update a reservation
  const updateReservation = (body) => {
    return new Promise(function (resolve, reject) {
      const { client_sin, id_room, s_date, e_date } = body;
      pool.query(
        "UPDATE reservations SET client_sin = $1, id_room = $2, s_date = $3, e_date = $4 WHERE client_sin = $1 AND id_room = $2 RETURNING *",
        [client_sin, id_room, s_date, e_date],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Reservation updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //get all employees
  const getEmployees = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM employees", (error, results) => {
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


  //create a new employee
  const createEmployee = (body) => {
    return new Promise(function (resolve, reject) {
      const { f_name, l_name, sin, address, role, hotel_id } = body;
      pool.query(
        "INSERT INTO employees (f_name, l_name, sin, address, role, hotel_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [f_name, l_name, sin, address, role, hotel_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new employee has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //delete an employee
  const deleteEmployee = (sin) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM employees WHERE sin = $1",
        [sin],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Employee deleted with sin: ${sin}`);
        }
      );
    });
  };


  //update an employee
  const updateEmployee = (body) => {
    return new Promise(function (resolve, reject) {
      const { f_name, l_name, sin, address, role, hotel_id } = body;
      pool.query(
        "UPDATE employees SET f_name = $1, l_name = $2, sin = $3, address = $4, role = $5, hotel_id = $6 WHERE sin = $3 RETURNING *",
        [f_name, l_name, sin, address, role, hotel_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Employee updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //get all rentals
  const getRentals = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM rentals", (error, results) => {
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


  //create a new rental
  const createRental = (body) => {
    return new Promise(function (resolve, reject) {
      const { client_sin, id_room, s_date, e_date, } = body;
      pool.query(
        "INSERT INTO rentals (client_sin, id_room, s_date, e_date) VALUES ($1, $2, $3, $4) RETURNING *",
        [client_sin, id_room, s_date, e_date],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new rental has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );});
  };


  //delete a rental
  const deleteRental = (body) => {
    return new Promise(function (resolve, reject) {
      const { client_sin, id_room } = body;
      pool.query(
        "DELETE FROM rentals WHERE client_sin = $1 AND id_room = $2",
        [client_sin, id_room],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Rental deleted with room ID: ${id_room} and client SIN: ${client_sin}`);
        }
      );
    });
  };


  //update a rental
  const updateRental = (body) => {
    return new Promise(function (resolve, reject) {
      const { client_sin, id_room, s_date, e_date, } = body;
      pool.query(
        "UPDATE rentals SET client_sin = $1, id_room = $2, s_date = $3, e_date = $4 WHERE client_sin = $1 AND id_room = $2 RETURNING *",
        [client_sin, id_room, s_date, e_date],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Rental updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //get all commodities
  const getCommodities = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM commodities", (error, results) => {
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


  //create a new commodity
  const createCommodity = (body) => {
    return new Promise(function (resolve, reject) {
      const { id_room, tv, ac, fridge, laundry } = body;
      pool.query(
        "INSERT INTO commodities (id_room, tv, ac, fridge, laundry) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [id_room, tv, ac, fridge, laundry],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new commodity has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );});
  };


  //delete a commodity
  const deleteCommodity = (id_room) => {
    return new Promise(function (resolve, reject) {
      pool.query(
        "DELETE FROM commodities WHERE id_room = $1",
        [id_room],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Commodity deleted with room ID: ${id_room}`);
        }
      );
    });
  };


  //update a commodity
  const updateCommodity = (body) => {
    return new Promise(function (resolve, reject) {
      const { id_room, tv, ac, fridge, laundry } = body;
      pool.query(
        "UPDATE commodities SET id_room = $1, tv = $2, ac = $3, fridge = $4, laundry = $5 WHERE id_room = $1 RETURNING *",
        [id_room, tv, ac, fridge, laundry],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Commodity updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //get all phonenumbers
  const getPhonenumbers = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM phonebank", (error, results) => {
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
    }};


  //create a new phonenumber
  const createPhonenumber = (body) => {
    return new Promise(function (resolve, reject) {
      const { chain_name, hotel_id, phone_number } = body;
      pool.query(
        "INSERT INTO phonebank (chain_name, hotel_id, phone_number) VALUES ($1, $2, $3) RETURNING *",
        [chain_name, hotel_id, phone_number],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new phonenumber has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );});
  };


  //delete a phonenumber
  const deletePhonenumber = (body) => {
    return new Promise(function (resolve, reject) {
      const { chain_name, hotel_id } = body;
      pool.query(
        "DELETE FROM phonebank WHERE chain_name = $1 OR hotel_id = $2",
        [chain_name, hotel_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Phonenumber deleted`);
        }
      );
    });
  };

  
  //update a phonenumber
  const updatePhonenumber = (body) => {
    return new Promise(function (resolve, reject) {
      const { chain_name, hotel_id, phone_number } = body;
      pool.query(
        "UPDATE phonebank SET chain_name = $1, hotel_id = $2, phone_number = $3 WHERE chain_name = $1 OR hotel_id = $2 RETURNING *",
        [chain_name, hotel_id, phone_number],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Phonenumber updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );});
  };


  //get all email addresses
  const getEmails = async () => {
    try {
      return await new Promise(function (resolve, reject) {
        pool.query("SELECT * FROM mailbank", (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(results.rows);
          } else {
            reject(new Error("No results found"));
          }
        });});
      } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
      }
    };


    //create a new email address
  const createEmail = (body) => {
    return new Promise(function (resolve, reject) {
      const { chain_name, hotel_id, email } = body;
      pool.query(
        "INSERT INTO mailbank (chain_name, hotel_id, email) VALUES ($1, $2, $3) RETURNING *",
        [chain_name, hotel_id, email],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(
              `A new email has been added: ${JSON.stringify(results.rows[0])}`
            );
          } else {
            reject(new Error("No results found"));
          }
        }
      );});
    };


    //delete an email address
  const deleteEmail = (body) => {
    return new Promise(function (resolve, reject) {
      const { chain_name, hotel_id } = body;
      pool.query(
        "DELETE FROM mailbank WHERE chain_name = $1 OR hotel_id = $2",
        [chain_name, hotel_id],
        (error, results) => {
          if (error) {
            reject(error);
          }
          resolve(`Email deleted with ID: ${id}`);
        }
      );
    });
  };


  //update an email address
  const updateEmail = (body) => {
    return new Promise(function (resolve, reject) {
      const { chain_name, hotel_id, email } = body;
      pool.query(
        "UPDATE mailbank SET chain_name = $1, hotel_id = $2, email = $3 WHERE chain_name = $1 OR hotel_id = $2 RETURNING *",
        [chain_name, hotel_id, email],
        (error, results) => {
          if (error) {
            reject(error);
          }
          if (results && results.rows) {
            resolve(`Email updated: ${JSON.stringify(results.rows[0])}`);
          } else {
            reject(new Error("No results found"));
          }
        }
      );
    });
  };


  //export the functions
  module.exports = {
    getHotels,
    createHotel,
    deleteHotel,
    updateHotel,
    getClients,
    createClient,
    deleteClient,
    updateClient,
    getChains,
    createChain,
    deleteChain,
    updateChain,
    getRooms,
    createRoom,
    deleteRoom,
    updateRoom,
    getReservations,
    createReservation,
    deleteReservation,
    updateReservation,
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
    getRentals,
    createRental,
    deleteRental,
    updateRental,
    getCommodities,
    createCommodity,
    deleteCommodity,
    updateCommodity,
    getPhonenumbers,
    createPhonenumber,
    deletePhonenumber,
    updatePhonenumber,
    getEmails,
    createEmail,
    deleteEmail,
    updateEmail
  };