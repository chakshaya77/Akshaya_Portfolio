import React from 'react';

const SciFiCard = ({ children, title, subtitle, className = '', style = {}, bgImage = '' }) => {
  return (
    <div
      className={`glass-panel relative group rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end min-h-[350px] p-6 md:p-8 ${className}`}
      style={style}
    >
      {/* Image zoom effect layer - abstract texture or fallback */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black/80">
        <div 
          className="w-full h-full bg-cover bg-center opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700 ease-[cubic-bezier(0.2,0,0.2,1)]"
          style={{ 
            backgroundImage: bgImage ? `url(${bgImage})` : 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full">
        {(title || subtitle) && (
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
            {title && <h3 className="font-display text-xl text-white tracking-wide m-0">{title}</h3>}
            {subtitle && <span className="text-[0.65rem] uppercase tracking-[0.1em] text-white/40 m-0">{subtitle}</span>}
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SciFiCard;
