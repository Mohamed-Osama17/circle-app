'use client'
import { useDispatch, useSelector } from "react-redux"
import { State, storeDispatch } from "../_redux/store"
import { useEffect } from "react";
import { getUserPosts } from "../_redux/postsSlice";
import { jwtDecode, JwtPayload } from "jwt-decode";
import Loading from "../loading";
import PostDetails from "../_postDetails/page";

export default function Profile() {
    let { posts, loading } = useSelector((store: State) => store.postsReducer);
    let dispatch = useDispatch<storeDispatch>();

    // Extend the default JwtPayload to include your custom "user"
    interface CustomJwtPayload extends JwtPayload {
        user: string; // or an object if your user field is more complex
    }

    const token = `${localStorage.getItem('token')}`;
    // Decode with your custom type
    const { user } = jwtDecode<CustomJwtPayload>(token); // Returns with the JwtPayload type

    useEffect(() => {
        dispatch(getUserPosts(user));
    }, [])
    return <>
        {loading ? <Loading /> : posts.toReversed().map((post) => <PostDetails key={post._id} post={post} isComments={true} />)}
    </>

}
