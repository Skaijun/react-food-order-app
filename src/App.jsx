import { useState, useEffect } from "react";

import Cart from "./components/Cart.jsx";
import Header from "./components/Header.jsx";
import MealItem from "./components/MealItem.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import { fetchMeals } from './http.js';

function App() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {

      try {
        setLoading(true);
        const meals = await fetchMeals();
        setProducts(meals);
        setLoading(true);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <div id="meals">
          {!isLoading && products.map(meal => {
            return (
              <MealItem key={meal.id} meal={meal} />
            )
          })}
          {isLoading && <p>Loading products, please wait....</p>}
        </div>
        <Cart />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
