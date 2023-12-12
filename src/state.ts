const API_BASE_URL = "http://www.localhost:3000";
import { userInfo } from "os";
import { rtdb } from "./rtdb";
import { map } from "lodash";

const state = {
  data: {
    fullName: "",
    email: "",
    userId: "",
    roomId: "",
    rtdbRoomId: "",
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

  listenRoom() {
    const cs = this.getState();
    const chatroomsRef = rtdb.ref("/rooms/" + cs.rtdbRoomId);
    // const currentState = this.getState();
    // console.log(currentState);
    chatroomsRef.on("value", (snapshot) => {
      const messagesFromServer = snapshot.val();
      const messagesList = map(messagesFromServer.messages);
      cs.messages = messagesList;
      this.setState(cs);
    });
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

  signIn(callback) {
    const cs = this.getState();
    if (cs.email) {
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: cs.email }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No hay un email en el state");
    }
  },

  askNewRoom(callback?) {
    const cs = this.getState();
    if (cs.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userId: cs.userId }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          if (callback) {
            callback();
          }
        });
    } else {
      console.error("No hay userId");
    }
  },
  accesToRoom(callback?) {
    const cs = this.getState();
    const roomId = cs.roomId;
    fetch(API_BASE_URL + "/rooms/" + roomId + "?userId=" + cs.userId)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        cs.rtdbRoomId = data.rtdbRoomId;
        this.setState(cs);
        this.listenRoom();
        if (callback) {
          callback();
        }
      });
  },

  subscribe(callback: (any) => any) {
    this.listeners.push(callback);
  },
};

export { state };
