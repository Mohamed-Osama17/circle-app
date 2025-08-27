import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

const initialState = {
  loading: false as boolean,
  posts: [] as Post[],
  post: null as Post | null,
  error: null as any,
};

export const getPosts = createAsyncThunk("posts/getPosts", async () => {
  const response = await fetch(
    `https://linked-posts.routemisr.com/posts?limit=50`,
    {
      method: "GET",
      headers: {
        token: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.posts;
});

export const getSinglePost = createAsyncThunk(
  "posts/getSinglePost",
  async (postId: string) => {
    const response = await fetch(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      {
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.post;
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (userId: string) => {
    const response = await fetch(
      `https://linked-posts.routemisr.com/users/${userId}/posts`,
      {
        method: "GET",
        headers: {
          token: `${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data.posts;
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getSinglePost.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSinglePost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getSinglePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getUserPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    });
    builder.addCase(getUserPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const postsReducer = postSlice.reducer;
