import React from 'react';
import { IconProps } from './types';

export const RobotIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M10 20.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2z" /><path d="M14 20.5v.5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-.5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2z" /><path d="M12 17V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v14" /><path d="M12 17V3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v14" /><circle cx="8" cy="10" r="2" /><circle cx="16" cy="10" r="2" /><path d="M12 17a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3H9a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h3z" />
  </svg>
);