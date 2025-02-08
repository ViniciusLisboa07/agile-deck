import { Controller } from "@hotwired/stimulus";

import confetti from "canvas-confetti";

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
    let countdown = 3;

    countdownElement.textContent = `Revelando votos em ${countdown}...`;
    const interval = setInterval(() => {
      countdown -= 1;
      if (countdown > 0) {
        countdownElement.textContent = `Revelando votos em ${countdown}...`;
      } else {
        clearInterval(interval);
        this.showVotes(votes);
        this.launchConfetti();
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
  
  launchConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }
  
  replaceRevealButtonWithNewRoundButton() {
    const revealVotesButton = document.querySelector('#reveal-votes-button');
    const newRoundButton = document.querySelector('#new-round-button');
    const countdownElement = document.querySelector('[data-voting-target="countdown"]');

    countdownElement.classList.add("hidden");
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
        
      } else {
        console.error("Failed to create a new round");
      }
    });
  }

  handleNewRound(round) {
    location.reload();
    // console.log("Handling new round:", round);

    // console.log(this.element)
    // this.element.dataset.roundId = round.id;
  }

  handleNewUser(user) {
    const userListContainer = document.querySelector(".user-list");
    if (!userListContainer) return;
  
    const randomX = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
    const randomY = Math.floor(Math.random() * (90 - 10 + 1)) + 10;
  
    const userElement = document.createElement("div");
    userElement.setAttribute("data-user-id", `user-${user.id}`);
    userElement.className = "flex flex-col items-center text-center transition-transform duration-500 p-4";
    userElement.style.top = `${randomY}%`;
    userElement.style.left = `${randomX}%`;
  
    userElement.innerHTML = `
      <div class="card w-16 h-24 bg-blue-500 text-white items-center text-center justify-center rounded-lg p-4 shadow-xl">
        <p class="text-lg font-bold" id="vote-value-${user.name}">?</p>
      </div>
      <p class="text-xs font-medium text-gray-800">${user.name}</p>
    `;
  
    userListContainer.appendChild(userElement);
  }
}
