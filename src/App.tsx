import React from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { useAppSelector } from './hooks/useAppSelector';
import { SummaryCards } from './components/dashboard/SummaryCards';
import { BalanceTrendChart } from './components/dashboard/BalanceTrendChart';
import { SpendingPieChart } from './components/dashboard/SpendingPieChart';
import { TransactionList } from './components/transactions/TransactionList';
import { InsightsPanel } from './components/insights/InsightsPanel';

const DashboardView: React.FC = () => (
  <div className="animate-in fade-in duration-500">
    <SummaryCards />
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-20 md:pb-8">
      <div className="xl:col-span-2">
        <BalanceTrendChart />
      </div>
      <div className="xl:col-span-1">
        <SpendingPieChart />
      </div>
    </div>
  </div>
);

function App() {
  const { activeView } = useAppSelector((state) => state.ui);

  return (
    <div className="flex bg-background min-h-screen font-sans selection:bg-accent/30 selection:text-white text-white">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen overflow-x-hidden relative">
        <Header />
        <main className="flex-1 px-4 md:px-10 py-6 overflow-y-auto overflow-x-hidden">
          {activeView === 'dashboard' && <DashboardView />}
          {activeView === 'transactions' && <TransactionList />}
          {activeView === 'insights' && <InsightsPanel />}
        </main>
      </div>
    </div>
  );
}

export default App;
