app.use((err, req, res, next) => {
    if (err) {
      console.error(err.stack);
      res.status(500).send('Something broke!');
    }
  });
  
  app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
  });
  