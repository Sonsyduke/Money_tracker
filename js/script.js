const dateElement = document.querySelector(".date");
const form = document.querySelector(".form");
const nameInput = document.querySelector("#nameInput");
const amountInput = document.querySelector("#amount");
const radioOptions = document.querySelectorAll("input[name='option']");
const submitBtn = document.querySelector("#submit-btn");

// Get the current date and display it in the nav
const today = new Date();
const currentDate = `${today.getFullYear()}/${
  today.getMonth() + 1
}/${+today.getDate()}`;
dateElement.textContent = currentDate;

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let selectedOption;
  for (const radioBtn of radioOptions) {
    if (radioBtn.checked) {
      selectedOption = radioBtn.value;
      break;
    }
  }
  console.log(selectedOption);
});
