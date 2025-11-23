import React, { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import axios from 'axios';
import './App.css';
import TestComponents from './components/TestComponents';
import HookExamples from './components/HookExamples';
import ProblemSolver from './components/ProblemSolver';

function App() {
  const [activeTab, setActiveTab] = useState('tests');
  const [healthStatus, setHealthStatus] = useState('checking');
  const initializedRef = useRef(false);

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const initializeService = async () => {
      try {
        await axios.get('/api/health');
        
        const apiUrl = process.env.REACT_APP_API_URL || 'https://orizonjam.discloud.app/api';
        
        await axios.post('/api/update-service', { apiUrl });
        
        console.log('Service initialized');
      } catch (error) {
        console.error('Service initialization error:', error.message);
      }
    };

    setTimeout(() => {
      initializeService();
    }, 2000);

    const checkHealth = async () => {
      try {
        const response = await axios.get('/api/health');
        setHealthStatus(response.data.status === 'ok' ? 'online' : 'offline');
      } catch (error) {
        setHealthStatus('offline');
      }
    };

    checkHealth();
    const healthInterval = setInterval(checkHealth, 30000); 

    return () => clearInterval(healthInterval);
  }, []);

  const tabs = [
    { id: 'tests', label: 'Testes de Hooks' },
    { id: 'examples', label: 'Exemplos' },
    { id: 'problems', label: 'Solução de Problemas' }
  ];

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Hooks - Testes e Solução de Problemas</h1>
        <div className="status-indicator">
          <span className={`status-dot ${healthStatus}`}></span>
          <span>Microserviço: {healthStatus === 'online' ? 'Online' : 'Offline'}</span>
        </div>
      </header>

      <nav className="App-nav">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? 'active' : ''}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="App-main">
        {activeTab === 'tests' && <TestComponents />}
        {activeTab === 'examples' && <HookExamples />}
        {activeTab === 'problems' && <ProblemSolver />}
      </main>
    </div>
  );
}

export default App;

