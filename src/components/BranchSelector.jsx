import React, { useState } from 'react';
import { Config } from './Config.jsx';

const BranchSelector = ({ config, onBranchChange, metric = 'ventas' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  // Datos de sucursales según la métrica
  const branches = {
    ventas: [
      { id: 1, name: 'Sucursal Centro', metric: '$15,420', percentage: 33.7 },
      { id: 2, name: 'Sucursal Norte', metric: '$12,890', percentage: 28.2 },
      { id: 3, name: 'Sucursal Sur', metric: '$10,560', percentage: 23.1 },
      { id: 4, name: 'Sucursal Este', metric: '$6,808', percentage: 14.9 },
    ],
    inventario: [
      { id: 1, name: 'Sucursal Centro', metric: '2,450 items', percentage: 35 },
      { id: 2, name: 'Sucursal Norte', metric: '1,890 items', percentage: 27 },
      { id: 3, name: 'Sucursal Sur', metric: '1,560 items', percentage: 22 },
      { id: 4, name: 'Sucursal Este', metric: '1,100 items', percentage: 16 },
    ],
    clientes: [
      { id: 1, name: 'Sucursal Centro', metric: '450 clientes', percentage: 38 },
      { id: 2, name: 'Sucursal Norte', metric: '320 clientes', percentage: 27 },
      { id: 3, name: 'Sucursal Sur', metric: '240 clientes', percentage: 20 },
      { id: 4, name: 'Sucursal Este', metric: '130 clientes', percentage: 15 },
    ],
  };

  const customFont = config.font_family || Config.font_family;
  const baseSize = config.font_size || Config.font_size;
  const baseFontStack = '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  const primaryColor = config.primary_action_color || Config.primary_action_color;
  const secondaryColor = config.secondary_action_color || Config.secondary_action_color;
  const textColor = config.text_color || Config.text_color;
  const bgColor = config.background_color || Config.background_color;

  const currentBranches = branches[metric] || branches.ventas;
  const selected = selectedBranch || currentBranches[0];

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setIsOpen(false);
    if (onBranchChange) {
      onBranchChange(branch);
    }
  };

  return (
    <div className="relative">
      <button
        className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all hover:shadow-md"
        style={{
          fontFamily: `${customFont}, ${baseFontStack}`,
          fontSize: `${baseSize * 0.875}px`,
          backgroundColor: `rgba(255, 255, 255, 0.95)`,
          border: `2px solid ${primaryColor}`,
          color: textColor,
          fontWeight: 600,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: primaryColor }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"
            ></path>
          </svg>
          <span>{selected.name}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ color: primaryColor }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl z-50"
          style={{
            border: `1px solid ${primaryColor}`,
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
          }}
        >
          <div className="p-2 max-h-96 overflow-y-auto">
            {currentBranches.map((branch) => (
              <div
                key={branch.id}
                className="p-3 rounded-lg hover:shadow-md transition-all cursor-pointer mb-2"
                style={{
                  backgroundColor:
                    selected.id === branch.id
                      ? `rgba(${parseInt(primaryColor.slice(1, 3), 16)}, ${parseInt(primaryColor.slice(3, 5), 16)}, ${parseInt(primaryColor.slice(5, 7), 16)}, 0.1)`
                      : bgColor,
                  borderLeft: `4px solid ${selected.id === branch.id ? primaryColor : 'transparent'}`,
                }}
                onClick={() => handleBranchSelect(branch)}
              >
                <div className="flex items-center justify-between mb-2">
                  <p
                    style={{
                      fontFamily: `${customFont}, ${baseFontStack}`,
                      fontSize: `${baseSize * 0.875}px`,
                      color: textColor,
                      fontWeight: 600,
                    }}
                  >
                    {branch.name}
                  </p>
                  {selected.id === branch.id && (
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      style={{ color: primaryColor }}
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
                    </svg>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <p
                    style={{
                      fontFamily: `${customFont}, ${baseFontStack}`,
                      fontSize: `${baseSize * 0.75}px`,
                      color: secondaryColor,
                      fontWeight: 700,
                    }}
                  >
                    {branch.metric}
                  </p>
                  <div className="flex items-center space-x-1">
                    <div
                      className="h-1 rounded-full"
                      style={{
                        width: `${branch.percentage * 2}px`,
                        backgroundColor: primaryColor,
                      }}
                    ></div>
                    <span
                      style={{
                        fontFamily: `${customFont}, ${baseFontStack}`,
                        fontSize: `${baseSize * 0.75}px`,
                        color: textColor,
                        opacity: 0.6,
                      }}
                    >
                      {branch.percentage}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BranchSelector;
