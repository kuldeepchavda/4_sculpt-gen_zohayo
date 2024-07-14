
const {admin} = require("../firebase")
async function getDataByToken(token) {
  try {
    const response = await admin.auth().verifyIdToken(token);
    console.log("The data verified by back-end");
    return response;
  } catch (error) {
    console.log("Error", error);
    throw error; // Rethrow the error if needed
  }
}
module.exports = getDataByToken
// (async () => {
//   try {
//     const token =
//       "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU2OTFhMTk1YjI0MjVlMmFlZDYwNjMzZDdjYjE5MDU0MTU2Yjk3N2QiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vem9oYXlvLTIzMjc4IiwiYXVkIjoiem9oYXlvLTIzMjc4IiwiYXV0aF90aW1lIjoxNzIwOTU5MTYyLCJ1c2VyX2lkIjoiWllSekhZeFpIQ1R6dW5GUXA5NVVZWHp3bUhvMSIsInN1YiI6IlpZUnpIWXhaSENUenVuRlFwOTVVWVh6d21IbzEiLCJpYXQiOjE3MjA5NTkxNjIsImV4cCI6MTcyMDk2Mjc2MiwiZW1haWwiOiJrdWxkZWVwMTExdTFlcnhxc3I0M2tmQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJrdWxkZWVwMTExdTFlcnhxc3I0M2tmQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.dYOKJaiy5YAOeTwadJzza6CA1cAnGEUKO-nbm6vYtTxt04AOb7l8mBW_qbQbsuKJHJXkNljSD0EFJQica6B1EcPlgMh9TYRQtrpqQax1v8YkEsEvhph0zGg9DQSrlP1z76z-zZtOHlF8nXQpmGidVi-t0irfG3mDVUK34jNlTejVwS19FTri3f248GaN0FHTe3R-O5cQkh-_o5RrobAH53OkUhiPHBKL06qHlLgCKuVLnIt1KRRf6gRHnQe5fB8a7ChHRQ4TEI2Rb4vHDnbmkiv55qw1AR7O7-Jo-gkTIww3XgCxP3s41WlWL2paUWtUCXzmIKa8-QVOJErV43oO9Q";
 
//     const data = await getDataByToken(token);
//     console.log("Got the data", data);
//   } catch (error) {
//     console.error("Error getting data", error);
//   }
// })();
