import { useContext } from "react";

import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import ErrorNotification from './ErrorNotification.jsx';
import Button from "./UI/Button.jsx";
import Input from "./UI/Input.jsx";
import Modal from "./Modal.jsx";

import useHttp from '../hooks/useHttp.js';
import { formatCurrency } from "../util/formatter.js";
import { calculateTotals } from "../util/totals.js"

const reqConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
};

export default function Checkout() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const totals = calculateTotals(cartCtx.items);
    const formattedTotals = formatCurrency.format(totals);

    const { data, isLoading: isSending, errMsg, sendRequest, clearData } = useHttp('http://localhost:3000/orders', reqConfig);

    function handleSubmitCheckout(event) {
        event.preventDefault();

        const form = new FormData(event.target);
        const customerData = Object.fromEntries(form.entries());
        const reqBody = {
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        };

        sendRequest(JSON.stringify(reqBody));
    }

    function handleFinish() {
        cartCtx.clearBasket();
        userProgressCtx.hideCheckout();
        userProgressCtx.hideCart();
        clearData();
    }

    let actions = (<>
        <Button type="button" textOnly onClick={() => userProgressCtx.hideCheckout()}>Close</Button>
        <Button>Submit Order</Button>
    </>);

    if (isSending) {
        actions = <span>Sending Order Details to the Server, please wait for a moment!</span>
    }

    if (data && !errMsg) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinish}>
            <h2>Successfully placed a new Order!</h2>
            <p>Your Order ID: {data.id}</p>
            <div className="modal-actions">
                <Button onClick={handleFinish}>Okay</Button>
            </div>
        </Modal>
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

            {errMsg && <ErrorNotification title='Failed to create a new Order' message={errMsg} />}

            <div className="modal-actions">
                {actions}
            </div>
        </form>
    </Modal >
}