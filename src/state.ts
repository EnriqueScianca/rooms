const API_BASE_URL = "http://www.localhost:3000";
import { rtdb } from "./rtdb";
import { map } from "lodash";

const state = {
  data: {
    fullName: "quique",
    email: "",
    messages: [],
  },
  listeners: [],
  getState() {
    return this.data;
  },

  init() {
    // const chatroomsRef = rtdb.ref("/chatrooms/general");
    // const currentState = this.getState();
    // console.log(currentState);
    // chatroomsRef.on("value", (snapshot) => {
    //   const messagesFromServer = snapshot.val();
    //   const messagesList = map(messagesFromServer.messages);
    //   currentState.messages = messagesList;
    //   this.setState(currentState);
    // });
  },

  setNombre(nombre: string) {
    const currentState = this.getState();
    currentState.nombre = nombre;
    this.setState(currentState);
  },

  pushMessage(message: string) {
    const nombreDelState = this.data.nombre;
    fetch(API_BASE_URL + "/messages", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        nombre: nombreDelState,
        from: message,
      }),
    });
  },

  setEmailAndFullName(email: string, fullName: string) {
    const cs = this.getState();
    cs.email = email;
    cs.fullName = fullName;
    this.setState(cs);
  },

  setState(newState) {
    this.data = newState;
    for (const cb of this.listeners) {
      cb();
    }
    console.log("Soy el state, he cambiado", this.data);
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
