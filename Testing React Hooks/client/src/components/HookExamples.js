import React, { useState, useEffect, useReducer, useContext, createContext } from 'react';

const ThemeContext = createContext();

const HookExamples = () => {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div>
        <div className="card">
          <h2>Exemplos Avançados de Hooks</h2>

          <ThemeExample />
          <ReducerExample />
          <CustomHookExample />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

const ThemeExample = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <h3>useContext - Tema</h3>
      <p>Tema atual: <strong>{theme}</strong></p>
      <button 
        className="button" 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      >
        Alternar Tema
      </button>
    </div>
  );
};

const initialState = { count: 0, history: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
        history: [...state.history, `+1 (${new Date().toLocaleTimeString()})`]
      };
    case 'decrement':
      return {
        count: state.count - 1,
        history: [...state.history, `-1 (${new Date().toLocaleTimeString()})`]
      };
    case 'reset':
      return { count: 0, history: [] };
    default:
      return state;
  }
}

const ReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h3>useReducer - Gerenciamento de Estado Complexo</h3>
      <p>Contador: <strong>{state.count}</strong></p>
      <button className="button" onClick={() => dispatch({ type: 'increment' })}>
        Incrementar
      </button>
      <button className="button" onClick={() => dispatch({ type: 'decrement' })}>
        Decrementar
      </button>
      <button className="button" onClick={() => dispatch({ type: 'reset' })}>
        Resetar
      </button>
      <div className="info">
        <strong>Histórico:</strong>
        <ul>
          {state.history.slice(-5).map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

const CustomHookExample = () => {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <div>
      <h3>Custom Hook - useLocalStorage</h3>
      <input
        type="text"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome (salvo no localStorage)"
      />
      <p>Valor salvo: <strong>{name || 'Nenhum'}</strong></p>
      <div className="info">
        Recarregue a página - o valor será mantido graças ao localStorage!
      </div>
    </div>
  );
};

export default HookExamples;

