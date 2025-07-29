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
        //console.log(item.income)
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

    let listFoodProgress = document.querySelector("#foodProgress");
    let listTranspotationProgress = document.querySelector("#transportationProcess");
    let listEntertaimentProgress = document.querySelector("#enterteimentProgress");
    let listOtherProgress = document.querySelector("#otherProgress");

    if (listFood.value == 0) {
        listFoodProgress.innerHTML = "0% - Negative balance"; // o un mensaje más informativo si prefieres
        console.log("paso 1")
    } else {
        listFoodProgress.innerHTML = (((budgetItemsNew[0]?.foodCategory ?? 0) / listFood.value) * 100).toFixed(2) + "% used";
    }

    if (listTranspotation.value == 0) {
        listTranspotationProgress.innerHTML = "0% Negative balance"; // o un mensaje más informativo si prefieres
    } else {
        listTranspotationProgress.innerHTML = (((budgetItemsNew[0]?.transportationCategory ?? 0) / listTranspotation.value) * 100).toFixed(2) + "% used";
    }


    if (listEntertaiment.value == 0) {
        listEntertaimentProgress.innerHTML = "0% Negative balance"; // o un mensaje más informativo si prefieres
    } else {
        listEntertaimentProgress.innerHTML = (((budgetItemsNew[0]?.enterteimentCategory ?? 0) / listEntertaiment.value) * 100).toFixed(2) + "% used";
    }

    if (listOther.value == 0) {
        listOtherProgress.innerHTML = "0% Negative balance"; // o un mensaje más informativo si prefieres
    } else {
        listOtherProgress.innerHTML = (((budgetItemsNew[0]?.otherCategory ?? 0) / listOther.value) * 100).toFixed(2) + "% used";
    }


    console.log(budgetItemsNew[0]?.foodCategory ?? 0)
    console.log(listFood.value)

    let listfoodRemaining = document.querySelector("#foodRemaining");
    let listtransportationRemaining = document.querySelector("#transportationRemaining");
    let listenterteimentRemaining = document.querySelector("#enterteimentRemaining");
    let listotherRemaining = document.querySelector("#otherRemaining");

    listfoodRemaining.innerHTML = (listFood.value - (budgetItemsNew[0]?.foodCategory ?? 0));
    listtransportationRemaining.innerHTML = (listTranspotation.value - (budgetItemsNew[0]?.transportationCategory ?? 0));
    listenterteimentRemaining.innerHTML = (listEntertaiment.value - (budgetItemsNew[0]?.enterteimentCategory ?? 0));
    listotherRemaining.innerHTML = (listOther.value - (budgetItemsNew[0]?.otherCategory ?? 0));



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