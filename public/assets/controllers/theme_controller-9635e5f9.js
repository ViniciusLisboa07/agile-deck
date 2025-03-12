import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.switchTheme(savedTheme);
  }

  switchTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
