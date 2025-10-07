import React from 'react';
import { IconProps } from './types';

export const BrainIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 1a2 2 0 0 0-2 2v2c0 1.1.9 2 2 2h.5a2 2 0 0 1 2 2v.5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V8.5a2 2 0 0 1 2-2V6a2 2 0 0 0-2-2h-1.5A2.5 2.5 0 0 1 18 1H12z" />
    <path d="M12 23a2 2 0 0 1-2-2v-2c0-1.1.9-2 2-2h.5a2 2 0 0 0 2-2v-.5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5a2 2 0 0 0 2 2h-1.5a2.5 2.5 0 0 0-2.5 2.5V23H12z" />
    <path d="M12 17a2 2 0 0 0-2-2v-2c0-1.1.9-2 2-2h.5a2 2 0 0 1 2-2v-.5a2 2 0 0 0 2-2h2a2 2 0 0 0 2-2v1.5a2 2 0 0 0 2 2h-1.5a2.5 2.5 0 0 0-2.5 2.5V17H12z" />
  </svg>
);