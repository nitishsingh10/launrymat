let btn = document.querySelectorAll("#addItem");
let bill = document.getElementById("bill-body");
let plc = document.getElementById("placement");
let totalamt = document.getElementById("totalamt")
let cart = [];
let total = 0;

let submit = document.getElementById("submit");

let inputs = document.querySelectorAll("#personal-details input");
inputs.forEach((input) => {
    input.addEventListener("input", () => {
        let allFilled = Array.from(inputs).every((input) => input.value.trim() !== "");
        submit.disabled = !allFilled;
    });
});

btn.forEach((element)=>{
    element.addEventListener('click',()=>{
        let serviceName = element.parentElement.firstChild.nextSibling.textContent;
        let servicePrice = element.parentElement.firstChild.nextSibling.getAttribute("price");
        serviceName = serviceName.trim().split("·")[0].trim();
        cart.push({name: serviceName, price: servicePrice});
        plc.style.display = "none";
        total = total + parseFloat(servicePrice);
        updateCart();

    });
})

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

        totalamt.innerText = `₹${total}`
    });
}
