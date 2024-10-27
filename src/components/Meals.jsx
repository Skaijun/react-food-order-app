import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';
import ErrorNotification from './ErrorNotification.jsx';

const initDataConfig = {}; // to make useEffect work correct > not update config var-dependency

export default function Meals() {
    const { data: meals, isLoading: isFetching, errMsg } = useHttp('http://localhost:3000/meals', initDataConfig, []);

    if (isFetching) {
        return <p className='center'>Loading meals, please wait for a moment..</p>
    }

    if (errMsg) {
        return <ErrorNotification title='Failed to fetch Meals' message={errMsg} />
    }

    return (
        <ul id="meals">{meals.map(meal => <MealItem key={meal.id} meal={meal} />)}</ul>
    )
}