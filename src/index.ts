import { state } from "./state";

(function () {
  state.init();
  state.setEmailAndFullName("asd@asd.com", "asd");
  state.signIn((err) => {
    if (err) {
      console.error("Hubo un error en el signIn");
    }
    state.askNewRoom(() => {
      state.accesToRoom();
    });
  });

  // Al comenzar
  // state.init();
  //  Recupera el state del localStorage
  // const cs = state.getState();
  // if (cs.rtdbRoomId && cs.userId) {
  // Hacer un router.push a /chat
  // }
})();
