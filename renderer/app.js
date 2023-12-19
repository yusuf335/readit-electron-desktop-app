const { ipcRenderer } = require("electron");

// Dom Node
let showModal = document.getElementById("show-modal"),
  closeModal = document.getElementById("close-modal"),
  modal = document.getElementById("modal"),
  addItem = document.getElementById("add-item"),
  intemUrl = document.getElementById("url");

// Diable and enabble modal buttons
const toggleModalButtons = () => {
  // Check state
  if (addItem.disabled === true) {
    addItem.disabled = false;
    addItem.style.opacity = 1;
    addItem.innerText = "Add Item";
    closeModal.style.display = "inline";
  } else {
    addItem.disabled = true;
    addItem.style.opacity = 0.5;
    addItem.innerText = "Adding";
    closeModal.style.display = "none";
  }
};

// Show modal
showModal.addEventListener("click", (e) => {
  modal.style.display = "flex";
  intemUrl.focus();
});

// close modal
closeModal.addEventListener("click", (e) => {
  modal.style.display = "none";
});

// Handle new item
addItem.addEventListener("click", (e) => {
  // Check a url exist
  if (intemUrl.value) {
    // Send new item url to main
    ipcRenderer.send("new-item", intemUrl.value);

    // Disable button
    toggleModalButtons();
  }
});

// Listen for new item from process
ipcRenderer.on("new-item-success", (e, newItem) => {
  console.log(newItem);

  // Enable button
  toggleModalButtons();

  // Hide modal and clear value
  modal.style.display = "none";
  intemUrl.value = "";
});

// Listen for keyboard
intemUrl.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addItem.click();
  }
});
