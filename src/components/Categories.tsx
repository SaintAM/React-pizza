import React from "react";
// import { useWhyDidYouUpdate } from "ahooks";

type CategoriesProps = {
    value: number;
    // Типизировали как в Home.tsx ориг ф-ции(получает параметр и ничего не возвращает)
    onChangeCategory: (idx: number) => void;
};
const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
];

// Типизация пропсов внутри React.FC<.....>
const Categories: React.FC<CategoriesProps> = React.memo(
    ({ value, onChangeCategory }) => {
        // useWhyDidYouUpdate("Categories", { value, onChangeCategory });
        return (
            <div className="categories">
                <ul>
                    {categories.map((categoryName, i) => (
                        <li
                            onClick={() => onChangeCategory(i)}
                            className={value === i ? "active" : ""}
                            key={i}
                        >
                            {categoryName}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
);
export default Categories;
