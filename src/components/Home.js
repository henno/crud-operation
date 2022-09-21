import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";

const Home = () => {

    const [posts, setPosts] = useState([]);
    const api = 'https://jsonplaceholder.typicode.com/users'
    useEffect(()=>{
        const getPosts = async () =>{
            const {data:res} = await axios.get(api)
            setPosts(res)
        };
        getPosts();
    },[]);
    return (
        <>
            <div className="container">
                <h2>Hello world</h2>
                <button className="btn btn-primary"> add post</button>
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
            </div>
        </>
    );
};

export default Home;