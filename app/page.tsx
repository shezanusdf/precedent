import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

const API_URL = "https://www.themealdb.com/api/json/v1/1/random.php"; // API for random recipes

interface Recipe {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strMealThumb: string;
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch random recipe from the MealDB API
  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();
      setRecipes(data.meals);
    };

    fetchRecipe();
  }, []);

  const handleSwipe = (direction: string) => {
    if (direction === "right") {
      console.log("Liked: ", recipes[currentIndex].strMeal);
    } else {
      console.log("Disliked: ", recipes[currentIndex].strMeal);
    }

    // Move to next recipe
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Restart if all cards are swiped
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto py-10">
      {recipes.length > 0 ? (
        <div
          className="relative w-full h-96"
          style={{
            backgroundImage: `url(${recipes[currentIndex].strMealThumb})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="absolute bottom-5 left-5 text-white">
            <h2 className="text-2xl font-bold">{recipes[currentIndex].strMeal}</h2>
            <p className="text-lg">{recipes[currentIndex].strCategory}</p>
          </div>
        </div>
      ) : (
        <p>Loading recipes...</p>
      )}

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6">
        <button
          className="bg-red-500 text-white p-4 rounded-full"
          onClick={() => handleSwipe("left")}
        >
          <FaRegThumbsDown className="text-2xl" />
        </button>
        <button
          className="bg-green-500 text-white p-4 rounded-full"
          onClick={() => handleSwipe("right")}
        >
          <FaRegThumbsUp className="text-2xl" />
        </button>
      </div>
    </div>
  );
}
