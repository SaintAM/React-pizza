import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Categories from "../components/Categories";
import Sort, { list } from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Pagination from "../components/Pagination";
// import { SearchContext } from "../App";
import { useSelector } from "react-redux";
import {
    setCategoryId,
    setCurrentPage,
    setFilters,
} from "../redux/filter/slice"
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/store";
import { selectPizzaData } from "../redux/pizza/selector";
import { selectFilter } from "../redux/filter/selector";
import { fetchPizzas } from "../redux/pizza/asyncActions";
import { SearchPizzaParams } from "../redux/pizza/types";

const Home: React.FC = () => {
    // const { searchValue } = useContext(SearchContext);
    // =====================================================================
    const { status, items } = useSelector(selectPizzaData);

    // const [items, setItems] = useState([]);
    // const [isLoading, setIsLoading] = useState(true);
    // =====================================================================
    const isSearch = useRef(false);
    const isMounted = useRef(false);
    // =====================================================================
    const navigate = useNavigate();
    // =====================================================================
    const { categoryId, sort, currentPage, searchValue } =
        useSelector(selectFilter);
    // =====================================================================
    // типизированный dispatch (useAppDispatch <= это он)
    const dispatch = useAppDispatch();
    // =====================================================================
    const getPizzas = async () => {
        // setIsLoading(true);

        const order = sort.sortProperty.includes("-") ? "ask" : "desc";
        const sortBy = sort.sortProperty.replace("-", "");
        const category = categoryId > 0 ? `category=${categoryId}` : "";
        const search = searchValue ? `&search=${searchValue}` : "";

        dispatch(
            //  Типизируем dispatch т.к. он не знает что такое асинхр.экшены
            // Создаем в store.ts продвинутый dispatch
            fetchPizzas({
                order,
                sortBy,
                category,
                search,
                currentPage: String(currentPage),
            })
        );

        window.scrollTo(0, 0);
    };
    // =====================================================================
    const onChangeCategory = useCallback(
        (id: number) => {
            dispatch(setCategoryId(id));
        }, []);
    const onChangePage = (page: number) => {
        dispatch(setCurrentPage(page));
    };
    // =====================================================================
    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(
                window.location.search.substring(1)
            ) as unknown as SearchPizzaParams;
            const sort = list.find((obj) => obj.sortProperty === params.sortBy);
            // if (sort) {
            //     params.sortBy = sort;
            // }
            dispatch(
                setFilters({
                    searchValue: params.search,
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort || list[0],
                })
            );

            isSearch.current = true;
        }
    }, []);
    // ======================================================================
    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryId, sort.sortProperty, currentPage]);
    // ======================================================================
    useEffect(() => {
        // window.scrollTo(0, 0);

        // if (!isSearch.current) {
        getPizzas();
        // }

        // isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage]);

    // =====================================================================
    const skeletons = [...new Array(4)].map((_, index) => (
        <Skeleton key={index} />
    ));
    const pizzas = items.map((obj: any) => (
        <PizzaBlock key={obj.id} {...obj} />
    ));
    // =====================================================================
    return (
        <>
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort value = {sort}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === "error" ? (
                <div className="content__error-info">
                    <h2>Упс 😕</h2>
                    <p>
                        К сожалению не получилось получить питсы. Попробуйте
                        позже
                    </p>
                </div>
            ) : (
                <div className="content__items">
                    {status === "loading" ? skeletons : pizzas}
                </div>
            )}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </>
    );
};

export default Home;

// const [categoryId, setCastoretegoryId] = useState(0);
// const [currentPage, setCurrentPage] = useState(1);   ЭТО ПАГИНАЦИЯ
// const [sortType, setSortType] = useState({
//     name: "популярности",
//     sortProperty: "rating",
// });

//====================================REDUX=============================

//в 'useSelector' пропихиваем наше "СОСТОЯНИЕ", которое в 'store.js', далее
//filter это название в filterSlice.js и берем categoryId (state.filter.categoryId))
// const categoryId = useSelector ((state)=> state.filter.categoryId)
// const sortType = useSelector ((state)=> state.filter.sortProperty)
// ========Но мы заменили две выше строчки на нижнюю
// const { categoryId, sort, currentPage } = useSelector(
//     (state) => state.filter
// );

// ================================fetch====================================

// fetch(
//     `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
// )
//     .then((res) => res.json())
//     .then((arr) => {
//         setItems(arr);
//         setIsLoading(false);
//     });

// ================================axios and then====================================

// axios
//   .get(
//       `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
//   )
//   .then((res) => {
//      setItems(res.data);
//      setIsLoading(false);
//   });
