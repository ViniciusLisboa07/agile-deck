import consumer from "channels/consumer"
import { application } from "controllers/application"

const roomId = document.querySelector("meta[name='room-id']")?.content;

console.log("Room ID:", roomId);

if (roomId) {
  consumer.subscriptions.create(
    { channel: "RoomChannel", room_id: roomId },
    {
      connected() {
        console.log("Connected to RoomChannel");
      },
      disconnected() {
        console.log("Disconnected from RoomChannel");
      },
      received(data) {
        console.log("Received data:", data);
        const roomElement = document.querySelector("[data-controller='voting']");
        const controller = application.controllers.find(ctrl => ctrl.element === roomElement);
      
        if (controller) {
          controller.receiveVote(data);
        } else {
          console.error("Controlador não encontrado para o elemento:", roomElement);
        }
      },
    }
  );
} else {
  console.error("Room ID not found");
}
