'use client'
import { video } from "../../redux/slices/videoDetails"
import { loader } from '@/redux/slices/loader'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { getPlayList, getVideoInCollection, getWatchList } from "@/services/getCall"
import Protected from "@/components/protected";
import { toast } from 'react-toastify'
import moment from "moment"
function WatchLaterPage() {
    const user = useSelector((state: any) => state.auth?.user)
    const router = useRouter()
    const dispatch = useDispatch()
    const [tabs, setTabs] = useState("watch Later")
    const [videoList, setVideoList] = useState([])
    const [playList, setPlayList] = useState([])
    const [playListVideo, setPlayListVideo] = useState([])
    const handleSingleDetails = (item: any) => {
        dispatch(loader(true))
        dispatch(video(item))
        router.push("/videoDetails")
        dispatch(loader(false))
    }
    async function fetchVideo() {
        const res = await getWatchList(user?.userId)
        setVideoList(res.data.video)

    }
    const handleOnPlayList = async () => {
        const res = await getPlayList(user.userId);
        console.log(res);

        if (res.data.code == "1111") {
            setPlayList(res.data.playList)
        } else {
            toast.error(res.data.message)
        }
    }
    const handleOnChangeType = async (e: any) => {

        const res = await getVideoInCollection(e.target.value)

        if (res.data.code == "1111") {
            setPlayListVideo(res.data.videos)
        } else {
            toast.error(res.data.message)
        }
    }
    const handleOnTabs = (name: string) => {
        setTabs(name)
        switch (name) {
            case "PlayList":
                handleOnPlayList()
                return null
            case "History":

                break;

            default:
                break;
        }

    }
    useEffect(() => {
        fetchVideo()
    }, [])
    const sortString = (str: string, size: number) => {
        let strLength = str?.length
        let newStr = ""
        if (strLength > size) {
            newStr = str.slice(0, size) + "..."
        } else {
            newStr = str
        }
        return newStr
    }

    return (
        <Protected>
            <div className="container" style={{ minHeight: "98vh", maxHeight: "98vh", height: "100%", overflowY: "auto" }}>
                <div className="row pb-3" >
                    <div className="col-12 pt-2 mt-3" style={{ backgroundColor: "#6ec4fa4f" }}>
                        <ul className="nav nav-tabs">
                            <li className="nav-item" onClick={() => handleOnTabs("watch Later")}>
                                <div className={`nav-link text-dark ${tabs == "watch Later" && "active"}`} aria-current="page" >watch Later</div>
                            </li>
                            <li className="nav-item" onClick={() => handleOnTabs("PlayList")}>
                                <div className={`nav-link text-dark ${tabs == "PlayList" && "active"}`} >PlayList</div>
                            </li>
                            <li className="nav-item" onClick={() => handleOnTabs("History")}>
                                <div className={`nav-link text-dark ${tabs == "History" && "active"}`} >History</div>
                            </li>

                        </ul>
                    </div>
                </div>
                <div className="row">
                    {
                        tabs == "watch Later" && videoList.map((item: any, i) => {
                            return (
                                <div className="col-xl-3  col-lg-6 col-md-12  col-12 mt-3 px-1  " style={{ minHeight: "200", maxHeight: "200", height: "200" }} key={i}>
                                    <div className="card h-100 border-0 shadow" >
                                        <div className="card-body m-0 p-0 px-3" onClick={() => handleSingleDetails(item)}>
                                            <img className='video-Thum-watch  ' src={item.coverPath == "" ? "http://localhost:3000/995.jpg" : `http://localhost:8000/${item.coverPath}`} alt={item.title} />
                                            <h4 className='video-h4'>{item.title}</h4>
                                            <h4 className='video-h5'>{item.subTitle}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        tabs == "PlayList" && <div>
                            {/* <h1>PlayList</h1> */}
                            <div className="row">
                                <div className="col-3">
                                    {
                                        playList?.map((playListData: any, index: number) => {
                                            return (
                                                <div key={index}>
                                                    <div className="card bg-dark text-white mt-2" >
                                                        <div className="card-body">
                                                            <h5><input onChange={handleOnChangeType} className="mr-5" type="radio" name="type" value={playListData.playListId} /> <label htmlFor="type"><span style={{ marginLeft: ".3rem", textTransform: "capitalize" }}> {playListData.name}</span></label></h5>
                                                            <div style={{ fontSize: "14px", color: "grey", textAlign: "end" }}>{moment(playListData.createdAt).startOf('minute').fromNow()}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="col-9 " style={{ backgroundColor: "aliceblue" }}>
                                    {
                                        playListVideo.length > 0 ? playListVideo.map((video: any, num) => {
                                            return (
                                                <div className="row mt-2 " key={num}>
                                                    <div className="col-12">
                                                        <div className="card shadow">
                                                            <div className="card-body">
                                                                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }} onClick={() => handleSingleDetails(video)}>
                                                                    <img className='video-Thum-playlist  ' src={video.coverPath == "" ? "http://localhost:3000/995.jpg" : `http://localhost:8000/${video.coverPath}`} alt={video.title} />
                                                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-evenly", marginLeft: "1rem" }}>
                                                                        <h4 className='video-h4 mt-1 ml-3'>{sortString(video.title, 100)}</h4>
                                                                        <h4 className='video-h5'>{sortString(video.subTitle, 100)}</h4>
                                                                        <small>{moment(video.createdAt).startOf('millisecond').fromNow()}</small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }) : <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <h1>
                                                No records found
                                            </h1>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {
                        tabs == "History" && <div>
                            <h1>History</h1>
                        </div>
                    }
                </div>
            </div>
        </Protected>
    )
}

export default WatchLaterPage