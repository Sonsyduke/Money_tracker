const dateElement = document.querySelector(".date");
const form = document.querySelector(".form");
const nameInput = document.querySelector("#nameInput");
const amountInput = document.querySelector("#amount");
const radioOptions = document.querySelectorAll("input[name='option']");
const submitBtn = document.querySelector("#submit-btn");
const personName = document.querySelector(".name");
const personAmount = document.querySelector(".amount");
const loansContainer = document.querySelector(".loans");
const itemsContainer = document.querySelector(".items");
const columnPerson = document.querySelector(".column");
const totalAmountForLoans = document.querySelector(".amountLoans");
const totalAmountForItems = document.querySelector(".amountItems");

let loanNumbers = [];
const itemNumbers = [];

// Get the current date and display it in the nav
const today = new Date();
const currentDate = `${today.getFullYear()}/${
  today.getMonth() + 1
}/${+today.getDate()}`;
dateElement.textContent = currentDate;

form.addEventListener("submit", submittingForm);

// Create an object from the form data
function submittingForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const formDataObj = Object.fromEntries(formData.entries());
  addPerson(formDataObj);
  nameInput.value = "";
  amountInput.value = "";
  radioOptions[0].checked = false;
  radioOptions[1].checked = false;
}

loansContainer.addEventListener("click", function (e) {
  const item = e.target;
  // DELETE PERSON
  deletePerson(item);
  // COMPLETE
  completePerson(item);
});
itemsContainer.addEventListener("click", function (e) {
  const item = e.target;
  // DELETE PERSON
  deletePerson(item);
  // COMPLETE
  completePerson(item);
});

function deletePerson(item) {
  if (item.classList[3] === "remove") {
    const buttons = item.parentElement;
    const personInfo = buttons.parentElement;
    const personContainer = personInfo.parentElement;
    personContainer.remove();
  }
}

function completePerson(item) {
  if (item.classList[3] === "checkmark") {
    const buttons = item.parentElement;
    const personInfo = buttons.parentElement;
    const personContainer = personInfo.parentElement;
    personContainer.classList.toggle("complete");
    if (personContainer.classList.contains("complete")) {
      console.log("Complete if statement");
      let amount = personInfo.childNodes[0].textContent;
      amount = Number(amount.substring(1, amount.indexOf(".")));
      let amountIndex = loanNumbers.indexOf(amount);
      loanNumbers.splice(amountIndex, 1);

      // Get the total amount
      // Convert to number
      // Subtract
      let totalAmount = totalAmountForLoans.textContent;
      totalAmount = Number(totalAmount.substring(1, totalAmount.indexOf(".")));

      if (totalAmount > 0) {
        totalAmountForLoans.textContent = `R${removeFromTotal(
          totalAmount,
          amount
        )}`;
      } else {
        totalAmountForLoans.textContent = `R0.00`;
      }
    } else if (loanNumbers.length > 0) {
      // Get the number from the person div and add it back to the array
      let amount = personInfo.childNodes[0].textContent;
      amount = Number(amount.substring(1, amount.indexOf(".")));
      const totalNumber = totalAmountToCollect(loanNumbers, Number(amount));
      totalAmountForLoans.textContent = `R${totalNumber.toFixed(2)}`;
      console.log("Its in the second one now");
    } else if (loanNumbers.length === 0) {
      let amount = personInfo.childNodes[0].textContent;
      amount = Number(amount.substring(1, amount.indexOf(".")));
      const totalNumber = totalAmountToCollect(loanNumbers, Number(amount));
      totalAmountForLoans.textContent = `R${totalNumber.toFixed(2)}`;
      console.log("Its here now");
    }
  }
}
// Check if class contains complete
// If class contains complete
// // Check for the amount
// // // Get the index of the amount from the array it is in
// // // Remove element from the array
// // // Update the total amount
// If it is toggled back on
// // Add the amount back into the array and the total amount

function addPerson(person) {
  if (person.option === "loans") {
    const personContainer = document.createElement("div");
    personContainer.classList.add("person");
    loansContainer.append(personContainer);

    const personName = document.createElement("h5");
    personName.textContent = person.name;
    personName.classList.add("name");
    personContainer.append(personName);

    const personInfo = document.createElement("div");
    personInfo.classList.add("person-info");
    personContainer.append(personInfo);

    const personAmount = document.createElement("p");
    personAmount.textContent = `R${loanMultiplier(person.number)}`;
    personAmount.classList.add("amount");
    personInfo.append(personAmount);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    personInfo.append(buttons);

    const checkmark = document.createElement("p");
    checkmark.classList.add(
      "fa-sharp",
      "fa-solid",
      "fa-square-check",
      "checkmark"
    );
    buttons.append(checkmark);
    const remove = document.createElement("p");
    remove.classList.add(
      "fa-sharp",
      "fa-solid",
      "fa-rectangle-xmark",
      "remove"
    );
    buttons.append(remove);
    const totalNumber = totalAmountToCollect(
      loanNumbers,
      Number(loanMultiplier(person.number))
    );
    totalAmountForLoans.textContent = `R${totalNumber.toFixed(2)}`;
  } else if (person.option === "items") {
    const personContainer = document.createElement("div");
    personContainer.classList.add("person");
    itemsContainer.append(personContainer);

    const personName = document.createElement("h5");
    personName.textContent = person.name;
    personName.classList.add("name");
    personContainer.append(personName);

    const personInfo = document.createElement("div");
    personInfo.classList.add("person-info");
    personContainer.append(personInfo);

    const personAmount = document.createElement("p");
    const amountPaid = Number(person.number).toFixed(2);
    personAmount.textContent = `R${amountPaid}`;
    personAmount.classList.add("amount");
    personInfo.append(personAmount);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    personInfo.append(buttons);

    const checkmark = document.createElement("p");
    checkmark.classList.add(
      "fa-sharp",
      "fa-solid",
      "fa-square-check",
      "checkmark"
    );
    buttons.append(checkmark);
    const remove = document.createElement("p");
    remove.classList.add(
      "fa-sharp",
      "fa-solid",
      "fa-rectangle-xmark",
      "remove"
    );
    buttons.append(remove);
    const totalNumber = totalAmountToCollect(
      itemNumbers,
      Number(person.number)
    );
    totalAmountForItems.textContent = `R${totalNumber.toFixed(2)}`;
  }
}

function loanMultiplier(amount) {
  const totalAmount = amount * 1.5;
  return totalAmount.toFixed(2);
}

function totalAmountToCollect(arr, number) {
  arr.push(number);
  let totalAmount = 0;
  for (let i = 0; i < arr.length; i++) {
    totalAmount += arr[i];
  }
  return totalAmount;
}

function removeFromTotal(total, number) {
  return total - number;
}
