import axios from "axios";

export const getAllEmails = async (page: number, status: string, email: string) => {
    const result = await fetch(`http://localhost:8000/api/v1/e-mail/list?page=${page}&limit=17&status=${status}&email=${email}`, {

    })

    return result.json();
}
export const updateEmailStatus = async (body: any) => {
    const result = await fetch("http://localhost:8000/api/v1/e-mail/status", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })

    return result.json();
}
export const postEmail = async (body: any) => {

    const result = await axios.post("http://localhost:8000/api/v1/e-mail/new-email", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return result;
}
export const getEmailDetails = async (id: number) => {
    const result = await axios.get(`http://localhost:8000/api/v1/e-mail/list/${id}`)
    return result;
}
export const loginUser = async (body: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/users/new-user", body)
    return result;
}
export const checkChannel = async (body: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/channel/new-channel", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return result;
}
export const createPost = async (body: any, onUploadProgress: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/post/new-post", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
        onUploadProgress
    })
    return result;
}
export const getAllVideo = async (page: number, channelId: number, formData: object) => {
    const result = await fetch(`http://localhost:8000/api/v1/post/get-video?limit=15&page=${page}&channelId=${channelId}&filter=${formData.filter}&searchString=${formData.searchString}`, {

    })

    return result.json();
}
export const upDatePost = async (body: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/post/update-post", body, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return result;
}
export const getVideoTypePost = async (page: number, type: string) => {
    const result = await axios.get(`http://localhost:8000/api/v1/post/get-video-type?limit=20&page=${page}&type=${type}`)
    return result;
}
export const updateStatus = async (postId: number, status: number) => {
    const result = await axios.put("http://localhost:8000/api/v1/post/update-status", { postId, status })
    return result;
}
export const watchList = async (formData: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/post/watch-later-video", formData, {})
    return result;
}
export const getWatchList = async (userId: number) => {
    const result = await axios.get(`http://localhost:8000/api/v1/post/watch-later-video?userId=${userId}`)
    return result;
}
export const createPlayList = async (formData: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/post/new-playlist", formData, {})
    return result;
}
export const getPlayList = async (userId: number) => {
    const result = await axios.get(`http://localhost:8000/api/v1/post/get-playlist?userId=${userId}`, {})
    return result;
}
export const addVideoInCollection = async (formData: any) => {
    const result = await axios.post("http://localhost:8000/api/v1/post/new-collection", formData, {})
    return result;
}
export const getVideoInCollection = async (playListId: number) => {
    const result = await axios.get(`http://localhost:8000/api/v1/post/get-collection?playListId=${playListId}`, {})
    return result;
}
export const getVideoInPublic = async (page: number, searchString: string, filter: boolean) => {
    const result = await axios.get(`http://localhost:8000/api/v1/post/public/videos?filter=${filter}&searchString=${searchString}&page=${page}`, {})
    return result;
}