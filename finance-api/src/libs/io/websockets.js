const EVENTS = {
  CONNECTION: "connection",
  DISCONNECT: "disconnect",
  TO_NEW_TRIP: "to_new_trip",
  FROM_NEW_TRIP: "from_new_trip",
  TO_REMOVED_TRIP: "to_removed_trip",
  FROM_REMOVED_TRIP: "from_removed_trip",
  CREATE_ROOM: "create_room",
  LEAVE_ROOM: "leave_room",
  TO_ROOM: "to_room",
};

const websockets = (io) => {
  io.on(EVENTS.CONNECTION, (socket) => {
    console.log("New client connected");

    socket.on(EVENTS.TO_NEW_TRIP, (payload) => {
      socket.emit(EVENTS.FROM_NEW_TRIP, payload);
    });

    socket.on(EVENTS.TO_REMOVED_TRIP, (payload) => {
      socket.broadcast.emit(EVENTS.FROM_REMOVED_TRIP, payload);
    });

    socket.on(EVENTS.CREATE_ROOM, (roomToCreate) => {
      socket.join(roomToCreate);
      socket.on(EVENTS.TO_ROOM, (data) => {
          socket.broadcast.to(roomToCreate).emit(EVENTS.TO_ROOM, data);
      });
    });

    socket.on(EVENTS.LEAVE_ROOM, (roomToLeave) => {
      socket.leave(roomToLeave);
      socket.off(EVENTS.TO_ROOM);
    });

    socket.on(EVENTS.DISCONNECT, () => {
      console.log("Client disconnected");
    });
  });
};
module.exports = websockets;
