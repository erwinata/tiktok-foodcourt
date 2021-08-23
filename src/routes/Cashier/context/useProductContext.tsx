import { snakeToCamelCase } from "helpers/snakeToCamelCase";
import { isStringMatch } from "helpers/string";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { apiGetProducts } from "routes/Cashier/api/product";
import { sampleCategories } from "routes/Cashier/constants/samples";
import { ProductContext } from "routes/Cashier/context/ProductContext";
import { ICategory } from "types/interfaces/ICategory";
import { IProduct } from "types/interfaces/IProduct";

const useProductContext = () => {
  const { state, dispatch } = useContext(ProductContext);

  const fetchProductsAndCategories = useCallback(
    async (userId: number) => {
      const res = await apiGetProducts(userId);

      const resProducts: IProduct[] = [];
      const resCategories: ICategory[] = [{ id: 0, nama: "Semua" }];

      res?.data.data.forEach((categoryItem: any) => {
        resCategories.push(categoryItem);
        categoryItem.subdata.forEach((productItem: any) => {
          resProducts.push(productItem);
        });
      });

      dispatch({
        products: resProducts,
        shownProducts: resProducts,
        categories: resCategories,
      });
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
      dispatch({ activeCategory, shownProducts });
    },
    [dispatch, updateShownProducts]
  );

  return {
    productState: state,
    productAct: {
      fetchProductsAndCategories,
      resetProducts,
      searchProducts,
      selectCategory,
    },
  };
};

export default useProductContext;
