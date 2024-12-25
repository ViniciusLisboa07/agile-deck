import consumer from "./consumer"

consumer.subscriptions.create(
  { channel: "RoomChannel", room_id: roomId },
  {
    received(data) {
      const controller = Stimulus.getControllerForElement(document.querySelector("[data-controller='voting']"));
      controller.receiveVote(data);
    },
  }
);
