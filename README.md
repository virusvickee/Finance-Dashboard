# FinPulse — Premium Finance Dashboard

FinPulse is a modern, luxury-themed Single Page Application (SPA) for tracking financial activity, visualizing spending insights, and managing transactions. It features a dark themed aesthetic with Role-Based Access Control.

## Features
- **Dashboard View**: High-level summary cards, monthly balance trend line chart, and spending breakdown pie chart.
- **Transactions View**: Advanced data table with search, category filtering, type filtering, and sorting.
- **Insights View**: Deep statistical analysis including top spending categories, best income metrics, and a monthly comparison table.
- **Role-Based UI**:
  - `admin`: Full CRUD access to add, edit, or delete transactions.
  - `viewer`: Read-only access to all dashboards and data. Toggle role via the bottom of the sidebar.
- **Responsive Design**: Adapts beautifully to mobile with a bottom navigation bar.

## Tech Stack
- React 18 & TypeScript
- Vite
- Tailwind CSS v3
- Redux Toolkit
- Recharts
- Lucide React
- date-fns

## State Management
The application uses Redux Toolkit with sliced architecture:
- `transactionsSlice`: Handles mock transactions and CRUD operations.
- `filtersSlice`: Manages complex search, category, type, and sorting state.
- `uiSlice`: Handles active view navigation and the role-based switcher.

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.
