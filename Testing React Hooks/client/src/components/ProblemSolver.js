import React, { useState, useEffect } from 'react';

const ProblemSolver = () => {
  const [problems, setProblems] = useState([
    {
      id: 1,
      title: 'Componente não atualiza após mudança de estado',
      solution: 'Verifique se está usando useState ou useReducer corretamente. Certifique-se de não mutar o estado diretamente.',
      code: `// ❌ ERRADO
state.items.push(newItem);

// ✅ CORRETO
setItems([...items, newItem]);`,
      solved: false
    },
    {
      id: 2,
      title: 'useEffect executando infinitamente',
      solution: 'Adicione as dependências corretas no array de dependências do useEffect. Array vazio [] para executar apenas uma vez.',
      code: `// ❌ ERRADO - loop infinito
useEffect(() => {
  setCount(count + 1);
});

// ✅ CORRETO
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // ou com dependências corretas`,
      solved: false
    },
    {
      id: 3,
      title: 'Perda de performance em renderizações',
      solution: 'Use useMemo para cálculos pesados e useCallback para funções passadas como props. Evite criar objetos/arrays dentro do render.',
      code: `// ❌ ERRADO - recria a cada render
const data = { value: count };

// ✅ CORRETO
const data = useMemo(() => ({ value: count }), [count]);`,
      solved: false
    },
    {
      id: 4,
      title: 'Erro ao acessar valor anterior no setState',
      solution: 'Use a forma funcional do setState quando o novo valor depende do anterior.',
      code: `// ❌ ERRADO - pode ter valor desatualizado
setCount(count + 1);

// ✅ CORRETO
setCount(prevCount => prevCount + 1);`,
      solved: false
    },
    {
      id: 5,
      title: 'Memória não sendo limpa em useEffect',
      solution: 'Sempre retorne uma função de cleanup no useEffect para limpar timers, subscriptions, etc.',
      code: `useEffect(() => {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);

  // Cleanup
  return () => clearInterval(timer);
}, []);`,
      solved: false
    }
  ]);

  const toggleSolved = (id) => {
    setProblems(prev => 
      prev.map(problem => 
        problem.id === id ? { ...problem, solved: !problem.solved } : problem
      )
    );
  };

  return (
    <div>
      <div className="card">
        <h2>Solução de Problemas Comuns com React Hooks</h2>
        <p className="info">
          Esta seção ajuda a identificar e resolver problemas comuns ao trabalhar com React Hooks.
          Marque os problemas como resolvidos conforme você os entende.
        </p>
      </div>

      {problems.map(problem => (
        <div key={problem.id} className={`card ${problem.solved ? 'solved' : ''}`}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
            <div style={{ flex: 1 }}>
              <h3>{problem.title}</h3>
              <p style={{ margin: '1rem 0', lineHeight: '1.6' }}>{problem.solution}</p>
              
              <div className="code-block">
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{problem.code}</pre>
              </div>
            </div>
            
            <button
              className="button"
              onClick={() => toggleSolved(problem.id)}
              style={{
                marginLeft: '1rem',
                backgroundColor: problem.solved ? '#4caf50' : '#667eea'
              }}
            >
              {problem.solved ? '✓ Resolvido' : 'Marcar como Resolvido'}
            </button>
          </div>
        </div>
      ))}

      <div className="card">
        <h3>Dicas Adicionais</h3>
        <ul style={{ lineHeight: '2', marginLeft: '1.5rem' }}>
          <li>Sempre use as dependências corretas nos hooks</li>
          <li>Nunca use hooks dentro de loops, condições ou funções aninhadas</li>
          <li>Use React DevTools para debugar problemas de renderização</li>
          <li>Considere usar ESLint com eslint-plugin-react-hooks</li>
          <li>Teste seus hooks com @testing-library/react-hooks</li>
        </ul>
      </div>
    </div>
  );
};

export default ProblemSolver;

