import { useContext } from "react";

import UserProgressContext from "../store/UserProgressContext.jsx";
import CartContext from "../store/CartContext.jsx";
import Button from "./UI/Button.jsx";

import logoImg from "../assets/logo.jpg";

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const numOfItemsInCart = cartCtx.items.reduce((acc, currObj) => acc + currObj.qt, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="Raact food app Logo" />
                <h1>reactfood</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart{numOfItemsInCart ? ` (${numOfItemsInCart})` : ''}</Button>
            </nav>
        </header>
    )
}
