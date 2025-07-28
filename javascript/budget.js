function budget() {
    const incomeValue = document.getElementById('income').value;
    const foodValue = document.getElementById('food-input').value;
    const transportationValue = document.getElementById('transportation-input').value;
    const enterteimentValue = document.getElementById('enterteiment-input').value;
    const otherValue = document.getElementById('other-input').value;
    var objExpenses = [{ income: incomeValue, food: foodValue, transportation: transportationValue, enterteiment: enterteimentValue, other: otherValue }];

    if (incomeValue == '' || foodValue == '' || transportationValue == '' || enterteimentValue == '' || otherValue == '') {
        alert("Please fill out all fields.");
    } else {
        console.log("objeto ingresado:", objExpenses);
        addBudget(objExpenses);
    }
}

function addBudget(objBudget) {
    console.log("my obj budget in budget.html is " + JSON.stringify(objBudget));
    localStorage.setItem("budgetItems", JSON.stringify(objBudget));
    window.location.href = "index.html";
}

window.addEventListener("load", function () {
    const budgetItems = JSON.parse(localStorage.getItem("budgetItems") || "[]");
    console.log("budget memory item" + budgetItems);
    let listBudget = document.querySelector("#income");
    let listFood = document.querySelector("#food-input");
    let listTranspotation = document.querySelector("#transportation-input");
    let listEntertaiment = document.querySelector("#enterteiment-input");
    let listOther = document.querySelector("#other-input");


    budgetItems.forEach((item) => {
        console.log(item.income)
        listBudget.value = item.income;
        listFood.value = item.food;
        listTranspotation.value = item.transportation;
        listEntertaiment.value = item.enterteiment;
        listOther.value = item.other;
    });

    const budgetItemsNew = JSON.parse(localStorage.getItem("budgetStatus") || "[]");



    let listFoodSpend = document.querySelector("#foodSpend");
    let listTranspotationSpend = document.querySelector("#transportationSpend");
    let listEntertaimentSpend = document.querySelector("#enterteimentSpend");
    let listOtherSpend = document.querySelector("#otherSpend");

    listFoodSpend.innerHTML = budgetItemsNew[0]?.foodCategory ?? 0;
    listTranspotationSpend.innerHTML = budgetItemsNew[0]?.transportationCategory ?? 0;
    listEntertaimentSpend.innerHTML = budgetItemsNew[0]?.enterteimentCategory ?? 0;
    listOtherSpend.innerHTML = budgetItemsNew[0]?.otherCategory ?? 0;


});

function reset() {
    let incomeValue = document.querySelector("#income");
    let foodValue = document.querySelector("#food-input");
    let transportationValue = document.querySelector("#transportation-input");
    let enterteimentValue = document.querySelector("#enterteiment-input");
    let otherValue = document.querySelector("#other-input");

    incomeValue.value = '0';
    foodValue.value = '0';
    transportationValue.value = '0';
    enterteimentValue.value = '0';
    otherValue.value = '0';
}