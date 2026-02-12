import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResults } from '../context/ResultsContext';

const Logout = () => {
  const navigate = useNavigate();
  const { clearResults } = useResults();

  useEffect(() => {
    // Clear all persisted data
    clearResults();
    sessionStorage.removeItem('bridgeAi_selectedFile');
    localStorage.removeItem('bridgeAi_results');
    
    // Redirect to landing page
    navigate('/', { replace: true });
  }, [clearResults, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617]">
      <div className="text-white text-xl">Logging out...</div>
    </div>
  );
};

export default Logout;