import React, { useState } from 'react';
import { Config } from '../components/Config'; // Importamos la config base

// === COMPONENTE LoginView (Tu LoginView.jsx) ===
function LoginView({ config, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Agregamos estado para la contraseña
  const [error, setError] = useState(null); // Estado para mostrar errores de login
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  
  const customFont = config.font_family || Config.font_family;
  const baseSize = config.font_size || Config.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // 1. Llamada a tu Backend Laravel
      const response = await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Si el login es correcto (Laravel devolvió 200)
        console.log("Usuario logueado:", data.user);
        onLogin(username); // Llamamos a la función de App.jsx para cambiar de vista
      } else {
        // 3. Si hubo error (Laravel devolvió 401 o 403)
        setError(data.message || 'Error al iniciar sesión');
      }

    } catch (err) {
      console.error(err);
      setError('No se pudo conectar con el servidor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in">
      <div className="text-center mb-8">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center pulse-animation" 
          style={{ background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, ${config.secondary_action_color || Config.secondary_action_color})` }}
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h1 
          id="login-title" 
          className="slide-in-left" 
          style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 2}px`, color: config.text_color || Config.text_color, fontWeight: 700, marginBottom: '8px' }}
        >
          {config.login_title || Config.login_title}
        </h1>
        <p 
          id="login-subtitle" 
          className="slide-in-right" 
          style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize}px`, color: config.text_color || Config.text_color, opacity: 0.7 }}
        >
          {config.login_subtitle || Config.login_subtitle}
        </p>
      </div>

      {/* Mensaje de Error */}
      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center">
          {error}
        </div>
      )}

      <form id="login-form" className="space-y-6" onSubmit={handleSubmit}>
        <div className="slide-in-left" style={{ animationDelay: '0.2s' }}>
          <label 
            htmlFor="username" 
            style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            Usuario
          </label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            className="input-field w-full px-4 py-3 rounded-lg border-2" 
            style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize}px`, borderColor: '#E2E8F0', backgroundColor: config.surface_color || Config.surface_color }}
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            disabled={isLoading}
          />
        </div>

        <div className="slide-in-right" style={{ animationDelay: '0.3s' }}>
          <label 
            htmlFor="password" 
            style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, fontWeight: 500, display: 'block', marginBottom: '8px' }}
          >
            Contraseña
          </label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            className="input-field w-full px-4 py-3 rounded-lg border-2" 
            style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize}px`, borderColor: '#E2E8F0', backgroundColor: config.surface_color || Config.surface_color }}
            placeholder="Ingresa tu contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary w-full py-4 rounded-lg font-bold shadow-lg slide-in-left transition-transform active:scale-95" 
          style={{ 
            fontFamily: `${customFont}, ${baseFontStack}`, 
            fontSize: `${baseSize * 1.125}px`, 
            background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, ${config.secondary_action_color || Config.secondary_action_color})`, 
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)', 
            color: 'white', 
            animationDelay: '0.4s',
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <div className="mt-6 text-center slide-in-right" style={{ animationDelay: '0.5s' }}>
        <a href="#" className="text-sm" style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.secondary_action_color || Config.secondary_action_color, textDecoration: 'none' }}>
          ¿Olvidaste tu contraseña?
        </a>
      </div>
    </div>
  );
}

export default LoginView;