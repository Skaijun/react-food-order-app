export async function fetchMeals() {
  const res = await fetch("http://localhost:3000/meals");
  const meals = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch meals from the Server!");
  }

  return meals;
}
