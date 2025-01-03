import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["card", "results", "countdown"];

  connect() {
    console.log("VotingController connected", this.element);
  }

  selectCard(event) {
    const cardValue = event.currentTarget.dataset.card;
    const roundId = event.currentTarget.dataset.roundId;

    const allCards = this.element.querySelectorAll(".btn.card");
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

  revealVotes(event) {
    const roundId = event.currentTarget.dataset.roundId;
  
    fetch(`/rounds/${roundId}/reveal_votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
    });
  }

  handleVote(data) {
    const { user_id, value } = data;
    const userElement = document.querySelector(`[data-user-id="user-${user_id}"]`)?.firstElementChild;

    if (userElement) {
      userElement.classList.remove("bg-blue-500");
      userElement.classList.add("bg-green-500");
    } else {
      console.warn(`User with ID ${user_id} not found`);
    }
  }

  handleRevealVotes(data) {
    const votes = data.votes;
    this.startCountdown(votes);
  }

  startCountdown(votes) {
    const countdownElement = document.querySelector('[data-voting-target="countdown"]');
    console.log("------ countdown")
    console.log(countdownElement)
    let countdown = 3;

    countdownElement.textContent = `Revealing in ${countdown}...`;
    const interval = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        countdownElement.textContent = `Revealing in ${countdown}...`;
      } else {
        clearInterval(interval);
        this.showVotes(votes);
        this.replaceRevealButtonWithNewRoundButton();
      }
    }, 1000);
  }

  showVotes(votes) {
    votes.forEach(({ user_id, user_name, value }) => {
      const userElement = document.querySelector(`[data-user-id="user-${user_id}"]`)?.firstElementChild;
      userElement.classList.remove("bg-green-500");
      userElement.classList.add("bg-blue-500");

      let voteValue = userElement.firstElementChild;
      
      voteValue.textContent = `${value}`;
    });
  }
  
  replaceRevealButtonWithNewRoundButton() {
    const revealVotesButton = document.querySelector('#reveal-votes-button');
    const newRoundButton = document.querySelector('#new-round-button');

    revealVotesButton.classList.add("hidden");
    newRoundButton.classList.remove("hidden");
  }

  startNewRound() {
    const roomId = this.element.dataset.roomId;
    fetch(`/rooms/${roomId}/new_round`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
    }).then((response) => {
      if (response.ok) {
        // const newRoundButton = document.querySelector('#new-round-button');3
        // const revealVotesButton = document.querySelector('#reveal-votes-button');

        // newRoundButton.classList.add("hidden");
        // revealVotesButton.classList.remove("hidden");
        // 
        location.reload();
      } else {
        console.error("Failed to create a new round");
      }
    });
  }

  // handleNewRound(round) {
  //   console.log("Handling new round:", round);

  //   console.log(this.element)
  //   this.element.dataset.roundId = round.id;
  // }
}
