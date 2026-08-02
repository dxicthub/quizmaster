import React from 'react';
import { FaBuilding, FaStar } from 'react-icons/fa';

function CompanyBadge({ size = 'md' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1.5',
    lg: 'text-base px-4 py-2'
  };

  return (
    <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/30 ${sizeClasses[size]}`}>
      <FaBuilding className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'}`} />
      <span className="font-semibold">JEO Digital Solutions</span>
      <FaStar className={`${size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm'} text-yellow-300`} />
    </div>
  );
}

export default CompanyBadge;