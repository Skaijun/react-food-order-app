import { formatCurrency } from "../util/formatter.js";

export default function CartItem({ name, price, quantity, handleIncreaseItemQt, handleDecreaseItemQt }) {
    return <li className="cart-item">
        <p>
            {name} - {quantity} x {formatCurrency.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={handleIncreaseItemQt}>+</button>
            <span>{quantity}</span>
            <button onClick={handleDecreaseItemQt}>-</button>
        </p>
    </li>
}