import React, { createContext, useContext, useState, useEffect } from 'react';

const ResultsContext = createContext();

export const useResults = () => useContext(ResultsContext);

export const ResultsProvider = ({ children }) => {
  // Load results from localStorage on initial mount
  const [results, setResults] = useState(() => {
    const saved = localStorage.getItem('bridgeAi_results');
    return saved ? JSON.parse(saved) : null;
  });

  // Sync results to localStorage whenever they change
  useEffect(() => {
    if (results) {
      localStorage.setItem('bridgeAi_results', JSON.stringify(results));
    } else {
      localStorage.removeItem('bridgeAi_results');
    }
  }, [results]);

  const clearResults = () => {
    setResults(null);
    localStorage.removeItem('bridgeAi_results');
  };

  return (
    <ResultsContext.Provider value={{ results, setResults, clearResults }}>
      {children}
    </ResultsContext.Provider>
  );
};