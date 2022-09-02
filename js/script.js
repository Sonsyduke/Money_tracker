const dateElement = document.querySelector(".date");
const today = new Date();
const currentDate = `${today.getFullYear()}/${
  today.getMonth() + 1
}/${+today.getDate()}`;

dateElement.textContent = currentDate;
