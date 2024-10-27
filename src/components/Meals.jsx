import { useState, useEffect } from 'react';

import MealItem from './MealItem.jsx';
import { fetchMeals } from '../http.js';

export default function Meals() {
    const [meals, setMeals] = useState([]);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        async function fetchProducts() {

            try {
                setIsFetching(true);
                const meals = await fetchMeals();
                setMeals(meals);
                setIsFetching(true);
            } catch (err) {
                console.log(err);
                setIsFetching(false);
            }

            setIsFetching(false);
        }

        fetchProducts();
    }, []);

    if (isFetching) {
        return <p>Loading meals, please wait for a moment..</p>
    }

    return (
        <ul id="meals">{meals.map(meal => <MealItem key={meal.id} meal={meal} />)}</ul>
    )
}