# Monthly Expenses Median Calculator

The objective of this project is to gather expenses from each month up to and including the first Sunday, and then calculate the median of these expenses.

## How It Works
The application takes expense data structured in a JavaScript object where expenses are categorized by date. It then calculates the median of the expenses gathered from each month up to and including the first Sunday.

### The process involves the following steps:

1. Reading Data: Expense data is structured in JavaScript objects. Each object represents expenses for different dates within a month. Each date may have different arrays of category expenses.
2. Expense Concatenation: It concatenates expenses from each month up to and including the first Sunday. If no expenses in the object match the condition, the function returns null as instructed. The function also checks if the input arrays contain only numbers and acts accordingly if not. 
3. Median Calculation: After gathering the expenses, the function calculates the median value of these expenses. If there's an even number of expenses, it calculates the average of the two middle values.
