document.addEventListener("DOMContentLoaded", () => {
    fetchGadgets();
});

function fetchGadgets() {
    fetch("http://localhost:3000/gadgets") // Change this to your actual API URL
        .then(response => response.json())
        .then(gadgets => {
            const container = document.getElementById("gadget-container");
            container.innerHTML = ""; // Clear existing content

            gadgets.forEach(gadget => {
                const card = document.createElement("div");
                card.classList.add("gadget-card");

                card.innerHTML = `
                    <img src="${gadget.image}" alt="${gadget.name}">
                    <h3>${gadget.name}</h3>
                    <p>Likes: <span id="likes-${gadget.id}">${gadget.likes}</span></p>
                    <button onclick="likeGadget(${gadget.id})">❤️ Like</button>
                    <button onclick="addToWishlist(${gadget.id})">📌 Wishlist</button>
                `;

                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error fetching gadgets:", error));
}

function likeGadget(id) {
    const likesSpan = document.getElementById(`likes-${id}`);
    let newLikes = parseInt(likesSpan.textContent) + 1;

    fetch(`http://localhost:3000/gadgets/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: newLikes })
    })
    .then(() => {
        likesSpan.textContent = newLikes;
    })
    .catch(error => console.error("Error updating likes:", error));
}

function addToWishlist(id) {
    fetch(`http://localhost:3000/gadgets/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ wishlisted: true })
    })
    .then(() => {
        alert("Added to wishlist!");
    })
    .catch(error => console.error("Error adding to wishlist:", error));
}
