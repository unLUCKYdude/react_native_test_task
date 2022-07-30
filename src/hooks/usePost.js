import { useState } from "react";
import { loadPhotosByAlbumID, loadUserByID, loadAlbumsByUserID } from "../utils/fetcher";

const usePost = userID => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const reload = async () => {
        setIsLoading(true);
        setError(false);
        setData(null);
        const res_user = await loadUserByID(userID);
        if (!res_user || res_user.status != 200) {
            setError(true);
            setIsLoading(false);
            return;
        }
        const res_albums = await loadAlbumsByUserID(userID);
        if (!res_albums || res_albums.status != 200) {
            setError(true);
            setIsLoading(false);
            return;
        }
        const index = Math.floor(Math.random() * res_albums.body.length);
        const res_photos = await loadPhotosByAlbumID(res_albums.body[index].id);
        if (!res_photos || res_photos.status != 200) {
            setError(true);
            setIsLoading(false);
            return;
        }
        const numOfPhoto = Math.floor(Math.random() * 4) + 2;
        setData({
            name: res_user.body[0].name,
            company: res_user.body[0].company.name,
            photos: res_photos.body.filter((_, index) => index < numOfPhoto).map(item => {
                return {
                    id: item.id,
                    uri: item.url
                };
            })
        });
        setIsLoading(false);
    };
    return [reload, isLoading, data, error];
};

export default usePost;