const form = document.getElementById('form');
const balance = document.getElementById('balance');
const incomeAmount = document.getElementById('income-amount');
const expenseAmount = document.getElementById('expense-amount');
const itemLists = document.getElementById('item-lists');
const addItem = document.getElementById('add-item');
const addItemDescription = document.getElementById('add-item-description');
const addItemAmount = document.getElementById('add-amount');
const itemList = document.getElementById('item-list');
const deleteBtn = document.getElementById('delete-btn');

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

console.log(transactions);

function addNewTransaction(e) {
  e.preventDefault();
  if (
    addItem.value.trim() === '' ||
    addItemDescription.value.trim() === '' ||
    addItemAmount.value.trim() === ''
  ) {
    alert('Please add item value, description and amount');
    return;
  } else {
    const newTransaction = {
      id: Math.floor(Math.random() * 1000000000),
      item: addItem.value,
      description: addItemDescription.value,
      amount: Number(addItemAmount.value),
    };

    transactions.push(newTransaction);
    renderTransactionList(newTransaction);
    updateTransactions();
    updateLocalStorage();

    addItem.value = '';
    addItemDescription.value = '';
    addItemAmount.value = '';
  }
}

// Add transaction to the DOM list
function renderTransactionList(itemTransaction) {
  const getSign = itemTransaction.amount < 0 ? '-' : '+';

  const listElement = document.createElement('li');

  listElement.classList.add(itemTransaction.amount < 0 ? 'minus' : 'plus');

  listElement.innerHTML = `
  <div class="item-list-wrapper flex-style">
              <img class="item-icon flip-animation" src="images/trans-icon.png" alt="" />
              <div class="history-item-group">
                <h4 class="text--bold">${itemTransaction.item}</h4>
                <p class="text--regular">${itemTransaction.description}</p>
              </div>
              <div class="delete-group flex-style">
              <p class="text--bold history-amount">${getSign}$${Math.abs(
    itemTransaction.amount
  ).toFixed(2)}</p>
              <button id="delete-btn" class="delete-btn" data-id="${
                itemTransaction.id
              }">delete</button>
               </div>
           </div>
  `;

  itemLists.appendChild(listElement);
}

function updateTransactions() {
  const transactionAmounts = transactions.map(
    transaction => transaction.amount
  );

  // Calculating and rendering the total balance
  const totalBalance = transactionAmounts
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2);

  balance.innerText = `$${totalBalance}`;

  // Update and render the total transactio amounts
  const incomeTransactions = transactionAmounts
    .filter(amount => amount > 0)
    .reduce((acc, amount) => acc + amount, 0)
    .toFixed(2);
  incomeAmount.innerText = `$${incomeTransactions}`;

  // Update and render the total transactio amounts
  const expenseTransactions = (
    transactionAmounts
      .filter(amount => amount < 0)
      .reduce((acc, amount) => acc + amount, 0) * -1
  ).toFixed(2);
  expenseAmount.innerText = `$${expenseTransactions}`;
}

function deleteTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  initApp();
}

// Update local storage transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function initApp() {
  itemLists.innerHTML = '';

  transactions.forEach(renderTransactionList);
  updateTransactions();
}

initApp();

form.addEventListener('submit', addNewTransaction);

itemLists.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const id = parseInt(e.target.getAttribute('data-id'), 10);
    deleteTransaction(id);
  }
});
