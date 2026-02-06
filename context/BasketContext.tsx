import { createContext, useContext, useState, ReactNode } from 'react';
import { BasketItem } from "@/lib/types";

type BasketContextType = {
    items: BasketItem[];
    addItem: (item: BasketItem) => void;
    removeItem: (menuItemId: number) => void;
    clearBasket: () => void;
    total: number;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<BasketItem[]>([]);

    const addItem = (item: BasketItem) => {
        setItems(prev => {
            const existing = prev.find(i => i.menuItemId == item.menuItemId);
            if (existing) {
                return prev.map(i =>
                    i.menuItemId === item.menuItemId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    };

    const removeItem = (menuItemId: number) => {
        setItems(prev => prev.filter(i => i.menuItemId !== menuItemId));
    };

    const clearBasket = () => { setItems([]); };

    const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    return (
        <BasketContext.Provider value={{ items, addItem, removeItem, clearBasket, total }}>
            {children}
        </BasketContext.Provider>
    );
}

export function useBasket() {
    const context = useContext(BasketContext);
    if (!context) throw new Error("useBasket must be used within BasketProvider");
    return context;
}