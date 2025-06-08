const userContainer = document.getElementById("userContainer");
const errorDiv = document.getElementById("error");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  userContainer.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.suite}, ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(card);
    });

  } catch (error) {
    errorDiv.textContent = `⚠️ Unable to load user data. ${error.message}`;
  }
}

// Initial fetch
fetchUsers();

// Reload button
reloadBtn.addEventListener("click", fetchUsers);
