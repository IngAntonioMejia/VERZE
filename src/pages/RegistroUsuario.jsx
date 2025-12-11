import React, { useState } from 'react';
import { Config } from '../components/Config'; // Importamos la config base (si la tienes)

// Configuración fallback por si falla la importación
const DefaultConfig = {
  font_family: 'sans-serif',
  font_size: 16,
  primary_action_color: '#3B82F6',
  secondary_action_color: '#2563EB',
  text_color: '#1F2937',
  surface_color: '#FFFFFF',
  login_title: 'Registro',
  login_subtitle: 'Crea tu cuenta nueva',
};

export default function RegistroUsuario({ config = DefaultConfig, onRegisterSuccess, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fusionamos configs
  const finalConfig = { ...DefaultConfig, ...config };
  
  const customFont = finalConfig.font_family;
  const baseSize = finalConfig.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validación básica en frontend
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (password.length < 4) {
        setError('La contraseña debe tener al menos 4 caracteres.');
        return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
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
        setSuccessMsg('¡Usuario creado con éxito! Redirigiendo...');
        // Esperamos 1.5 segundos para que el usuario lea el mensaje y luego redirigimos
        setTimeout(() => {
          onRegisterSuccess(); 
        }, 1500);
      } else {
        // Manejar errores de validación de Laravel (ej: usuario duplicado)
        setError(data.message || 'Error al registrar usuario.');
        if (data.errors && data.errors.username) {
             setError('El nombre de usuario ya existe.');
        }
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
      <div className="text-center mb-6">
        <h1 
          className="slide-in-left" 
          style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 1.8}px`, color: finalConfig.text_color, fontWeight: 700, marginBottom: '8px' }}
        >
          Crear Cuenta
        </h1>
        <p 
          className="slide-in-right" 
          style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize}px`, color: finalConfig.text_color, opacity: 0.7 }}
        >
          Ingresa tus datos para registrarte
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm text-center border border-red-200 animate-pulse">
          {error}
        </div>
      )}
      
      {successMsg && (
        <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700 text-sm text-center border border-green-200">
          {successMsg}
        </div>
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label style={{ fontSize: `${baseSize * 0.875}px`, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
            Nombre de Usuario
          </label>
          <input 
            type="text" 
            className="input-field w-full px-4 py-3 rounded-lg border-2"
            style={{ borderColor: '#E2E8F0' }}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
            disabled={isLoading}
          />
        </div>

        <div>
          <label style={{ fontSize: `${baseSize * 0.875}px`, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
            Contraseña
          </label>
          <input 
            type="password" 
            className="input-field w-full px-4 py-3 rounded-lg border-2"
            style={{ borderColor: '#E2E8F0' }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div>
          <label style={{ fontSize: `${baseSize * 0.875}px`, fontWeight: 500, display: 'block', marginBottom: '4px' }}>
            Confirmar Contraseña
          </label>
          <input 
            type="password" 
            className="input-field w-full px-4 py-3 rounded-lg border-2"
            style={{ borderColor: '#E2E8F0' }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary w-full py-3 rounded-lg font-bold shadow-lg transition-transform active:scale-95 mt-4" 
          style={{ 
            background: `linear-gradient(135deg, ${finalConfig.primary_action_color}, ${finalConfig.secondary_action_color})`, 
            color: 'white',
            opacity: isLoading ? 0.7 : 1,
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={onCancel}
          className="text-sm hover:underline" 
          style={{ color: finalConfig.secondary_action_color, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ¿Ya tienes cuenta? Inicia sesión aquí
        </button>
      </div>
    </div>
  );
}