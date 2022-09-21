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

    const handleDelete = async (post)=>{
        await axios.delete(api + "/" + post.id + post);
        setPosts(posts.filter((p) => p.id !== post.id))
    }



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
                        <td><button className="btn btn-info btn-sm" onClick={() => handleDelete(post)}> delete</button></td>
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