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
    
    console.log(event.currentTarget.dataset)
    console.log(this.data)
    
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
    console.log("asdasdasdqweqwe")
    console.log(data)
    const { user_id, value } = data;

    let voteElement = document.querySelector(`[data-voting-target="results"]`).textContent = `Usuário ${user_id}: ${value}`;

    console.log("Received vote:", user_id, value);
  }
}
