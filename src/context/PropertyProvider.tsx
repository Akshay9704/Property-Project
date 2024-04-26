"use client";
import React, { createContext, useState, useContext } from "react";

export const PropertyContext = createContext<any[]>([]);

export const PropertyProvider = ({ children }: { children: React.ReactNode }) => {
    const [property, setProperty] = useState<any[]>([]);
    return (
        <PropertyContext.Provider value={[property, setProperty]}>{children}</PropertyContext.Provider>
    );
}

export const useProperty = () => useContext(PropertyContext);
