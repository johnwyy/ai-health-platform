import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import HealthSupervision from './pages/HealthSupervision';
import MedicalInsurance from './pages/MedicalInsurance';
import PublicHealth from './pages/PublicHealth';
import AIWarning from './pages/AIWarning';
import DecisionAnalysis from './pages/DecisionAnalysis';

function App() {
  const [activePage, setActivePage] = useState('dashboard');
  const [modalData, setModalData] = useState({ show: false, title: '', content: '' });

  const handleNavigate = (page) => {
    setActivePage(page);
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 200);
  };

  const handleRowClick = (content) => {
    setModalData({
      show: true,
      title: '详情',
      content: content,
    });
  };

  const closeModal = () => {
    setModalData({ show: false, title: '', content: '' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard onRowClick={handleRowClick} />;
      case 'weijian':
        return <HealthSupervision onRowClick={handleRowClick} />;
      case 'yibao':
        return <MedicalInsurance onRowClick={handleRowClick} />;
      case 'gongwe':
        return <PublicHealth onRowClick={handleRowClick} />;
      case 'ai':
        return <AIWarning onRowClick={handleRowClick} />;
      case 'decision':
        return <DecisionAnalysis onRowClick={handleRowClick} />;
      default:
        return <Dashboard onRowClick={handleRowClick} />;
    }
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <main className="main">
        <Header />
        <div className="content" id="content">
          {renderPage()}
        </div>
      </main>

      {modalData.show && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <div className="modal-title">{modalData.title}</div>
            <div style={{ color: 'var(--muted)' }}>
              <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{modalData.content}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;