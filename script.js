const currencyEl_one = document.getElementById("currency-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_one = document.getElementById("amount-one");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exchange rates and update the DOM
async function calculate() {
  const currOneVal = currencyEl_one.value;
  const currTwoVal = currencyEl_two.value;

  const currOne = await axios.get(
    `https://api.exchangerate-api.com/v4/latest/${currOneVal}`
  );
  const rate = currOne.data.rates[currTwoVal];
  rateEl.innerText = `1 ${currOneVal} = ${rate} ${currTwoVal}`;
  amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
}

// EVENT LISTENERS
currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

calculate();
