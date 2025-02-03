// dropdown menu JS
const burgerMenu = document.getElementById("burger-menu");
const dropdownMenu = document.querySelector(".dropdown-menu");

burgerMenu.addEventListener("click", () => {
  dropdownMenu.style.display =
    dropdownMenu.style.display === "block" ? "none" : "block";
});

/* Contact form JS */
const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const surNameError = document.getElementById("surNameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

const nameRegex = /^[a-zA-Z\s]*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", (event) => {
  let valid = true;

  // Reset error messages and input styles
  nameError.textContent = "";
  surNameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  nameInput.style.border = "";
  surnameInput.style.border = "";
  emailInput.style.border = "";
  messageInput.style.border = "";

  // Name validation
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    nameInput.style.border = "5px solid red";
    valid = false;
  } else if (!nameRegex.test(nameInput.value)) {
    nameError.textContent = "Name can only contain letters and spaces.";
    nameInput.style.border = "5px solid red";
    valid = false;
  } else {
    nameInput.style.border = "5px solid green";
  }
  // Surnname validation
  if (surnameInput.value.trim() === "") {
    surNameError.textContent = "Surname is required.";
    surnameInput.style.border = "5px solid red";
    valid = false;
  } else if (!nameRegex.test(nameInput.value)) {
    surNameError.textContent = "Name can only contain letters and spaces.";
    surnameInput.style.border = "5px solid red";
    valid = false;
  } else {
    surnameInput.style.border = "5px solid green";
  }

  // Email validation
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    emailInput.style.border = "5px solid red";
    valid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Invalid email format.";
    emailInput.style.border = "5px solid red";
    valid = false;
  } else {
    emailInput.style.border = "5px solid green";
  }

  // Message validation
  if (messageInput.value.trim() === "") {
    messageError.textContent = "Message is required.";
    messageInput.style.border = "5px solid red";
    valid = false;
  } else {
    messageInput.style.border = "5px solid green";
  }

  if (!valid) {
    event.preventDefault();
  } else {
    alert("Form submitted successfully!");
    form.reset(); // Clear the form
    nameInput.style.border = "";
    emailInput.style.border = "";
    messageInput.style.border = "";
  }
});

// adding header bg on scroll JS
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  const navBar = document.querySelector(".nav-bar");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 0) {
    header.classList.add("fixed-header");
    navBar.style.backgroundColor = "black";
  } else {
    header.classList.remove("fixed-header");
    navBar.style.backgroundColor = "var(--primary-red)";
  }
});

/* api in js */
const teamDriverMapping = {
  "Red Bull Racing": ["Max Verstappen", "Sergio Pérez"],
  "Mercedes-AMG Petronas": ["Lewis Hamilton", "George Russell"],
  "Scuderia Ferrari": ["Charles Leclerc", "Carlos Sainz"],
  "McLaren Racing": ["Lando Norris", "Oscar Piastri"],
  "Aston Martin": ["Fernando Alonso", "Lance Stroll"],
  "Alpine F1 Team": ["Esteban Ocon", "Pierre Gasly"],
  "alpha-tauri": ["Yuki Tsunoda", "Daniel Ricciardo"],
  "Haas F1 Team": ["Kevin Magnussen", "Nico Hülkenberg"],
  "Williams Racing": ["Alexander Albon", "Logan Sargeant"],
  "Alfa Romeo": ["Valtteri Bottas", "Guanyu Zhou"],
};

async function fetchDriverData() {
  try {
    const response = await fetch(
      "https://ergast.com/api/f1/current/driverStandings.json"
    );
    const data = await response.json();

    const standings =
      data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    Object.keys(teamDriverMapping).forEach((teamName) => {
      const teamId = teamName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-");
      const teamElement = document.getElementById(teamId);

      if (teamElement) {
        const driversContainer = teamElement.querySelector(".drivers");
        const teamDrivers = teamDriverMapping[teamName];

        teamDrivers.forEach((driverName) => {
          const driverData = standings.find(
            (driver) =>
              `${driver.Driver.givenName} ${driver.Driver.familyName}` ===
              driverName
          );

          if (driverData) {
            const driverCard = document.createElement("div");
            driverCard.classList.add("driver-card");
            driverCard.innerHTML = `
          <p><strong>${driverData.Driver.givenName} ${
              driverData.Driver.familyName
            }</strong></p>
          <p>Number: ${driverData.Driver.permanentNumber || "N/A"}</p>
          <p>Points: ${driverData.points}</p>
          <p>Position: ${driverData.position}</p>
        `;
            driversContainer.appendChild(driverCard);
          }
        });
      }
    });
  } catch (error) {
    console.error("Error fetching driver data:", error);
  }
}

fetchDriverData();

/* cookies */
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); 
  const expires = "expires=" + date.toUTCString();
  document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Function to get a cookie by name
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
      const [key, value] = cookie.split("=");
      if (key === name) return value;
  }
  return null;
}

document.addEventListener("DOMContentLoaded", () => {
    const cookieNotification = document.getElementById("cookie-notification");
    const acceptButton = document.getElementById("accept-cookies");

    cookieNotification.classList.add("show");
    cookieNotification.classList.remove("hidden");

    acceptButton.addEventListener("click", () => {
        cookieNotification.classList.remove("show");
        setTimeout(() => {
            cookieNotification.style.display = "none"; 
        }, 500);
    });
});
