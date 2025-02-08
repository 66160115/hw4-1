function addExpense(expenseData) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expenseData);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function getExpensesByDate(date) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    return expenses.filter(expense => expense.date === date);
}

function calculateTotalByCategory(category) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const total = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0);
    return total;
}

function generateMonthlyReport() {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const monthlyReport = expenses.reduce((report, expense) => {
        const month = expense.date.substring(0, 7);
        if (!report[month]) {
            report[month] = {};
        }
        if (!report[month][expense.category]) {
            report[month][expense.category] = 0;
        }
        report[month][expense.category] += expense.amount;
        return report;
    }, {});

    console.log(monthlyReport);
    alert(JSON.stringify("กรุณากรอกข้อมูลวันที่ที่ต้องการดู"));
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let summaryHTML = '';
    expenses.forEach(expense => {
        summaryHTML += `
            <p>${expense.date} - ${expense.title} - ${expense.amount} บาท (${expense.category})</p>
        `;
    });
    document.getElementById('expense-summary').innerHTML = summaryHTML;
}

function filterByDate() {
    const filterDate = document.getElementById('filter-date').value;
    const expenses = getExpensesByDate(filterDate);
    let summaryHTML = '';
    expenses.forEach(expense => {
        summaryHTML += `
            <p>${expense.date} - ${expense.title} - ${expense.amount} บาท (${expense.category})</p>
        `;
    });
    document.getElementById('expense-summary').innerHTML = summaryHTML;
}

window.onload = displayExpenses;

document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;

    const expenseData = {
        id: new Date().toISOString(),
        title,
        amount,
        category,
        date
    };

    addExpense(expenseData);
    displayExpenses();
    alert("บันทึกค่าใช้จ่ายแล้ว");
});
