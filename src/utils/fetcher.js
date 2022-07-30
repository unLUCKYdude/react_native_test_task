const makeRequest = async ({ route, method = "GET", body }) => {
    try {
        const rawRes = await fetch(`https://jsonplaceholder.typicode.com${route}`, {
            method,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            ...(method != "GET" && {body: JSON.stringify(body)})
        });
        return {
            status: rawRes.status,
            body: await rawRes.json()
        };
    } catch (e) {
        return null;
    }
};

export const loadPosts = () => {
    return makeRequest({
        route: "/posts"
    });
};

export const loadUserByID = id => {
    return makeRequest({
        route: `/users?id=${id}`
    });
};

export const loadAlbumsByUserID = id => {
    return makeRequest({
        route: `/albums?userId=${id}`
    });
};

export const loadPhotosByAlbumID = id => {
    return makeRequest({
        route: `/photos?albumId=${id}`
    });
};