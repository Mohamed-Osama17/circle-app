import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "../interfaces";

// ----------------------
// Types
// ----------------------
interface PostsError {
  message: string;
  status?: number;
}

interface PostsState {
  loading: boolean;
  posts: Post[];
  post: Post | null;
  error: PostsError | null;
}

const initialState: PostsState = {
  loading: false,
  posts: [],
  post: null,
  error: null,
};

// ----------------------
// Thunks
// ----------------------
export const getPosts = createAsyncThunk<
  Post[],
  void,
  { rejectValue: PostsError }
>("posts/getPosts", async (_, { rejectWithValue }) => {
  try {
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

    if (!response.ok) {
      return rejectWithValue({
        message: "Failed to fetch posts",
        status: response.status,
      });
    }

    const data = await response.json();
    return data.posts as Post[];
  } catch (err) {
    return rejectWithValue({
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export const getSinglePost = createAsyncThunk<
  Post,
  string,
  { rejectValue: PostsError }
>("posts/getSinglePost", async (postId, { rejectWithValue }) => {
  try {
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

    if (!response.ok) {
      return rejectWithValue({
        message: "Failed to fetch post",
        status: response.status,
      });
    }

    const data = await response.json();
    return data.post as Post;
  } catch (err) {
    return rejectWithValue({
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export const getUserPosts = createAsyncThunk<
  Post[],
  string,
  { rejectValue: PostsError }
>("posts/getUserPosts", async (userId, { rejectWithValue }) => {
  try {
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

    if (!response.ok) {
      return rejectWithValue({
        message: "Failed to fetch user posts",
        status: response.status,
      });
    }

    const data = await response.json();
    return data.posts as Post[];
  } catch (err) {
    return rejectWithValue({
      message: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

// ----------------------
// Slice
// ----------------------
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // getPosts
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(
        getPosts.rejected,
        (state, action: PayloadAction<PostsError | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? { message: "Unknown error" };
        }
      )
      // getSinglePost
      .addCase(getSinglePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSinglePost.fulfilled,
        (state, action: PayloadAction<Post>) => {
          state.loading = false;
          state.post = action.payload;
        }
      )
      .addCase(
        getSinglePost.rejected,
        (state, action: PayloadAction<PostsError | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? { message: "Unknown error" };
        }
      )
      // getUserPosts
      .addCase(getUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getUserPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.loading = false;
          state.posts = action.payload;
        }
      )
      .addCase(
        getUserPosts.rejected,
        (state, action: PayloadAction<PostsError | undefined>) => {
          state.loading = false;
          state.error = action.payload ?? { message: "Unknown error" };
        }
      );
  },
});

export const postsReducer = postSlice.reducer;
