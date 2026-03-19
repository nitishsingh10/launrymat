let btn = document.querySelectorAll("#addItem");
let bill = document.getElementById("bill-body");
let plc = document.getElementById("placement");
let totalamt = document.getElementById("totalamt");
let cart = [];
let total = 0;
let submit = document.getElementById("submit");
let warning = document.getElementById("warning");

let inputs = document.querySelectorAll("#personal-details input");
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        let allFilled = Array.from(inputs).every((input) => input.value.trim() !== "");
        submit.disabled = !allFilled;
    });
});

btn.forEach((element) => {
    element.addEventListener('click', () => {
        let serviceName = element.parentElement.firstChild.nextSibling.textContent;
        let servicePrice = element.parentElement.firstChild.nextSibling.getAttribute("price");
        serviceName = serviceName.trim().split("·")[0].trim();

        const isInCart = element.classList.contains("rm-button");

        if (!isInCart) {
            cart.push({ name: serviceName, price: servicePrice });
            total = total + parseFloat(servicePrice);
            element.textContent = "Remove Item";
            element.classList.remove("first");
            element.classList.add("rm-button");
            plc.style.display = "none";
        } else {
            const idx = cart.findIndex(item => item.name === serviceName);
            if (idx !== -1) {
                total = total - parseFloat(cart[idx].price);
                cart.splice(idx, 1);
            }
            element.textContent = "Add Service";
            element.classList.remove("rm-button");
            element.classList.add("first");

            if (cart.length === 0) {
                plc.style.display = "flex";
            }
        }

        updateCart();
    });
});

function updateCart() {
    bill.innerHTML = "";

    cart.forEach((item, index) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>₹ ${item.price}</td>
        `;
        bill.appendChild(row);
    });

    totalamt.innerText = `₹${total.toFixed(2)}`;
}

submit.addEventListener("click", () => {

    let fullName = document.getElementById("fullname").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    if (cart.length > 0) {
        alert(`Booking confirmed for ${fullName}!\nEmail: ${email}\nPhone: ${phone}\nTotal Amount: ₹${total.toFixed(2)}`);
        cart = [];
        total = 0;
        bill.innerHTML = "";
        totalamt.innerText = "₹0";
        inputs.forEach((input) => (input.value = ""));
    } else {
        warning.style.display = "block";
        warning.innerText = "Please add services to the cart before booking.";
    }
});
