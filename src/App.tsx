import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./scss/app.scss";

import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
const Cart = React.lazy(() => import("./pages/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="saintam.github.io/react-pizza/" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <Cart />
                        </Suspense>
                    }
                />
                <Route
                    path="pizza/:id"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <Suspense fallback={<div>Loading...</div>}>
                            <NotFound />
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}

export default App;
