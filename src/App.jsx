import React, { useState, useEffect } from 'react';
import LoginView from './pages/LoginView'; 
import RegistroUsuario from './pages/RegistroUsuario'; 
import DashboardView from './pages/DashboardView'; 
import { Config } from './components/Config'; 

export default function App() {
  const [currentView, setCurrentView] = useState('login'); 
  const [currentUser, setCurrentUser] = useState('');
  
  const [config, setConfig] = useState(Config);

  useEffect(() => {
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

  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

  // Variable para saber si estamos en el dashboard
  const isDashboard = currentView === 'dashboard';

  return (
    <>
      <div 
        // CAMBIO CLAVE AQUÍ:
        // Si es Dashboard: 'min-h-screen w-full' (Ocupa todo, alineado arriba a la izquierda)
        // Si es Login/Registro: 'min-h-screen flex items-center justify-center p-4' (Centrado flotante)
        className={`app-container min-h-screen ${isDashboard ? 'w-full' : 'flex items-center justify-center p-4'}`}
        style={{
          background: `linear-gradient(135deg, ${config.background_color || Config.background_color} 0%, #FBCFE8 50%, #DDD6FE 100%)`
        }}
      >
        {currentView === 'login' && (
          <LoginView 
            config={config} 
            onLogin={handleLogin} 
            onGoToRegister={() => setCurrentView('register')} 
          />
        )}

        {currentView === 'register' && (
          <RegistroUsuario 
            config={config}
            onRegisterSuccess={handleRegisterSuccess}
            onCancel={() => setCurrentView('login')}
          />
        )}

        {currentView === 'dashboard' && (
          <DashboardView 
            config={config} 
            user={currentUser} 
            onLogout={handleLogout} 
          />
        )}
      </div>
    </>
  );
}