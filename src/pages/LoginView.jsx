import React, { useState } from 'react';
import { Config } from '../components/Config'; // Importamos la config base

// === COMPONENTE LoginView ===
function LoginView({ config = Config, onLogin, onGoToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Fusionamos la configuración recibida con la por defecto
  const finalConfig = { ...Config, ...config };

  const customFont = finalConfig.font_family;
  const baseSize = finalConfig.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Llamada a tu Backend Laravel
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
        // Si el login es correcto
        onLogin(username); 
      } else {
        // Si hubo error (Credenciales inválidas, usuario inactivo, etc.)
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
    <div className="card rounded-2xl shadow-2xl p-8 w-full max-w-md fade-in bg-white">
      <div className="text-center mb-8">
        <div 
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center pulse-animation" 
          style={{ background: `linear-gradient(135deg, ${finalConfig.primary_action_color}, ${finalConfig.secondary_action_color})` }}
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
        <h1 
          className="slide-in-left" 
          style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 2}px`, color: finalConfig.text_color, fontWeight: 700, marginBottom: '8px' }}
        >
          {finalConfig.login_title}
        </h1>
        <p 
          className="slide-in-right" 
          style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize}px`, color: finalConfig.text_color, opacity: 0.7 }}
        >
          {finalConfig.login_subtitle}
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center border border-red-200">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="slide-in-left" style={{ animationDelay: '0.2s' }}>
          <label style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: finalConfig.text_color, fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Usuario
          </label>
          <input 
            type="text" 
            className="input-field w-full px-4 py-3 rounded-lg border-2" 
            style={{ borderColor: '#E2E8F0', backgroundColor: finalConfig.surface_color }}
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            disabled={isLoading}
          />
        </div>

        <div className="slide-in-right" style={{ animationDelay: '0.3s' }}>
          <label style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: finalConfig.text_color, fontWeight: 500, display: 'block', marginBottom: '8px' }}>
            Contraseña
          </label>
          <input 
            type="password" 
            className="input-field w-full px-4 py-3 rounded-lg border-2" 
            style={{ borderColor: '#E2E8F0', backgroundColor: finalConfig.surface_color }}
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
            background: `linear-gradient(135deg, ${finalConfig.primary_action_color}, ${finalConfig.secondary_action_color})`, 
            color: 'white', 
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      {/* === AQUÍ ESTÁ EL BOTÓN DE REGISTRO === */}
      <div className="mt-6 text-center slide-in-right" style={{ animationDelay: '0.5s' }}>
        <p className="text-sm mb-2" style={{ color: finalConfig.text_color, opacity: 0.7 }}>¿No tienes cuenta?</p>
        <button 
          onClick={onGoToRegister}
          className="text-sm font-bold hover:underline" 
          style={{ 
            color: finalConfig.secondary_action_color, 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer' 
          }}
        >
          Regístrate aquí
        </button>
      </div>
    </div>
  );
}

export default LoginView;