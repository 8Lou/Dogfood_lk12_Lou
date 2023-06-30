//Начало изучения редакс...
import api from "../../utils/Api";
import { filterFavoriteProd } from "../../utils/Utils";
import { isError, isLoading } from "../utilsStore";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  goods: [],
  loading: false,
  total: 0,
  favorites: [],
};


export const fetchGoods = createAsyncThunk(
  "goods/fetchGoods",
  async function (id, { fulfillWithValue, getState, rejectWithValue }) {
    try {
      const state = getState();
      const data = await api.getProducts();
      return fulfillWithValue({ ...data, userId: state.user.data?._id });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSwithLike = createAsyncThunk(
  "goods/fetchSwithLike",
  async function (data, arg) {
    console.log({ data });
    try {
      const updatedCard = await api.swithLike(
        data.goods._id,
        data.wasLiked
      );
      return arg.fulfillWithValue({ updatedCard, wasLiked: data.wasLiked });
    } catch (error) {
      return arg.rejectWithValue(error);
    }
  }
);

export const searchGoodsByQuery = createAsyncThunk('goods/searchGoodsByQuery', async function (search, {fulfillWithValue, rejectWithValue}) {
  
  try {
    const result = await api.searchProducts(search);
    return fulfillWithValue(result)
  } catch (error) {
    return rejectWithValue(error)
  }
})


const products = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    // ПОЛУЧАЕМ СПИСОК ПРОДУКТОВ
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      const authorCards = filterFavoriteProd(action.payload.products) ?? [];
      state.products = authorCards;
      state.favorites = authorCards.filter((e) =>
        filterFavoriteProd(e, action.payload.userId)
      );
      state.total = action.payload.total;
    });
    // Меняем лайк на продукте (на странице продукта или на странице каталога)
    builder.addCase(fetchSwithLike.fulfilled, (state, action) => {
      // const { updatedCard, wasLiked } = payload;
      const updatedCard = action.payload.updatedCard;
      const wasLiked = action.payload.wasLiked;
      // ОБНОВЛЯЕМ состояние карточек(продуктов) внутри слайса Продукты
      state.products = state.products.map((e) =>
        e._id === updatedCard?._id ? updatedCard : e
      );
      // ОБНОВЛЯЕМ состояние избранных карточек(продуктов) внутри слайса Продукты
      if (wasLiked) { 
        // favorites/ убавляем
        state.favorites = state.favorites.filter((f) => f._id !== updatedCard._id);
      } else {
        // favorites/ добавляем
        state.favorites =[...state.favorites, updatedCard];
      }
    });
    builder.addCase(searchGoodsByQuery.fulfilled, (state, {payload})=>{
      state.products = filterFavoriteProd(payload);
    });

    builder.addMatcher(isError, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addMatcher(isLoading, (state) => {
      // state.loading = true;
    });
  },
});
// ----------------------------------------------------

export const { sortHandler } = products.actions;
// export const setList = products.actions.setList;

export default products.reducer;
