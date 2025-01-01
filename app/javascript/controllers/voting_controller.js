import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card", "results"];

  connect() {
    console.log("VotingController connected", this.element);
  }

  selectCard(event) {
    console.log("Card selected", event.currentTarget.dataset.card);
    const cardValue = event.currentTarget.dataset.card;
    const roundId = event.currentTarget.dataset.roundId;
  
    const allCards = this.element.querySelectorAll(".btn.card");
    console.log(allCards);
    allCards.forEach((card) => {
      card.classList.add("disabled");
    });
  
    event.currentTarget.classList.remove("disabled");
  
    fetch(`/rounds/${roundId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
      body: JSON.stringify({ value: cardValue }),
    });
  }

  receiveVote(data) {
    const { user_id, value } = data;
  
    console.log("Received vote:", user_id, value);
  
    const userElement = document.querySelector(`[data-user-id="user-${user_id}"]`)?.firstElementChild;
  
    if (userElement) {
      userElement.classList.remove("bg-blue-500");
      userElement.classList.add("bg-green-500");
    } else {
      console.warn(`User with ID ${user_id} not found`);
    }
  }
  
}
