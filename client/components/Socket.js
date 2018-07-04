import io from "socket.io-client";

import Config from "./Config.js";

const socket = null;

const Socket = {
  initiate: (userName, cb) => {
    socket = io(Config.server);

    socket.on("connect", () => {
      socket.emit("initiate", { userName: userName });
    });

    socket.on("updateBoard", data => {
      cb("updateBoard", data);
    });

    socket.on("symbolAssigned", data => {
      cb("symbolAssigned", data);
    });

    socket.on("acknowledgement", data => {
      cb("acknowledgement", data);
    });

    socket.on("invite", data => {
      cb("inviteReceived", data);
    });

    socket.on("inviteResponse", data => {
      cb("inviteResponse", data);
    });

    socket.on("leaveRoom", data => {
      cb("leaveRoom", data);
    });
  },

  sendData: (channel, data) => {
    socket.emit(channel, data);
  }
};

export default Socket;
