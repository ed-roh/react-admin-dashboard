'use client'

import React, { useState, useRef, useEffect } from 'react';
import {
    Home, Calendar, History, Settings, Headset, DollarSign,
    ChevronDown, Menu, X, Plus, Droplets
} from 'lucide-react';

interface Area {
    id: number;
    name: string;
}

interface Microaspersor {
    id: number;
    name: string;
    areaId: number;  // Added to associate microaspersors with areas
}

interface NavigationItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string; size?: number }>;
}

interface SidebarContentProps {
    onClose?: () => void;
}

const Sidebar: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isAreaSelectorOpen, setIsAreaSelectorOpen] = useState<boolean>(false);
    const [isMicroaspersorSelectorOpen, setIsMicroaspersorSelectorOpen] = useState<boolean>(false);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [selectedMicroaspersor, setSelectedMicroaspersor] = useState<Microaspersor | null>(null);
    const areaDropdownRef = useRef<HTMLDivElement>(null);
    const microaspersorDropdownRef = useRef<HTMLDivElement>(null);

    // Sample data - In a real application, this would come from an API
    const areas: Area[] = [
        { id: 1, name: "Área 1" },
        { id: 2, name: "Área 2" },
        { id: 3, name: "Área 3" },
    ];

    const microaspersors: Microaspersor[] = [
        { id: 1, name: "Microaspersor 1", areaId: 1 },
        { id: 2, name: "Microaspersor 2", areaId: 1 },
        { id: 3, name: "Microaspersor 3", areaId: 2 },
        { id: 4, name: "Microaspersor 4", areaId: 2 },
        { id: 5, name: "Microaspersor 5", areaId: 3 },
    ];

    const items: NavigationItem[] = [
        { title: "Início", url: "/app/dashboard", icon: Home },
        { title: "Registros de Produção", url: "/app/production-record", icon: Calendar },
        { title: "Economia de Recursos", url: "/app/resource-saving", icon: DollarSign },
        { title: "Histórico", url: "/app/history", icon: History },
        { title: "Manutenção e Suporte", url: "/app/maintenance-support", icon: Headset },
        { title: "Configurações", url: "/app/settings", icon: Settings },
    ];

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (areaDropdownRef.current && !areaDropdownRef.current.contains(event.target as Node)) {
                setIsAreaSelectorOpen(false);
            }
            if (microaspersorDropdownRef.current && !microaspersorDropdownRef.current.contains(event.target as Node)) {
                setIsMicroaspersorSelectorOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Reset microaspersor selection when area changes
    useEffect(() => {
        setSelectedMicroaspersor(null);
    }, [selectedArea]);

    const AreaDropdown = () => (
        <div className="relative" ref={areaDropdownRef}>
            <button
                onClick={() => setIsAreaSelectorOpen(!isAreaSelectorOpen)}
                className="w-full px-3 py-2 flex items-center justify-between bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
                <span>{selectedArea?.name || "Selecionar área"}</span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isAreaSelectorOpen ? 'transform rotate-180' : ''}`} />
            </button>

            {isAreaSelectorOpen && (
                <div className="absolute w-full mt-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    {areas.map((area) => (
                        <button
                            key={area.id}
                            onClick={() => {
                                setSelectedArea(area);
                                setIsAreaSelectorOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                            {area.name}
                        </button>
                    ))}
                    <hr className="my-1 border-gray-200" />
                    <button
                        onClick={() => {
                            // Handle new area addition
                            setIsAreaSelectorOpen(false);
                        }}
                        className="w-full px-3 py-2 text-left text-sm text-green-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                        <Plus size={16} />
                        Adicionar nova área
                    </button>
                </div>
            )}
        </div>
    );

    const MicroaspersorDropdown = () => {
        const filteredMicroaspersors = microaspersors.filter(
            m => selectedArea && m.areaId === selectedArea.id
        );

        return (
            <div className="relative" ref={microaspersorDropdownRef}>
                <button
                    onClick={() => setIsMicroaspersorSelectorOpen(!isMicroaspersorSelectorOpen)}
                    disabled={!selectedArea}
                    className={`w-full px-3 py-2 flex items-center justify-between bg-white border border-gray-200 rounded-lg text-sm transition-colors ${
                        selectedArea
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-gray-400 bg-gray-50 cursor-not-allowed'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <Droplets className="h-4 w-4" />
                        <span>{selectedMicroaspersor?.name || "Selecionar microaspersor"}</span>
                    </div>
                    <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${
                        isMicroaspersorSelectorOpen ? 'transform rotate-180' : ''
                    }`} />
                </button>

                {isMicroaspersorSelectorOpen && selectedArea && (
                    <div className="absolute w-full mt-2 py-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        {filteredMicroaspersors.map((microaspersor) => (
                            <button
                                key={microaspersor.id}
                                onClick={() => {
                                    setSelectedMicroaspersor(microaspersor);
                                    setIsMicroaspersorSelectorOpen(false);
                                }}
                                className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                                {microaspersor.name}
                            </button>
                        ))}
                        <hr className="my-1 border-gray-200" />
                        <button
                            onClick={() => {
                                // Handle new microaspersor addition
                                setIsMicroaspersorSelectorOpen(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm text-green-600 hover:bg-gray-100 transition-colors flex items-center gap-2"
                        >
                            <Plus size={16} />
                            Adicionar novo microaspersor
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // Mobile sidebar backdrop
    const Backdrop = () => (
        <div
            className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
                isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsOpen(false)}
        />
    );

    const SidebarContent: React.FC<SidebarContentProps> = ({ onClose }) => (
        <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
            {/* Logo and Close Button Container */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <img src="/api/placeholder/200/80" alt="Logo" className="h-8 w-auto" />
                <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <X className="h-5 w-5 text-gray-500" />
                </button>
            </div>

            {/* Filters Section */}
            <div className="p-4 border-b border-gray-200 space-y-3">
                <AreaDropdown />
                <MicroaspersorDropdown />
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {items.map((item) => (
                    <a
                        key={item.title}
                        href={item.url}
                        className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                        <item.icon className="h-5 w-5" />
                        {item.title}
                    </a>
                ))}
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="h-8 w-8 rounded-full bg-gray-300" />
                    <div className="flex-1">
                        <div className="text-sm font-medium">John Doe</div>
                        <div className="text-xs text-gray-500">john@example.com</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Backdrop />

            {/* Mobile Trigger */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="p-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed inset-y-0 left-0 z-50 w-80 lg:hidden transform transition-transform duration-300 ease-in-out ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <SidebarContent onClose={() => setIsOpen(false)} />
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 fixed inset-y-0">
                <SidebarContent />
            </div>
        </>
    );
};

export default Sidebar;