module.exports = {
  server_port: 3000,
  root_wallet: "r3GWPm7QkWFL8uAWQtLEMBgg76nf5wtxu9",
  db_url: "mongodb://localhost:27017/local",
  db_schemas: [
    {
      file: "./user_schema",
      collection: "users5",
      schemaName: "UserSchema",
      modelName: "UserModel",
    },
  ],
};
