window.addEventListener("load", function () {

    // expenses onload 

    const savedItems = JSON.parse(localStorage.getItem("expenseItems") || "[]");

    const budgetItems = JSON.parse(localStorage.getItem("budgetItems") || "[]");
    console.log(budgetItems);

    const $list = document.querySelector(".expense-list");
    $list.innerHTML = "";

    const $listCategory = document.querySelector(".category-status-list");
    $listCategory.innerHTML = "";

    // rendering category
    // Primero agrupamos montos por categoría
    const categoryTotals = {};

    savedItems.forEach((item) => {
        const category = item.category;
        const amount = parseFloat(item.amount) || 0;

        categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    });

    // Limpiamos el UL para evitar duplicados
    $listCategory.innerHTML = "";




    console.log("list expenses" + $list);

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

        //quick budget status
        const liBudget = document.createElement("li");
        li.className = "budget-item";

        console.log("item category " + item.category);


        if (item.category == "Food & Dining") {
            const foodBudget = budgetItems[0]?.food ?? 500;
            const percentage = (item.amount / foodBudget) * 100;
            const statusText = percentage < 100 ? "✅ On track" : "⚠️ Over budget!";

            liBudget.innerHTML = `
            <li class="category-status-item">
                <span class="icon">🍕 <b>Food & Dining:</b> </span>
                ${item.category}: 
                <span class="amount" id="food-span" data-cat="food">
                ${item.amount}/$${foodBudget}
                </span>
                <span class="state ${percentage < 100 ? 'ok' : 'alert'}">${statusText}</span>
            </li>`;


        }

        if (item.category == "Transportation") {
            const transportationBudget = budgetItems[0]?.transportation ?? 500;
            const percentage = (item.amount / transportationBudget) * 100;
            const statusText = percentage < 100 ? "✅ On track" : "⚠️ Over budget!";


            liBudget.innerHTML = `
            <li class="category-status-item">
                <span class="icon">🚌 <b>Transportation:</b> </span>
                ${item.category}: 
                <span class="amount" id="transportation-span" data-cat="transportation">
                ${item.amount}/$${transportationBudget}
                </span>
                <span class="state ${percentage < 100 ? 'ok' : 'alert'}">${statusText}</span>
            </li>`;
        }


        if (item.category == "Entertainment") {
            const enterteimentBudget = budgetItems[0]?.enterteiment ?? 500;
            const percentage = (item.amount / enterteimentBudget) * 100;
            const statusText = percentage < 100 ? "✅ On track" : "⚠️ Over budget!";


            liBudget.innerHTML = `
            <li class="category-status-item">
                <span class="icon">🎮 <b>Enterteiment:</b> </span>
                ${item.category}: 
                <span class="amount" id="enterteiment-span" data-cat="enterteiment">
                ${item.amount}/$${enterteimentBudget}
                </span>
                <span class="state ${percentage < 100 ? 'ok' : 'alert'}">${statusText}</span>
            </li>`;
        }

        if (item.category == "Other") {

            const otherBudget = budgetItems[0]?.enterteiment ?? 500;
            const percentage = (item.amount / otherBudget) * 100;
            const statusText = percentage < 100 ? "✅ On track" : "⚠️ Over budget!";


            liBudget.innerHTML = `
            <li class="category-status-item">
                <span class="icon">🚌🎮 <b>Other:</b> </span>
                ${item.category}: 
                <span class="amount" id="other-span" data-cat="other">
                ${item.amount}/$${otherBudget}
                </span>
                <span class="state ${percentage < 100 ? 'ok' : 'alert'}">${statusText}</span>
            </li>`;
        }

        //1
        //$listCategory.appendChild(liBudget);
    });

    // group by items 
    for (const category in categoryTotals) {
        const liBudget = document.createElement("li");
        liBudget.className = "category-status-item";

        let icon = "📦";
        let defaultBudget = 500;

        switch (category) {
            case "Food & Dining":
                icon = "🍕";
                defaultBudget = budgetItems[0]?.food ?? 500;
                break;
            case "Transportation":
                icon = "🚌";
                defaultBudget = budgetItems[0]?.transportation ?? 500;
                break;
            case "Entertainment":
                icon = "🎮";
                defaultBudget = budgetItems[0]?.enterteiment ?? 500;
                break;
            case "Other":
                icon = "📦";
                defaultBudget = budgetItems[0]?.other ?? 500;
                break;
        }


        let newObjetCategory = [{
            foodCategory: categoryTotals["Food & Dining"],
            transportationCategory: categoryTotals["Transportation"],
            enterteimentCategory: categoryTotals["Entertainment"],
            otherCategory: categoryTotals["Other"]
        }];

        localStorage.setItem("budgetStatus", JSON.stringify(newObjetCategory));


        const total = categoryTotals[category];

        console.log("el valor por budget status : " + total);

        const percentage = (total / defaultBudget) * 100;
        const statusText = percentage < 100 ? "✅ On track" : "⚠️ Over budget!";
        const statusClass = percentage < 100 ? "ok" : "alert";

        liBudget.innerHTML = `
            <span class="icon">${icon} <b>${category}:</b></span>
            <span class="amount" data-cat="${category.toLowerCase().replace(/\s+/g, '-')}">
            $${total}/$${defaultBudget}
            </span>
            <span class="state ${statusClass}">${statusText}</span>
            `;
        //2
        $listCategory.appendChild(liBudget);


    }



    // index.html
    const savedTotal = localStorage.getItem("totalAmount") || "0.00";
    console.log("object budget " + savedTotal);

    let currentBalanceEl = document.querySelector("#current-balance");


    let initialBalanceEl = document.querySelector("#initial-balance");
    initialBalanceEl.textContent = 2400;




    let currentBalanceInt = budgetItems[0]?.income ?? 2400;
    let spentAmount = parseFloat(savedTotal) || 0;

    console.log("current balance" + currentBalanceInt + "spentAmount " + spentAmount)

    let updatedBalance = initialBalanceEl.textContent - spentAmount;
    currentBalanceEl.textContent = updatedBalance;
    console.log("my current balance is " + currentBalanceInt);


    let amount = document.querySelector(".monthly-spend");
    let progress = document.querySelector("#progress-text");

    let monthlyBudget = budgetItems[0]?.monthlyBudget ?? 500;

    console.log("saved " + savedTotal)
    console.log("current" + currentBalanceInt)

    if (currentBalanceInt == 0) {
        progress.textContent = "0% Negative balance"; // o un mensaje más informativo si prefieres
        console.log("paso 1")
    } else {
        progress.textContent = ((savedTotal / currentBalanceInt) * 100).toFixed(2) + "% used";
         console.log("paso 2")
    }
    amount.textContent = "This Month: Spent: $" + savedTotal + " / Budget: " + currentBalanceInt;

    console.log("saved " + savedTotal + " current balance " + currentBalanceInt);
});
