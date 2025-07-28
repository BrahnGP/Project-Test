function addExpenses(expenses) {
    const $list = $(".expense-list");

    let total = 0;
    let totalElement = document.querySelector(".total");
    let amount = document.querySelector(".inpAmount");
    let newValue = parseInt(amount.textContent);


    for (let i = 0; i < expenses.length; i++) {
        const dataExpenses = expenses[i];
        console.log("expenses for: " + i + " is " + dataExpenses);

        const $item = $(
            `
                <li class="expense-item">
                <span class="price"><b>Price:</b> ${dataExpenses.amount}</span> - 
                <span class="title"><b>Description:</b> ${dataExpenses.description}</span> -
                <span class="category"><b>Category:</b> ${dataExpenses.category}</span> -
                <span class="date"><b>Purchase date:</b> ${dataExpenses.date}</span>
                </li> `);

        $list.append($item);

        total += parseInt(dataExpenses.amount);
        console.log("valor de amount" + amount);
        amount.textContent = total + newValue;

    }
    console.log("valor total final " + total);
    totalElement.textContent = "Total today: $" + amount.textContent;
}

function addInformation() {
    const amountValue = document.getElementById('amount').value;
    const categoryValue = document.querySelector('#category').selectedOptions[0].text;
    const descriptionValue = document.getElementById('description').value;
    const dateValue = document.getElementById('date').value;
    var objExpenses = [{ amount: amountValue, category: categoryValue, description: descriptionValue, date: dateValue }];


    if (amountValue == '' || description == '') {
        alert("Please fill out all fields.");
    } else {
        console.log("objeto ingresado:", objExpenses);

        addExpenses(objExpenses);
    }
}

function cancelarFormulario() {
    console.log("cancelando y guardando datos...");

    const items = [];
    document.querySelectorAll(".expense-list").forEach((item) => {
        const amount = item.querySelector(".price").textContent.replace(/.*Price:\s*/, '');
        const description = item.querySelector(".title").textContent.replace(/.*Description:\s*/, '');
        const category = item.querySelector(".category").textContent.replace(/.*Category:\s*/, '');
        const date = item.querySelector(".date").textContent.replace(/.*Purchase date:\s*/, '');

        console.log(date);
        items.push({ amount, description, category, date });
    });

    localStorage.setItem("expenseItems", JSON.stringify(items));

    const totalText = document.querySelector(".total").textContent;
    const totalAmount = totalText.replace(/[^0-9.]/g, ""); // extrae el número

    localStorage.setItem("totalAmount", totalAmount);

    window.location.href = "index.html";
}

window.addEventListener("load", function () {
    const savedItems = JSON.parse(localStorage.getItem("expenseItems") || "[]");
    const savedTotal = localStorage.getItem("totalAmount") || "0.00";

    const $list = document.querySelector(".expense-list");
    const $total = document.querySelector(".total");
    const $hiddenAmount = document.querySelector(".inpAmount");
    $list.innerHTML = "";


    savedItems.forEach((item) => {
        const li = document.createElement("li");
        li.className = "expense-item";
        li.innerHTML = `
                <span class="price"><b>Price:</b> ${item.amount}</span> - 
                <span class="title"><b>Description:</b> ${item.description}</span> -
                <span class="category"><b>Category:</b> ${item.category}</span> -
                <span class="date"><b>Purchase date:</b> ${item.date}</span> 
    `;
        $list.appendChild(li);
    });

    if (savedTotal != null && savedTotal != '0.00') {
        $total.textContent = `Total today: $${savedTotal}`;
        $hiddenAmount.textContent = savedTotal;
    }
});


