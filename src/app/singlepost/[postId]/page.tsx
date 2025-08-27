'use client'
import PostDetails from "@/app/_postDetails/page";
import { getSinglePost } from "@/app/_redux/postsSlice";
import { State, storeDispatch } from "@/app/_redux/store";
import Loading from "@/app/loading";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SinglePost() {

    const { post, loading } = useSelector((store: State) => store.postsReducer);
    const dispatch = useDispatch<storeDispatch>();
    const { postId } = useParams()

    useEffect(() => {
        dispatch(getSinglePost(`${postId}`));
    }, [])

    return <>
        {loading ? <Loading /> : post && <PostDetails post={post} isComments={true} />}
    </>


}
