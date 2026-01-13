import React from 'react';
import { Layers } from 'lucide-react';

const LayerSwitcher = ({ currentLayer, setLayer }) => {
    const layers = [
        { id: 'app', label: 'Application' },
        { id: 'transport', label: 'Transport' },
        { id: 'network', label: 'Network' },
        { id: 'datalink', label: 'Data Link' },
        { id: 'physical', label: 'Physical' },
    ];

    return (
        <div className="absolute top-8 left-8 z-50">
            <div className="flex items-center gap-2 mb-4 text-white/50">
                <Layers size={16} />
                <span className="text-xs font-bold tracking-widest uppercase">OSI Layers</span>
            </div>

            <div className="flex flex-col gap-1">
                {layers.map((layer) => (
                    <button
                        key={layer.id}
                        onClick={() => setLayer(layer.id)}
                        className={`text-left px-4 py-2 rounded text-sm transition-colors ${currentLayer === layer.id
                                ? 'bg-white/10 text-white font-medium border-l-2 border-cyan-400'
                                : 'text-white/40 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        {layer.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LayerSwitcher;
