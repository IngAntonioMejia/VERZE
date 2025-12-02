import React, { useState, useEffect } from 'react';
import LoginView from './pages/LoginView'; // Importamos LoginView
import DashboardView from './pages/DashboardView'; // Importamos DashboardView
import { Config } from './components/Config'; // Importamos la config

// ¡Asegúrate de que tu main.jsx o index.jsx importe tu archivo index.css!
// No necesitas importar GlobalStyles aquí nunca más.

// === COMPONENTE PRINCIPAL (Tu App.jsx) ===
export default function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login' o 'dashboard'
  const [currentUser, setCurrentUser] = useState('');
  
  // Aquí simulamos la carga de la configuración.
  // En tu app, esto podría venir del "elementSdk"
  const [config, setConfig] = useState(Config);

  // --- Lógica del SDK (simulada) ---
  // Tu código original dependía de 'window.elementSdk'.
  // Esta es una forma de manejarlo en React.
  // Por ahora, solo usamos la configuración por defecto.
  useEffect(() => {
    // Aquí iría la lógica de 'window.elementSdk.init' si fuera necesario
    // Por ejemplo, para recibir una config actualizada:
    // window.elementSdk.onConfigChange(setConfig);
    
    // Aplicamos el color de fondo al body
    document.body.style.background = `linear-gradient(135deg, ${config.background_color || Config.background_color} 0%, #FBCFE8 50%, #DDD6FE 100%)`;
  }, [config]);


  const handleLogin = (username) => {
    setCurrentUser(username);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser('');
    setCurrentView('login');
  };

  return (
    <>
      {/* Ya no necesitamos <GlobalStyles /> aquí */}
      <div 
        className="app-container min-h-full flex items-center justify-center p-4"
        style={{
          // Dejamos este fondo por si acaso, aunque el body ya debería tenerlo
          background: `linear-gradient(135deg, ${config.background_color || Config.background_color} 0%, #FBCFE8 50%, #DDD6FE 100%)`
        }}
      >
        {currentView === 'login' ? (
          <LoginView config={config} onLogin={handleLogin} />
        ) : (
          <DashboardView config={config} user={currentUser} onLogout={handleLogout} />
        )}
      </div>
    </>
  );
}