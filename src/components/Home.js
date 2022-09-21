import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import Example from "./adduser";



const Home = () => {

    const [posts, setPosts] = useState([]);
    const api = 'https://jsonplaceholder.typicode.com/users'
    useEffect(() => {
        const getPosts = async () => {
            const {data: res} = await axios.get(api)
            setPosts(res)
        };
        getPosts();
    },[]);

    const addPost = async () => {
        const user = {name: 'username', username: 'New Username'};
        await axios.post(api,user)
        setPosts([user,...posts]);
    };



    return (
        <>

        <div className="container">


            <table className="table">
                <thead>
                <tr>
                    <th>name</th>
                    <th>username</th>
                    <th>email</th>
                </tr>
                </thead>
                <tbody>
                {posts.map(post =>
                    <tr key={post.id}>
                        <td>{post.name}</td>
                        <td>{post.username}</td>
                        <td>{post.email}</td>
                        <td><button className="btn btn-info btn-sm"> update</button></td>
                        <td><button className="btn btn-info btn-sm"> delete</button></td>
                    </tr>
                )}
                </tbody>
            </table>
            <Example posts={posts} setPosts={setPosts}/>
        </div>
        </>
    );
};




export default Home;