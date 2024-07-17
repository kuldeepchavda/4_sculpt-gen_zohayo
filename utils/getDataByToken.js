
const {admin} = require("../firebase")
async function getDataByToken(token) {
  try {
    const response = await admin.auth().verifyIdToken(token);
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error; // Rethrow the error if needed
  }
}
module.exports = getDataByToken;