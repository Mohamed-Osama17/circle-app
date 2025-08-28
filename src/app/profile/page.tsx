'use client'
import { useDispatch, useSelector } from "react-redux"
import { State, storeDispatch } from "../_redux/store"
import { useEffect } from "react";
import { getUserPosts } from "../_redux/postsSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Loading from "../loading";
import PostDetails from "../_postDetails/page";
import { getLocalStorageItem } from "../utils/storage";

export default function Profile() {
    const { posts, loading } = useSelector((store: State) => store.postsReducer);
    const dispatch = useDispatch<storeDispatch>();

    // Extend the default JwtPayload to include your custom "user"
    interface CustomJwtPayload extends JwtPayload {
        user: string; // or an object if your user field is more complex
    }

    const token = `${getLocalStorageItem("token")}`;
    // Decode with your custom type
    const { user } = jwtDecode<CustomJwtPayload>(token); // Returns with the JwtPayload type

    useEffect(() => {
        dispatch(getUserPosts(user));
    }, [])
    return <>
        {loading ? <Loading /> : posts.toReversed().map((post) => <PostDetails key={post._id} post={post} isComments={true} />)}
    </>

}
