import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isError } from '../utilsStore';

export const fetchSingleProduct = createAsyncThunk(
  'singleProduct/fetchSingleProduct',
  async function (productID,{ rejectWithValue, fulfillWithValue, extra: api }) {
    try {
      const goods = await api.getSingleProduct(productID);

      return fulfillWithValue(goods);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const fetchSetReview = createAsyncThunk(
  'singleProduct/fetchSetReview',
  async function ({productID, data: body},{ rejectWithValue, fulfillWithValue, extra: api }) {
    try {
      const goods = await api.setReview(productID, body);
      return fulfillWithValue(goods);

    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const initialState = {
  goods: {},
  loading: true,
  error: null,
};

const singleProductSlice = createSlice({
  name: 'singleProduct',
  initialState,
  reducers: {
    setProductState: (state, action) => {
      state.goods = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.goods = action.payload;
        state.loading = false;
      })
      .addCase(fetchSetReview.fulfilled, (state, action) => {
        state.goods = action.payload;
        state.loading = false;
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
  },
});

export const { setProductState } = singleProductSlice.actions; 
export default singleProductSlice.reducer;
