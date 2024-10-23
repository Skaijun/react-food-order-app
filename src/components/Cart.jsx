import { useContext } from "react";


import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import CartModal from "./CartModal.jsx";

import { formatCurrency } from "../util/formatter.js";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalPrice = cartCtx.items.reduce((totalPrice, currentItem) => totalPrice + (currentItem.qt * currentItem.price), 0);

    function handleCloseCartModal() {
        userProgressCtx.hideCart();
    }

    return (
        <CartModal className="cart" open={userProgressCtx.progress === 'cart'}>
            <h2>Your Cart</h2>
            {cartCtx.items.map(item => {
                return (
                    <li className="cart-item" key={item.id}>
                        <p>{item.name} - <span className="item-qt">{item.qt}</span> x <span className="item-price">{formatCurrency.format(item.price)}</span></p>
                        <div className="cart-item-actions">
                            <button onClick={() => { }}>-</button>
                            <span>{item.qt}</span>
                            <button onClick={() => { }}>+</button>
                        </div>
                    </li>
                )
            })}
            <div className="cart-total">{formatCurrency.format(totalPrice.toFixed(2))}</div>
            <div className="modal-actions">
                <Button textOnly onClick={handleCloseCartModal}>Close</Button>
                <Button>Checkout</Button>
            </div>
        </CartModal>
    )
}