import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card", "results"];

  connect() {
    console.log("VotingController connected");
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
    const { user_id, value } = data;

    // Atualizar a interface para mostrar o voto recebido
    this.resultsTarget.innerHTML += `<p>Usuário ${user_id} votou: ${value}</p>`;
  }
}
