import React, { useState, useEffect } from 'react';
import LoginView from './pages/LoginView'; 
import RegistroUsuario from './pages/RegistroUsuario'; // Importamos la nueva vista
import DashboardView from './pages/DashboardView'; 
import { Config } from './components/Config'; 

export default function App() {
  // Ahora tenemos 3 estados posibles: 'login', 'register', 'dashboard'
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

  // Función para volver al login tras registrarse
  const handleRegisterSuccess = () => {
    setCurrentView('login');
  };

  return (
    <>
      <div 
        className="app-container min-h-full flex items-center justify-center p-4"
        style={{
          background: `linear-gradient(135deg, ${config.background_color || Config.background_color} 0%, #FBCFE8 50%, #DDD6FE 100%)`
        }}
      >
        {/* Lógica de navegación simple */}
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