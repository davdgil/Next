// components/theme.jsx
import React from 'react';

const Theme = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-700">
      {children}
    </div>
  );
};

export default Theme;
