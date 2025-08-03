
import React from 'react';
import { APPS } from '../constants';
import Icon from './Icon';

interface DesktopProps {
    onOpenApp: (id: string) => void;
}

const Desktop: React.FC<DesktopProps> = ({ onOpenApp }) => {
    return (
        <div className="absolute inset-0 p-4 pt-6">
            <div className="grid grid-cols-1 gap-y-4 w-fit">
               {APPS.map(app => (
                    <Icon key={app.id} app={app} onOpen={onOpenApp} />
                ))}
            </div>
        </div>
    );
};

export default Desktop;
