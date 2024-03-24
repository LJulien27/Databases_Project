const express = require('express')
const app = express()
const port = 3001

const hotel_model = require('./hotelModel')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/hotels', (req, res) => {
  hotel_model.getHotels()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/hotels', (req, res) => {
  hotel_model.createHotel(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/hotels/:id', (req, res) => {
  hotel_model.deleteHotel(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put("/hotels/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  hotel_model
    .updateHotel(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/clients', (req, res) => {
  hotel_model.getClients()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/clients', (req, res) => {
  hotel_model.createClient(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/clients/:sin', (req, res) => {
  hotel_model.deleteHotel(req.params.sin)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.put("/clients/:sin", (req, res) => {
  const body = req.body;
  hotel_model.updateClient(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/chains", (req, res) => {
  hotel_model.getChains()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

app.post('/chains', (req, res) => {
  hotel_model.createChain(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/chains/:name', (req, res) => {
  hotel_model.deleteChain(req.params.name)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/chains/:name", (req, res) => {
  const body = req.body;
  hotel_model.updateChain(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  }); 

app.get('/rooms', (req, res) => {
  hotel_model.getRooms()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/rooms', (req, res) => {
  hotel_model.createRoom(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/rooms/:id', (req, res) => {
  hotel_model.deleteRoom(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/rooms/:id", (req, res) => {
  const body = req.body;
  hotel_model.updateRoom(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

app.get('/reservations', (req, res) => {
  hotel_model.getReservations()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/reservations', (req, res) => {
  hotel_model.createReservation(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/reservations/:id_room/:client_sin', (req, res) => {
  hotel_model.deleteReservation(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/reservations/:id_room/:client_sin", (req, res) => {
  const body = req.body;
  hotel_model.updateReservation(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

app.get('/employees', (req, res) => {
  hotel_model.getEmployees()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/employees', (req, res) => {
  hotel_model.createEmployee(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/employees/:sin', (req, res) => {
  hotel_model.deleteEmployee(req.params.sin)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/employees/:sin", (req, res) => {
  const body = req.body;
  hotel_model.updateEmployee(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

app.get('/rentals', (req, res) => {
  hotel_model.getRentals()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/rentals', (req, res) => {
  hotel_model.createRental(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/rentals/:id_room/:client_sin', (req, res) => {
  hotel_model.deleteRental(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/rentals/:id_room/:client_sin", (req, res) => {
  const body = req.body;
  hotel_model.updateRental(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

app.get('/commodities', (req, res) => {
  hotel_model.getCommodities()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/commodities', (req, res) => {
  hotel_model.createCommodity(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/commodities/:id_room', (req, res) => {
  hotel_model.deleteCommodity(req.params.id_room)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/commodities/:id_room", (req, res) => {
  const body = req.body;
  hotel_model.updateCommodity(body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/phonenumbers', (req, res) => {
  hotel_model.getPhonenumbers()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/phonenumbers', (req, res) => {
  hotel_model.createPhonenumber(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/phonenumbers/:id', (req, res) => {
  hotel_model.deletePhonenumber(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/phonenumbers/:id", (req, res) => {
  hotel_model.updatePhonenumber(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get('/emails', (req, res) => {
  hotel_model.getEmails()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.post('/emails', (req, res) => {
  hotel_model.createEmail(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.delete('/emails/:id', (req, res) => {
  hotel_model.deleteEmail(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  });
});

app.put("/emails/:id", (req, res) => {
  hotel_model.updateEmail(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
  });

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})