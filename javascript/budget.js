function budget() {
    const incomeValue = document.getElementById('income').value;
    var objExpenses = [{ income: incomeValue }];

    if (incomeValue == '') {
        alert("Please fill out all fields.");
    } else {
        console.log("objeto ingresado:", objExpenses);
         addBudget(objExpenses);
    }
}

function addBudget(objBudget) {
    localStorage.setItem("budgetItems", JSON.stringify(objBudget));
    window.location.href = "index.html";
}