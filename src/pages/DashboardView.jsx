import React, { useState, useEffect } from 'react';
import { Config } from '../components/Config.jsx'; 
import BranchSelector from '../components/BranchSelector.jsx'; 

// --- Función Utilidad ---
function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// === DATOS DE PRUEBA (Mocks) ===
const modules = [
  { name: 'Ventas', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { name: 'Inventario', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Clientes', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
  { name: 'Reportes', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  { name: 'Productos', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { name: 'Finanzas', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
  { name: 'Marketing', icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z' },
  { name: 'Soporte', icon: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z' }
];

const activities = [
  { id: 1, user: 'U1', action: 'completó una tarea', time: 'Hace 1 hora' },
  { id: 2, user: 'U2', action: 'actualizó un reporte', time: 'Hace 2 horas' },
  { id: 3, user: 'U3', action: 'registró un cliente', time: 'Hace 3 horas' },
];

const tasks = [
  'Revisar reportes mensuales', 
  'Actualizar base de datos', 
  'Reunión con el equipo'
];

function DashboardView({ config, user, onLogout }) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isModulesMenuOpen, setIsModulesMenuOpen] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState('ventas');
  const [selectedBranch, setSelectedBranch] = useState(null);
  
  const customFont = config.font_family || Config.font_family;
  const baseSize = config.font_size || Config.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

  // Cerrar menú de usuario si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('#user-menu-btn') && !e.target.closest('#user-menu')) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleStatCardEnter = (e, cardType) => {
    let hoverBg = '';
    if (cardType === 'users' || cardType === 'projects') {
      hoverBg = `linear-gradient(135deg, ${hexToRgba(config.primary_action_color || Config.primary_action_color, 0.2)} 0%, rgba(255, 255, 255, 0.95) 100%)`;
    } else if (cardType === 'sales') {
      hoverBg = `linear-gradient(135deg, ${hexToRgba(config.secondary_action_color || Config.secondary_action_color, 0.2)} 0%, rgba(255, 255, 255, 0.95) 100%)`;
    }
    e.currentTarget.style.background = hoverBg;
  };

  const handleStatCardLeave = (e) => {
    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)';
  };
  
  return (
    // CAMBIO CLAVE AQUÍ: Quitamos 'max-w-7xl' para que use todo el ancho
    // Usamos padding generoso (32px) para que no se pegue a los bordes
    <div className="w-full h-full fade-in" style={{ padding: '32px' }}>
      
      {/* Header con usuario y módulos */}
      <div className="card rounded-2xl shadow-2xl p-6 mb-8 slide-in-left">
        <div className="flex justify-between items-center">
          <button 
            id="modules-menu-btn"
            className="modules-btn flex items-center space-x-2 px-6 py-3 rounded-lg font-medium"
            style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, ${config.secondary_action_color || Config.secondary_action_color})`, color: 'white' }}
            onClick={() => setIsModulesMenuOpen(!isModulesMenuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
            <span>Módulos</span>
            <svg 
              id="modules-arrow" 
              className="w-4 h-4 transition-transform" 
              style={{ transform: isModulesMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <div className="relative">
            <button 
              id="user-menu-btn"
              className="user-menu-btn flex items-center space-x-3 px-4 py-3 rounded-lg transition-all"
              style={{ backgroundColor: config.background_color || Config.background_color }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, ${config.secondary_action_color || Config.secondary_action_color})` }}>
                <span style={{ color: 'white', fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize}px`, fontWeight: 600 }}>{user.charAt(0).toUpperCase()}</span>
              </div>
              <div className="text-left hidden sm:block"> {/* Ocultar texto en móviles si se desea */}
                <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, fontWeight: 600 }}>{user}</p>
                <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.75}px`, color: config.text_color || Config.text_color, opacity: 0.6 }}>Administrador</p>
              </div>
              <svg className="w-5 h-5" style={{ color: config.text_color || Config.text_color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {isUserMenuOpen && (
              <div id="user-menu" className="absolute right-0 mt-2 w-56 card rounded-xl shadow-xl" style={{ zIndex: 1000, top: '100%' }}>
                <div className="p-2">
                  <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-opacity-10 transition-all" style={{ backgroundColor: 'transparent' }}>
                    <svg className="w-5 h-5" style={{ color: config.text_color || Config.text_color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    <span style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color }}>Mi Perfil</span>
                  </a>
                  <hr style={{ borderColor: config.text_color || Config.text_color, opacity: 0.1, margin: '8px 0' }} />
                  <button 
                    id="logout-btn"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-opacity-10 transition-all w-full text-left"
                    style={{ backgroundColor: 'transparent' }}
                    onClick={onLogout}
                  >
                    <svg className="w-5 h-5" style={{ color: config.secondary_action_color || Config.secondary_action_color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    <span style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.secondary_action_color || Config.secondary_action_color, fontWeight: 600 }}>Cerrar Sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {isModulesMenuOpen && (
          <div id="modules-menu" className="mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {modules.map((module, index) => (
              <a 
                key={module.name}
                href="#" 
                className="card rounded-xl p-4 hover:shadow-lg transition-all text-center module-card slide-in-left" 
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, ${config.secondary_action_color || Config.secondary_action_color})`, opacity: 0.9 }}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={module.icon}></path>
                  </svg>
                </div>
                <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, fontWeight: 600 }}>
                  {module.name}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Selector de Sucursal */}
      <div className="mb-8">
        <label style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, fontWeight: 600, display: 'block', marginBottom: '8px' }}>
          Seleccionar Sucursal
        </label>
        <BranchSelector
          config={config}
          metric={selectedMetric}
          onBranchChange={setSelectedBranch}
        />
      </div>

      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Card 1 */}
        <div 
          className="stat-card card rounded-xl p-8 shadow-lg cursor-pointer slide-in-left" 
          data-card="users" 
          style={{ borderLeft: `6px solid ${config.primary_action_color || Config.primary_action_color}`, background: 'rgba(255, 255, 255, 0.95)', animationDelay: '0.2s' }}
          onMouseEnter={(e) => handleStatCardEnter(e, 'users')}
          onMouseLeave={handleStatCardLeave}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, opacity: 0.7, marginBottom: '12px' }}>
                Usuarios Activos
              </p>
              <h3 style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 2.5}px`, color: config.primary_action_color || Config.primary_action_color, fontWeight: 700 }}>
                1,234
              </h3>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, #60A5FA)` }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div 
          className="stat-card card rounded-xl p-8 shadow-lg cursor-pointer slide-in-left" 
          data-card="sales" 
          style={{ borderLeft: `6px solid ${config.secondary_action_color || Config.secondary_action_color}`, background: 'rgba(255, 255, 255, 0.95)', animationDelay: '0.3s' }}
          onMouseEnter={(e) => handleStatCardEnter(e, 'sales')}
          onMouseLeave={handleStatCardLeave}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, opacity: 0.7, marginBottom: '12px' }}>
                Ventas del Mes
              </p>
              <h3 style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 2.5}px`, color: config.secondary_action_color || Config.secondary_action_color, fontWeight: 700 }}>
                $45,678
              </h3>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${config.secondary_action_color || Config.secondary_action_color}, #F472B6)` }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div 
          className="stat-card card rounded-xl p-8 shadow-lg cursor-pointer slide-in-left" 
          data-card="projects" 
          style={{ borderLeft: `6px solid ${config.primary_action_color || Config.primary_action_color}`, background: 'rgba(255, 255, 255, 0.95)', animationDelay: '0.4s' }}
          onMouseEnter={(e) => handleStatCardEnter(e, 'projects')}
          onMouseLeave={handleStatCardLeave}
        >
          <div className="flex items-center justify-between">
            <div>
              <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, opacity: 0.7, marginBottom: '12px' }}>
                Proyectos Activos
              </p>
              <h3 style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 2.5}px`, color: config.primary_action_color || Config.primary_action_color, fontWeight: 700 }}>
                28
              </h3>
            </div>
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md" style={{ background: `linear-gradient(135deg, ${config.primary_action_color || Config.primary_action_color}, #60A5FA)` }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Columnas de Actividad y Tareas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card rounded-2xl shadow-xl p-6 slide-in-left" style={{ animationDelay: '0.5s' }}>
          <h2 style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 1.5}px`, color: config.text_color || Config.text_color, fontWeight: 600, marginBottom: '16px' }}>
            Actividad Reciente
          </h2>
          <div className="space-y-4">
            {activities.map((activity, index) => (
              <div 
                key={activity.id}
                className="activity-item flex items-center space-x-4 p-3 rounded-lg slide-in-left" 
                style={{ backgroundColor: config.background_color || Config.background_color, animationDelay: `${0.6 + (0.1 * index)}s` }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: index % 2 === 0 ? config.primary_action_color : config.secondary_action_color || Config.primary_action_color }}>
                  <span style={{ color: 'white', fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, fontWeight: 600 }}>{activity.user}</span>
                </div>
                <div className="flex-1">
                  <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color, fontWeight: 500 }}>
                    Usuario {activity.user} {activity.action}
                  </p>
                  <p style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.75}px`, color: config.text_color || Config.text_color, opacity: 0.6 }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card rounded-2xl shadow-xl p-6 slide-in-right" style={{ animationDelay: '0.5s' }}>
          <h2 style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 1.5}px`, color: config.text_color || Config.text_color, fontWeight: 600, marginBottom: '16px' }}>
            Tareas Pendientes
          </h2>
          <div className="space-y-3">
            {tasks.map((task, i) => (
              <div 
                key={i}
                className="task-item flex items-center space-x-3 p-3 rounded-lg slide-in-right" 
                style={{ backgroundColor: config.background_color || Config.background_color, animationDelay: `${0.6 + (0.1 * i)}s` }}
              >
                <input type="checkbox" className="w-5 h-5 rounded" style={{ accentColor: config.primary_action_color || Config.primary_action_color }} />
                <span style={{ fontFamily: `${customFont}, ${baseFontStack}`, fontSize: `${baseSize * 0.875}px`, color: config.text_color || Config.text_color }}>
                  {task}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardView;