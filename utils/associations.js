const { Pemasok, Pelanggan, Barang, Transaksi } = require("../models"); // Import all models

// pemasok and transaksi relationship
Pemasok.hasMany(Barang, { foreignKey: "id_pemasok" });
Barang.belongsTo(Pemasok, { foreignKey: "id_pemasok" });

// barang and transaksi relationship
Barang.hasMany(Transaksi, { foreignKey: "id_barang" });
Transaksi.belongsTo(Barang, { foreignKey: "id_barang" });

// pelanggan and transaksi relationship
Pelanggan.hasMany(Transaksi, { foreignKey: "id_pelanggan" });
Transaksi.belongsTo(Pelanggan, { foreignKey: "id_pelanggan" });
