import { useState } from "react";
import { loadPosts } from "../utils/fetcher";

const getNRandomItems = (arr, n) => {
    let prev = [...arr], next = [];
    for (let i = 0; i < n && i < prev.length; i++) {
        const index = Math.floor(Math.random() * prev.length);
        next.push(...prev.splice(index, 1));
    }
    return next;
};

const usePosts = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const reload = async () => {
        setIsLoading(true);
        setError(false);
        setData(null);
        const res = await loadPosts();
        if (!res || res.status != 200) {
            setError(true);
            return;
        }
        const n = Math.floor(Math.random() * 11) + 5;
        setData(getNRandomItems(res.body, n));
        setIsLoading(false);
    };
    return [reload, isLoading, data, error];
};

export default usePosts;