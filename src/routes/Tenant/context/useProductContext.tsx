import { apiGet } from "helpers/api";
import { snakeToCamelCase } from "helpers/snakeToCamelCase";
import { isStringMatch } from "helpers/string";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { API_GET_PRODUCT } from "constants/api";
import { sampleCategories } from "routes/Tenant/constants/samples";
import { ProductContext } from "routes/Tenant/context/ProductContext";
import { ICategory } from "types/interfaces/ICategory";
import { IProduct } from "types/interfaces/IProduct";

const useProductContext = () => {
  const { state, dispatch } = useContext(ProductContext);

  const updateState = useCallback(
    (newPartialState: Partial<typeof state>) => {
      dispatch(newPartialState);
    },
    [dispatch]
  );

  const updateShownProducts = useCallback(
    ({
      activeCategory = state.activeCategory,
      searchQuery = state.searchQuery,
    }: {
      activeCategory?: number;
      searchQuery?: string;
    }) => {
      let matchedProducts = state.products;
      matchedProducts = state.products.filter((item) => {
        return (
          (activeCategory === 0 || item.kategoriId === activeCategory) &&
          (isStringMatch(searchQuery, item.nama) ||
            isStringMatch(searchQuery, item.deskripsi))
        );
      });
      return matchedProducts;
    },
    [state.activeCategory, state.products, state.searchQuery]
  );

  const resetProducts = useCallback(async () => {
    const activeCategory = 0;
    const searchQuery = "";
    const shownProducts = updateShownProducts({ activeCategory, searchQuery });
    dispatch({ activeCategory, shownProducts });
  }, [dispatch, updateShownProducts]);

  const searchProducts = useCallback(
    async (searchQuery: string) => {
      const shownProducts = updateShownProducts({ searchQuery });
      dispatch({ searchQuery, shownProducts });
    },
    [dispatch, updateShownProducts]
  );

  const selectCategory = useCallback(
    async (activeCategory: number) => {
      const shownProducts = updateShownProducts({ activeCategory });
      console.log(activeCategory, shownProducts);
      dispatch({ activeCategory, shownProducts });
    },
    [dispatch, updateShownProducts]
  );

  return {
    productState: state,
    productAct: {
      updateState,
      resetProducts,
      searchProducts,
      selectCategory,
    },
  };
};

export default useProductContext;
