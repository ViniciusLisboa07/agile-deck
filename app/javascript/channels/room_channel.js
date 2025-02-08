import consumer from "channels/consumer"
import { application } from "controllers/application"

const roomId = document.querySelector("meta[name='room-id']")?.content;

console.log("Room ID:", roomId);

if (roomId && roomId != undefined) {
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
          switch (data.action) {
            case "vote":
              controller.handleVote(data);
              break;
            case "reveal_votes":
              controller.handleRevealVotes(data);
              break;
            case "new_round":
              controller.handleNewRound(data.round);
              break;
            case "user_joined":
              controller.handleNewUser(data.user);
              break;
            default:
              console.warn("Ação não reconhecida:", data.action);
          }
        } else {
          console.error("Controlador não encontrado para o elemento:", roomElement);
        }
      }
    }
  );
} else {
  console.error("Room ID not found");
}
