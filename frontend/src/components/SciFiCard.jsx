import React from 'react';

const SciFiCard = ({ children, title, subtitle, className = '', style = {}, onClick }) => {
  return (
    <div className={`glass-card ${className}`} style={style} onClick={onClick}>
      <div className="scifi-card-content">
        {(title || subtitle) && (
          <div className="scifi-card-header">
            {title && <h3>{title}</h3>}
            {subtitle && <span>{subtitle}</span>}
          </div>
        )}
        <div className="scifi-card-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SciFiCard;
