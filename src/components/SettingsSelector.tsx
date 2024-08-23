import { Difficulty } from "../type/difficulty.type.ts";
import { useContext, useEffect, useState } from "react";
import { Categories } from "../type/categories.type.ts";
import { QuizSettingsContext } from "../context/QuizSettings.context.tsx";
import { QuizDataContext } from "../context/QuizData.context.tsx";

const SettingsSelector = () => {
  const [categories, setCategories] = useState<Categories>([]);
  const { category, setCategory, difficulty, setDifficulty } =
    useContext(QuizSettingsContext);
  const { fetchQuestions } = useContext(QuizDataContext);

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((response) => response.json())
      .then((data) => setCategories(data.trivia_categories));
  }, []);

  return (
    <section className="flex flex-row items-center">
      <select
        className="m-2 p-2 bg-gray-700 text-white rounded-md"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        id="categorySelect"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <select
        className="m-2 p-2 bg-gray-700 text-white rounded-md"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        id="difficultySelect"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => fetchQuestions(category, difficulty)}
        id="createBtn"
      >
        Create
      </button>
    </section>
  );
};
export default SettingsSelector;
