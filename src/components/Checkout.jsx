import { useContext } from "react";

import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import Modal from "./Modal.jsx";

import { formatCurrency } from "../util/formatter.js";
import { calculateTotals } from "../util/totals.js"

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totals = calculateTotals(cartCtx.items);
    const formattedTotals = formatCurrency.format(totals);

    function handleSubmitCheckout(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const customerData = Object.fromEntries(form.entries());

        fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order: {
                    items,
                    customer: customerData
                }
            })
        })

        console.log(customerData);
    }

    return <Modal className="checkout" open={userProgressCtx.progress === 'checkout'} onClose={() => userProgressCtx.showCart()}>
        <form onSubmit={handleSubmitCheckout}>
            <h2>Checkout</h2>
            <p>Total Amount: {formattedTotals}</p>

            <div className="control-row">
                <Input label="First Name" id="first-name" type="text" className="checkout-half-width-input" />
                <Input label="Second Name" id="second-name" type="text" className="checkout-half-width-input" />
            </div>
            <Input label="Email" id="email" type="email" />
            <Input label="Street" id="street" type="text" />

            <div className="control-row">
                <Input label="Postal Code" id="postal-code" type="text" className="checkout-half-width-input" />
                <Input label="City" id="city" type="text" className="checkout-half-width-input" />
            </div>

            <div className="modal-actions">
                <Button type="button" textOnly onClick={() => userProgressCtx.hideCheckout()}>Close</Button>
                <Button>Submit Order</Button>
            </div>
        </form>
    </Modal >
}