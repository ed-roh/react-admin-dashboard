const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://dashboard:dash1234@dashboard.zfwio9v.mongodb.net/dashboard?retryWrites=true&w=majoritymongodb+srv://bookstore:12345@bookstore.ctpojnn.mongodb.net/bookstore?retryWrites=true&w=majority";
const mongoDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(
    mongoURI,
    { useNewUrlParser: true },
    async (err, result) => {
      if (err) console.log("---", err);
      else {
        console.log("connected");
        const fetched_data = await mongoose.connection.db.collection("visual");
        global.data = fetched_data;
        fetched_data.find({}).toArray(function (err, Data) {
          if (err) console.log(err);
          else {
            global.products = Data;
          }
        });
      }
    }
  );
};

module.exports = mongoDB;
