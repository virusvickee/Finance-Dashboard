# FinPulse — Finance Dashboard

A clean, interactive finance dashboard built as a Frontend Developer Intern assignment for Zorvyn.

Live Demo: [your-vercel-url]
GitHub: https://github.com/virusvickee/finance-dashboard

---

## Setup Instructions
```bash
git clone https://github.com/virusvickee/finance-dashboard.git
cd finance-dashboard
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

---

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- Recharts
- Lucide React
- date-fns

---

## Features

### Dashboard Overview
- Summary cards — Total Balance, Total Income, Total Expenses, Savings Rate
- Balance Trend Line Chart (Jan–Jun 2025) showing Income, Expenses, Net Balance
- Spending Breakdown Pie Chart by category

### Transactions
- 60 mock transactions across 6 months
- Live search by description
- Filter by category and type (Income / Expense)
- Sort by Date or Amount (ascending / descending)
- Empty state UI when no results match

### Role-Based UI
Two roles can be switched via the sidebar dropdown:

| Feature | Viewer | Admin |
|---|---|---|
| View transactions | ✅ | ✅ |
| Add transaction | ❌ | ✅ |
| Edit transaction | ❌ | ✅ |
| Delete transaction | ❌ | ✅ |

No backend or authentication — role is simulated on the frontend via Redux state.

### Insights
- Highest spending category
- Best income month
- Most expensive month
- Average monthly savings
- Monthly comparison table (Income / Expenses / Net)
- Top 5 expense categories with progress bars

### Extras
- LocalStorage persistence — added/edited transactions survive page refresh
- CSV Export — download filtered transactions as a .csv file
- Dark/Light mode toggle

---

## State Management

Redux Toolkit with three slices:

- `transactionsSlice` — holds all transaction data, handles add / edit / delete
- `filtersSlice` — search query, category filter, type filter, sort field and order
- `uiSlice` — active view (dashboard / transactions / insights) and current role

No prop drilling. All components read from and dispatch to the Redux store directly.

---

## Project Structure
src/
├── components/
│   ├── dashboard/      # SummaryCards, BalanceTrendChart, SpendingPieChart
│   ├── transactions/   # TransactionList, FilterBar, AddTransactionModal
│   ├── insights/       # InsightsPanel
│   └── layout/         # Sidebar, Header
├── store/
│   └── slices/         # transactionsSlice, filtersSlice, uiSlice
├── data/               # Mock transactions (60 entries)
├── types/              # TypeScript interfaces
└── hooks/              # useAppDispatch, useAppSelector

---

## Assumptions Made

- All monetary values are in INR (₹)
- Mock data covers January–June 2025
- Role switching is frontend-only — no authentication required per assignment brief
- LocalStorage is used for persistence instead of a backend API
