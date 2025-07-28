window.addEventListener("load", function () {

    // expenses onload 

    const savedItems = JSON.parse(localStorage.getItem("expenseItems") || "[]");

    const $list = document.querySelector(".expense-list");
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

    // index.html
    const savedTotal = localStorage.getItem("totalAmount") || "0.00";
    let amount = document.querySelector(".monthly-spend");
    let currentBalance = document.querySelector("#current-balance").textContent;
    let progress = document.querySelector("#progress-text");


    console.log(currentBalance);

    amount.textContent = "This Month: Spent: $" + savedTotal + " / Budget: " + currentBalance;
    progress.textContent = ((savedTotal / currentBalance) * 100).toFixed(2) + "% used";

    console.log("saved " + (savedTotal) + "currentbalance " + parseInt(currentBalance));
    console.log(savedTotal);

});
