import { createContext, useReducer } from 'react';

const CartContext = createContext({
    items: [],
    addItem: (product) => { },
    removeItem: (pid) => { },
    clearBasket: () => { }
});

function cartReducer(state, action) {
    if (action.type === 'ADD_ITEM') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);

        const updatedItemsState = [...state.items];
        // handle new item case
        if (existingItemIndex < 0) {
            updatedItemsState.push({ ...action.item, qt: 1 });
        } else {
            const existingStateItem = state.items[existingItemIndex];
            const updatedItem = {
                ...existingStateItem,
                qt: existingStateItem.qt + 1
            };
            updatedItemsState[existingItemIndex] = updatedItem;
        }

        return { ...state, items: updatedItemsState };
    }

    if (action.type === 'REMOVE_ITEM') {
        const existingItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingStateItem = state.items[existingItemIndex];

        const updatedItemsState = [...state.items];
        // handle last item in cart case - complete deletion from state
        if (existingStateItem.qt === 1) {
            // updatedItemsState = updatedItemsState.filter(item => item.id !== action.id);
            updatedItemsState.splice(existingItemIndex, 1);
        } else {
            const updatedItem = {
                ...existingStateItem,
                qt: existingStateItem.qt - 1
            };
            updatedItemsState[existingItemIndex] = updatedItem;

        }

        return { ...state, items: updatedItemsState };
    }

    if (action.type === 'CLEAR_BASKET') {
        return { ...state, items: [] };
    }

    return state;
}

export function CartContextProvider({ children }) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    function addItem(product) {
        dispatchCartAction({ type: 'ADD_ITEM', item: product });
    }

    function removeItem(pid) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id: pid });
    }

    function clearBasket() {
        dispatchCartAction({ type: 'CLEAR_BASKET' });
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearBasket
    };

    return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

export default CartContext;