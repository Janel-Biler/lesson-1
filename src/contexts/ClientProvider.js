import React from "react";
import { watchesApi } from "../helpers/const";

export const ClientContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_WATCHES")
    return { ...state, watches: action.payload };
  return state;
};

function ClientProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    watches: [],
  });

  const [searchWord, setSearchWord] = React.useState("");
  const [filterByPrice, setFilterByPrice] = React.useState([0, 999999]);

  const limit = 1;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  // ! 10/3 = 3.333333; 3
  // ! 10 /4 = 2.5; 3

  // ! Math.ceil(1.2)2
  // ! Math.floor1.2)1
  // ! Math.round(1.2)1, 1.5 => 2

  const getWatches = () => {
    fetch(
      `${watchesApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-Total-Count"));
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_WATCHES",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! bASKET FUNCTIOMNAL
  const addWatchToBasket = (watch) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let watchToBasket = {
      ...watch,
      count: 1,
      subPrice: watch.price,
    };
    console.log(watchToBasket);
  };

  const data = {
    filterByPrice,
    searchWord,
    pagesCount,
    currentPage,
    watches: state.watches,
    getWatches,
    setSearchWord,
    setFilterByPrice,
    setCurrentPage,
    addWatchToBasket,
  };

  return (
    <ClientContext.Provider value={data}>{children}</ClientContext.Provider>
  );
}

export default ClientProvider;
