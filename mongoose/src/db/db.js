const mongoose = require('mongoose')
async function condb() {
   // await mongoose.connect('mongodb+srv://syedu:JfGdGPjTMVlUAqME@yt-backend.8trduon.mongodb.net/Smud')
  try {
  await mongoose.connect(
    "mongodb+srv://umershakir987_db_user:H421TNMM7RV7bW5p@try.ujkebyk.mongodb.net/nab"
  );
  console.log("DATABASE CONNECTED");
} catch (error) {
  console.error(error); // Print the full error
}
} 
module.exports = condb

// use = umershakir987_db_user
// pass=H421TNMM7RV7bW5p