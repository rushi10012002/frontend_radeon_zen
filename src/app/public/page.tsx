'use client'
import "../globals.css"
import SearchIcon from '@/icons/search'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { video } from "../../redux/slices/videoDetails"
import { loader } from '@/redux/slices/loader'
import { useRouter } from 'next/navigation'
import moment from 'moment';
import { getVideoInPublic } from '@/services/getCall';
import InfiniteScroll from 'react-infinite-scroll-component';
import ChannelDetails from '@/components/channel.details';
import Link from "next/link"
import CardSkelTon from "@/components/card.skelton";

function PublicPage() {

    const login = useSelector((state: any) => state.auth.auth)
    const [videoList, setVideoList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [liveChannelList, setLiveChannelList] = useState([
        {
            "channelId": 1,
            "userId": 1,
            "name": "Gaming Zone",
            "bio": "Gaming Zone is the good channel for the entertainments",
            "type": "game",
            "profilePath": "Upload\\images\\1694072782205pexels-sebastiaan-stam-1097456.jpg",
            "coverPath": "",
            "createdAt": "2023-09-07T07:46:22.000Z",
            "updatedAt": "2023-09-07T07:46:22.000Z"
        },
        {
            "channelId": 2,
            "userId": 2,
            "name": "Gaming Zone test ",
            "bio": "test Gaming Zone is the good channel for the entertainments",
            "type": "test",
            "profilePath": "Upload\\images\\1694073974603th.jpg",
            "coverPath": "",
            "createdAt": "2023-09-07T08:06:14.000Z",
            "updatedAt": "2023-09-07T08:06:14.000Z"
        },
        {
            "channelId": 3,
            "userId": 3,
            "name": "Zamp Song",
            "bio": "test Zamp Zone is the good channel for the entertainments",
            "type": "song",
            "profilePath": "Upload\\images\\1694422074689pexels-photo-16130027.jpeg",
            "coverPath": "",
            "createdAt": "2023-09-11T08:47:54.000Z",
            "updatedAt": "2023-09-11T08:47:54.000Z"
        },
        {
            "channelId": 4,
            "userId": 4,
            "name": "Coding Players",
            "bio": "I am studying Software Development at university, on a one year conversion course. My main ",
            "type": "code",
            "profilePath": "Upload\\images\\169503225092672-729716_user-avatar-png-graphic-free-download-icon.png",
            "coverPath": "",
            "createdAt": "2023-09-18T10:17:32.000Z",
            "updatedAt": "2023-09-18T10:17:32.000Z"
        },


    ])
    const [details, setDetails] = useState({
        currentPage: 0,
        totalVideos: 0,
        totalPages: 0,
        channelsList: []

    })
    const router = useRouter()
    const dispatch = useDispatch()
    const handleKeyUpEvent = async (event: any) => {

        if (event.key == "Enter") {
            await setPage(1)
            await setHasMore(true)
            setVideoList([]);
            setDetails({
                currentPage: 0,
                totalVideos: 0,
                totalPages: 0,
                channelsList: []

            })
            handleVideoListData(page, event.target.value, true)
        }
        if (event.target.value == "") {
            setDetails({
                currentPage: 0,
                totalVideos: 0,
                totalPages: 0,
                channelsList: []

            })
            await setPage(1)
            await setHasMore(true)
            setVideoList([]);
            handleVideoListData(page, event.target.value, false)
        }


    }
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
    const handleSingleDetails = (item: any) => {
        dispatch(loader(true))
        dispatch(video(item))
        router.push("/videoDetails")
        dispatch(loader(false))
    }
    const handleVideoListData = (page: number, searchString: string, filter: boolean) => {
        getVideoInPublic(page, searchString, filter).then(res => {
            console.log(res.data.data);
            setDetails({
                currentPage: res.data.data.currentPage,
                totalPages: res.data.data.totalPages,
                channelsList: res.data.data.channelsList,
                totalVideos: res.data.data.videos.totalVideos
            })
            setTimeout(() => {
                // setPage(page + 1)
                setVideoList(res.data.data.videos.data)
            }, 100);

        })


    }
    const handleVideoListDataOnPage = () => {
        if (videoList.length < details.totalVideos) {

            getVideoInPublic(page + 1, "", false).then(res => {
                console.log(res.data.data);
                setDetails({
                    currentPage: res.data.data.currentPage,
                    totalPages: res.data.data.totalPages,
                    channelsList: res.data.data.channelsList,
                    totalVideos: res.data.data.videos.totalVideos
                })
                setTimeout(() => {
                    setVideoList([...videoList, ...res.data.data.videos.data])
                }, 100);

                setPage(page + 1)

            })
            return
        } else {
            setHasMore(false)
            return
        }


    }
    const handleChannelLive = (liveId: string) => {
        router.push(`/live/${liveId}`)
    }

    useEffect(() => {
        handleVideoListData(page, "", false)
    }, [])

    return (
        <div className='video-container ' style={{ minHeight: "98vh", maxHeight: "98vh", height: "100%", overflowY: "auto" }} id='scrollableDiv'>

            <div className="container-fluid">

                <div className="row bg-dark text-white py-2">
                    <div className="col-3" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                        <Link href={"/login"} style={{ textDecoration: "none", color: "white" }}>

                            <h2 style={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "800" }}  >readon<span style={{ color: "rgb(110, 196, 250)" }}>zen</span></h2>
                        </Link>
                    </div>
                    <div className="col-4 offset-5 d-flex align-items-center  "><input onKeyUp={handleKeyUpEvent} type="text" placeholder='serach video title/type/keywords' className='form-control mr-1 search-input bg-light' />
                        <div className="btn btn-light uppercase"><SearchIcon size={20} /></div>
                    </div>
                </div>
                {
                    login && <div className="row py-1 " style={{ backgroundColor: "rgba(110, 196, 250,0.2)" }}>
                        <div className="live-channel-list">
                            {
                                liveChannelList.map((item: any, i) => {
                                    return (
                                        <div key={i} onClick={() => handleChannelLive(item.channelId)} className="card border-danger live-card my-2" style={{ marginLeft: "1rem", minWidth: "200px" }} >
                                            <div className="card-body" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", }}>
                                                <div>
                                                    <img style={{ border: "1px solid red", borderRadius: "50%", width: "30px", height: "30px" }} src={`http://localhost:8000/${item?.profilePath}`} alt="" srcset="" />
                                                </div>
                                                <div style={{ marginLeft: "1rem" }}>
                                                    <small style={{ fontWeight: "600", fontSize: "14px" }}>{item.name}</small> <br />
                                                    {/* <small style={{ color: "gray", fontSize: "12px" }}>{sortString(item.bio, 50)}</small> */}
                                                </div>
                                            </div>
                                            <div className="live-tag px-2 py-1">live</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                }

                <div className="w-100 pt-3">
                    <InfiniteScroll
                        dataLength={videoList.length}
                        next={handleVideoListDataOnPage}
                        style={{ width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}
                        endMessage={
                            <h1> </h1>
                        }
                        hasMore={hasMore}
                        loader={<CardSkelTon />}
                        scrollableTarget="scrollableDiv"
                    >
                        <div className="row">
                            {
                                videoList.map((item: any, i: number) => {
                                    return (
                                        <div className="col-xl-3  col-lg-4 col-md-12  col-12 mt-3 px-1  " style={{ minHeight: "350px", maxHeight: "350px", height: "350px", cursor: "pointer" }} key={i}>
                                            <div className="card h-100 border-0 hover-shadow" style={{ backgroundColor: item.status == 0 ? "#80808052" : "" }} >

                                                <div className="card-body m-0 p-0 px-3" >
                                                    <div>
                                                        <ChannelDetails id={item.channelId} channelList={details.channelsList} />
                                                    </div>
                                                    <div onClick={() => handleSingleDetails(item)}>
                                                        <img className='video-Thum  ' src={item.coverPath == "" ? "http://localhost:3000/995.jpg" : `http://localhost:8000/${item.coverPath}`} alt={item.title} />
                                                        <h4 className='video-h4 mt-1'>{sortString(item.title, 35)}</h4>
                                                        <h4 className='video-h5'>{sortString(item.subTitle, 35)}</h4>

                                                        <small>{moment(item.createdAt).startOf('millisecond').fromNow()}</small>
                                                    </div>



                                                </div>


                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>

                    </InfiniteScroll>

                </div>
            </div>
        </div>
    )
}

export default PublicPage