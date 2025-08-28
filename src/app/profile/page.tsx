'use client'

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { State, storeDispatch } from "../_redux/store";
import { getUserPosts } from "../_redux/postsSlice";
import { getLocalStorageItem } from "../utils/storage";

import Loading from "../loading";
import PostDetails from "../_postDetails/page";

// Extend the default JwtPayload for custom claims
interface CustomJwtPayload extends JwtPayload {
    user: string;
}

export default function Profile() {
    const dispatch = useDispatch<storeDispatch>();
    const { posts, loading } = useSelector((store: State) => store.postsReducer);

    // Safely decode token only once
    const user = useMemo(() => {
        const token = getLocalStorageItem("token");
        if (!token) return null;

        try {
            const { user } = jwtDecode<CustomJwtPayload>(token);
            return user;
        } catch (err) {
            console.error("Invalid token", err);
            return null;
        }
    }, []);

    // Fetch user posts when user is available
    useEffect(() => {
        if (user) {
            dispatch(getUserPosts(user));
        }
    }, [dispatch, user]);

    if (loading) return <Loading />;

    return (
        <>
            {posts
                .slice() // clone array safely
                .reverse()
                .map((post) => (
                    <PostDetails key={post._id} post={post} isComments />
                ))}
        </>
    );
}
