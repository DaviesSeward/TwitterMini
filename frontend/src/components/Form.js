import React, { useContext, useState } from 'react';
import axios from 'axios';

import AppContext from '../AppContext/AppContext';

const Form = () => {
    const { state, dispatch } = useContext(AppContext);
    const { user } = state;
    const [postInput, setPostInput] = useState({ content: "" });
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem("token");
            const option = {
                method: "post",
                url: "/api/posts",
                data: postInput,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            const response = await axios(option);

            const { post } = response.data.data;
            const author = {
                _id: post.author,
                name: user.userName
            }

            dispatch({
                type: "CREATE_ONE_POST", payload: {
                    ...post,
                    author,
                    isEditable: true
                }
            })
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    }


    return (
        <div>
            <section className="forn-section">
                <form className="form" onSubmit={onSubmitHandle}>
                    <textarea
                        name="content"
                        id="content"
                        className="content"
                        placeholder="What's happening?"
                        onChange={(e)=>setPostInput({
                            ...postInput, [e.target.name]: e.target.value
                        })}
                    ></textarea>
                    <button className="btn" type="submit">Tweet</button>
                </form>
            </section>
        </div>
    );
};

export default Form;