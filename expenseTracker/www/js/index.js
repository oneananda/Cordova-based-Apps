/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

document.addEventListener('DOMContentLoaded', loadExpenses);

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => renderExpense(expense));
    updateTotal();
}

function addExpense() {
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid details');
        return;
    }

    const expense = {
        id: Date.now(),
        description,
        amount,
        category
    };

    renderExpense(expense);
    saveExpense(expense);
    updateTotal();

    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}

function renderExpense(expense) {
    const expenseList = document.getElementById('expenseList');
    const li = document.createElement('li');
    li.setAttribute('data-id', expense.id);

    li.innerHTML = `
        <div class="expense-item">
            <span>${expense.description}</span> - $${expense.amount.toFixed(2)} <small>(${expense.category})</small>
        </div>
        <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
    `;

    expenseList.appendChild(li);
}

function saveExpense(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function deleteExpense(id) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    document.querySelector(`li[data-id="${id}"]`).remove();
    updateTotal();
}

function updateTotal() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('totalAmount').innerText = total.toFixed(2);
}
