import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';

const TestComponents = () => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setRenderCount(prev => prev + 1);
    console.log('Component rendered:', renderCount + 1);
  });

  const handleAddItem = useCallback(() => {
    if (inputValue.trim()) {
      setItems(prev => [...prev, inputValue.trim()]);
      setInputValue('');
    }
  }, [inputValue]);

  const expensiveCalculation = useMemo(() => {
    console.log('Executando cálculo caro...');
    let result = 0;
    for (let i = 0; i < count * 1000000; i++) {
      result += i;
    }
    return result;
  }, [count]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div>
      <div className="card">
        <h2>Testes Básicos de React Hooks</h2>
        
        <div>
          <h3>useState - Contador</h3>
          <p>Contador: <strong>{count}</strong></p>
          <button className="button" onClick={() => setCount(count + 1)}>Incrementar</button>
          <button className="button" onClick={() => setCount(count - 1)}>Decrementar</button>
          <button className="button" onClick={() => setCount(0)}>Resetar</button>
        </div>

        <div>
          <h3>useEffect - Rastreamento de Renderizações</h3>
          <p>Número de renderizações: <strong>{renderCount}</strong></p>
          <div className="info">
            O useEffect está executando a cada renderização. Verifique o console do navegador.
          </div>
        </div>

        <div>
          <h3>useRef - Referência de Elemento</h3>
          <input
            ref={inputRef}
            type="text"
            className="input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Digite algo..."
          />
          <button className="button" onClick={focusInput}>Focar no Input</button>
        </div>

        <div>
          <h3>useCallback - Otimização de Função</h3>
          <p>Itens adicionados: {items.length}</p>
          <ul>
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <button className="button" onClick={handleAddItem}>
            Adicionar Item
          </button>
        </div>

        <div>
          <h3>useMemo - Cálculo Otimizado</h3>
          <p>Resultado do cálculo (baseado no contador): <strong>{expensiveCalculation}</strong></p>
          <div className="info">
            O cálculo só executa quando o contador muda, graças ao useMemo.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestComponents;

