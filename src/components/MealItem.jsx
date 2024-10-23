import { useContext } from "react";

import Button from "./UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";
import { formatCurrency } from "../util/formatter.js";

export default function MealItem({ meal }) {
    const cartCtx =useContext(CartContext);

    function handleAddToCartClick(product) {
        cartCtx.addItem(product);
    }

    return (
        <article className="meal-item">
            <img src={`http://localhost:3000/${meal.image}`} alt="Meal Image" />
            <h3>{meal.name}</h3>
            <div className="meal-item-price">{formatCurrency.format(meal.price)}</div>
            <div className="meal-item-description">
                {meal.description}
            </div>
            <div className="meal-item-actions">
                <Button onClick={() => handleAddToCartClick(meal)}>Add to Cart</Button>
            </div>
        </article>
    )
}