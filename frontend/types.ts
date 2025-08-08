import React from 'react';

export interface AppType {
  id: string;
  title: string;
  icon: React.ReactElement<{ className?: string }>;
  component: React.ComponentType;
  defaultSize: { width: number; height: number };
}

export interface WindowInstance {
  id: string;
  app: AppType;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  previousState?: { position: { x: number; y: number }; size: { width: number; height: number } };
}
