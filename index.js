// Express
const express = require("express");
const app = express();
const transaksiRoutes = require("./routes/transaksiRoutes.js");
const barangRoutes = require("./routes/barangRoutes");
const pelangganRoutes = require("./routes/pelangganRoutes");

//Set body parser for HTTP post operation
app.use(express.json()); // support json encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
); // support encoded bodies

//set static assets to public directory
app.use(express.static("public"));
require("./utils/associations");

app.use("/transaksi", transaksiRoutes); 
app.use("/barang", barangRoutes);
app.use("/pelanggan", pelangganRoutes);

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
