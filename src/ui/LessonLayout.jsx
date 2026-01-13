import React from 'react';
import { motion } from 'framer-motion';
import { Book, Activity, ArrowLeft } from 'lucide-react';

/**
 * Standard Lesson Layout for the Network Universe.
 * 
 * @param {string} title - The Lesson Title
 * @param {string} subtitle - Short description
 * @param {ReactNode} theoryContent - The Text/MD content for the Left Pane
 * @param {ReactNode} visualContent - The Interactive Scene for the Center
 * @param {ReactNode} telemetryContent - Real-time data for the Right Pane
 * @param {Function} onBack - Navigation handler
 */
const LessonLayout = ({ title, subtitle, theoryContent, visualContent, telemetryContent, onBack }) => {
    return (
        <div className="w-full h-screen bg-[#020205] text-white flex flex-col font-inter overflow-hidden">

            {/* 1. Top Navigation Bar (Fixed 60px) */}
            <div className="h-[60px] border-b border-white/10 flex items-center px-6 bg-black/40 backdrop-blur-md z-50">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                    <ArrowLeft size={16} /> Back to Galaxy
                </button>
                <div className="ml-auto flex flex-col items-end">
                    <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                        {title}
                    </h1>
                    <span className="text-[10px] text-white/40">{subtitle}</span>
                </div>
            </div>

            {/* 2. Main Content Grid (Remaining Height) */}
            <div className="flex-1 grid grid-cols-12 overflow-hidden">

                {/* LEFT PANE: Theory (Col 3/12 - 25%) */}
                <div className="col-span-3 border-r border-white/10 bg-[#0A0A10] flex flex-col min-w-0">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2 text-purple-400 font-bold uppercase text-xs tracking-wider">
                        <Book size={14} /> Lesson Guide
                    </div>
                    <div className="flex-1 overflow-y-auto p-6 text-sm text-gray-300 leading-relaxed space-y-4 lesson-text">
                        {theoryContent}
                    </div>
                </div>

                {/* CENTER PANE: Visualizer (Col 6/12 - 50%) */}
                <div className="col-span-6 bg-[#050508] relative overflow-hidden flex flex-col">
                    {/* Background Grid for Scale */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[size:40px_40px] bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />

                    {/* The Stage */}
                    <div className="flex-1 relative z-10 w-full h-full">
                        {visualContent}
                    </div>
                </div>

                {/* RIGHT PANE: Telemetry (Col 3/12 - 25%) */}
                <div className="col-span-3 border-l border-white/10 bg-[#0A0A10] flex flex-col min-w-0">
                    <div className="p-4 border-b border-white/5 flex items-center gap-2 text-cyan-400 font-bold uppercase text-xs tracking-wider">
                        <Activity size={14} /> Real-time Telemetry
                    </div>
                    <div className="flex-1 overflow-y-auto p-4">
                        {telemetryContent}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LessonLayout;
