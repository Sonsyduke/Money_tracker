const dateElement = document.querySelector(".date");
const form = document.querySelector(".form");
const nameInput = document.querySelector("#nameInput");
const amountInput = document.querySelector("#amount");
const radioOptions = document.querySelectorAll("input[name='option']");
const submitBtn = document.querySelector("#submit-btn");
const personName = document.querySelector(".name");
const personAmount = document.querySelector(".amount");
const loansContainer = document.querySelector(".loans"); //CHANGE THIS BACK TO "ALL"
const itemsContainer = document.querySelector(".items"); //CHANGE THIS BACK TO "ALL"

// Get the current date and display it in the nav
const today = new Date();
const currentDate = `${today.getFullYear()}/${
  today.getMonth() + 1
}/${+today.getDate()}`;
dateElement.textContent = currentDate;

// submitBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   let selectedOption;
//   for (const radioBtn of radioOptions) {
//     if (radioBtn.checked) {
//       selectedOption = radioBtn.value;
//       break;
//     }
//   }
//   console.log(selectedOption);
// });

form.addEventListener("submit", submittingForm);

// Create an object from the form data
function submittingForm(e) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const formDataObj = Object.fromEntries(formData.entries());
  console.log(formDataObj);
  addPerson(formDataObj);
}

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
    // personAmount.textContent = `R${person.number}.00`;
    personAmount.textContent = `R${loanMultiplier(person.number)}.00`;
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

    // if it's here add 0.50% to their current amount
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
    personAmount.textContent = `R${person.number}.00`;
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
  }
}

function loanMultiplier(amount) {
  const totalAmount = amount * 1.5;
  return totalAmount;
}
