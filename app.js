const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1; 
const day = date.getDate();
const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
document.querySelector("#date").innerHTML = "Date " + formattedDate;