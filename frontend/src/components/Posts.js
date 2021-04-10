import React, { useCallback, useContext, useEffect } from 'react';
import axios from 'axios';

import AppContext from '../AppContext/AppContext';

import PostItem from './PostItem';

const Posts = () => {

    const { state, dispatch } = useContext(AppContext);
    const { posts, user } = state;

    const getAllPosts = useCallback(async () => {
        try {
            const option = { method: "get", url: "/api/posts" }
            const response = await axios(option);
            const posts = response.data.data.posts;
            dispatch({ type: "GET_ALL_POSTS", payload: posts });
        } catch (error) {
            console.log(error.message);
        }
    }, [dispatch])

    useEffect(() => {
        getAllPosts();
    }, [getAllPosts])

    const newPosts = posts.map((post) => {
        if (user) {
            return post.author.name === user.userName
                ? { ...post, isEditable: true }
                : post
        } 
        else {
            return { ...post, isEditable: false };
        }
    })

    // console.log(newPosts);

    return (
        <div>
            <section className="post-section">
                <div className="post-list">
                    {/* <PostItem /> */}
                    {newPosts.map((post)=>(
                        <PostItem post ={post} key={post._id}/>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Posts;