import { useContext } from "react";


import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import Modal from "./Modal.jsx";

import { formatCurrency } from "../util/formatter.js";
import { calculateTotals } from "../util/totals.js"


export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalPrice = calculateTotals(cartCtx.items);
    const title = cartCtx.items.length > 0 ? 'Your Cart' : 'Your Cart is empty, please add some Meals!';

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    return (
        <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
            <h2>{title}</h2>
            {cartCtx.items.map(item => {
                return (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        quantity={item.qt}
                        price={item.price}
                        handleIncreaseItemQt={() => cartCtx.addItem(item)}
                        handleDecreaseItemQt={() => cartCtx.removeItem(item.id)}
                    />
                )
            })}
            {cartCtx.items.length > 0 && <div className="cart-total">{formatCurrency.format(totalPrice.toFixed(2))}</div>}
            <div className="modal-actions">
                <Button textOnly onClick={() => userProgressCtx.hideCart()}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={() => userProgressCtx.showCheckout()}>Checkout</Button>}
            </div>
        </Modal>
    )
}