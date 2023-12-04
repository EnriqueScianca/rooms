import firebase from "firebase";

const app = firebase.initializeApp({
  apiKey: "gqtM7RIe4DEqJACZWHePMfs6ZQXmy7UxggzvKPEf",
  databaseURL: "https://apx-dwf-m6-d6736-default-rtdb.firebaseio.com",
  authDomain: "apx-dwf-m6-d6736.firebaseapp.com",
});

const rtdb = firebase.database();

export { rtdb };
