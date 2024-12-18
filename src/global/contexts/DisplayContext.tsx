import React, { createContext, useState, useContext, ReactNode } from 'react';
import { AlgorithmMode, getRandomAlgorithmMode } from '../components/patterns/colorAlgorithms';

interface DisplaySettings {
    bgStrategy: AlgorithmMode
}

interface DisplaySettingsContextValue {
    displaySettings: DisplaySettings;
    updateSettings: (newSettings: Partial<DisplaySettings>) => void;
}

const DisplaySettingsContext = createContext<DisplaySettingsContextValue | undefined>(undefined);

interface DisplaySettingsProviderProps {
    children: ReactNode;
}

export const DisplaySettingsProvider: React.FC<DisplaySettingsProviderProps> = ({ children }) => {
    const [displaySettings, setDisplaySettings] = useState<DisplaySettings>({
        bgStrategy: getRandomAlgorithmMode(["none"])
    });

    const updateSettings = (newSettings: Partial<DisplaySettings>) => {
        setDisplaySettings((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
        }));
    };

    return (
        <DisplaySettingsContext.Provider value={{ displaySettings, updateSettings }}>
            {children}
        </DisplaySettingsContext.Provider>
    );
};

export const useDisplaySettings = (): DisplaySettingsContextValue => {
    const context = useContext(DisplaySettingsContext);
    if (!context) {
        throw new Error('useDisplaySettings must be used within a DisplaySettingsProvider');
    }
    return context;
};