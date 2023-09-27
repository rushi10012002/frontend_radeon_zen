/* eslint-disable @next/next/no-img-element */
'use client'
import CardSkelTon from '@/components/card.skelton'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux'
import { video } from "../../../redux/slices/videoDetails"
import { loader } from '@/redux/slices/loader'
import { useRouter } from 'next/navigation'
import { getAllVideo, getVideoInPublic } from '@/services/getCall'
import moment from 'moment';
function ChannelProfilePage() {
    const [videoList, setVideoList] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [page, setPage] = useState(1)
    const [details, setDetails] = useState({
        currentPage: 0,
        totalVideos: 0,
        totalPages: 0,


    })
    const router = useRouter()
    const dispatch = useDispatch()
    const channelDetailsData = useSelector((state: any) => state.channel?.channel)
    const handleKeyUpEvent = async (event: any) => {

        if (event.key == "Enter") {
            await setPage(1)
            await setHasMore(true)
            setVideoList([]);
            setDetails({
                currentPage: 0,
                totalVideos: 0,
                totalPages: 0,


            })
            handleVideoListData(page, event.target.value, true)
        }
        if (event.target.value == "") {
            setDetails({
                currentPage: 0,
                totalVideos: 0,
                totalPages: 0,


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
    const handleVideoListData = async (page: number, searchString: string, filter: boolean) => {
        const formData = {
            searchString: searchString,
            filter: filter
        }
        const res = await getAllVideo(page, channelDetailsData.channelId, formData)
        setTimeout(() => {
            // setPage(page + 1)
            setDetails({
                currentPage: res.data.currentPage,
                totalPages: res.data.totalPages,
                totalVideos: res.data.videos.totalVideos,
            })
            setVideoList(res.data.videos.data)
        }, 100);

    }
    const handleVideoListDataOnPage = async () => {
        if (videoList.length < details.totalVideos) {
            const formData = {
                searchString: "",
                filter: false
            }
            const res = await getAllVideo(page + 1, channelDetailsData.channelId, formData)
            setTimeout(() => {
                // setPage(page + 1)
                setDetails({
                    currentPage: res.data.currentPage,
                    totalPages: res.data.totalPages,
                    totalVideos: res.data.videos.totalVideos,
                })
                setVideoList([...videoList, ...res.data.videos.data])
            }, 100);


            return
        } else {
            setHasMore(false)
            return
        }


    }
    useEffect(() => {
        handleVideoListData(page, "", false)
    }, [])
    return (
        <div className="container-fluid bg-light" style={{ minHeight: "98vh", maxHeight: "98vh", height: "100%", overflowY: "auto" }} id='scrollableDiv'>
            <div className="row bg-dark text-white py-2">
                <div className="col-3" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    <h2 style={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "800" }}  >readon<span style={{ color: "rgb(110, 196, 250)" }}>zen</span></h2>
                </div>
                <div className="col-1 offset-8  d-flex align-items-center  ">
                    <Link href="/login">
                        <div className="btn btn-info uppercase">login</div></Link>
                </div>
            </div>
            <div className="row">
                <div className="col-6 offset-3 text-center">
                    <div className="card mt-2 shadow border-0 " >
                        <div className="card-body">
                            <h3 className='uppercase bold' style={{ fontSize: "15px" }}>profile of channel</h3>
                            <img src={`http://localhost:8000/${channelDetailsData.profilePath}`} alt="" style={{
                                width: "250px", height: "250px", objectFit: "contain", border: "2px solid rgb(110, 196, 250)",
                                borderRadius: "50%"
                            }} />
                            <h5>{channelDetailsData.name}</h5>
                            <h5>{channelDetailsData.bio}</h5>
                            <span className='bg-dark text-white w-25 text-center rounded px-4 py-1 uppercase'>#{channelDetailsData.type}</span>
                        </div>
                    </div>
                </div>
                <div className="col-6 offset-3">
                    <div className="card mt-2 shadow border-0 bg-dark text-white">
                        <div className="card-body">
                            <div className="row text-center">
                                <div className="col-6">
                                    <b>total videos</b> <br />
                                    <b>100</b>
                                </div>
                                <div className="col-6">
                                    <b>subscriber</b> <br />
                                    <b>100</b>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className="row">
                <div className="w-100 pt-3">
                    <InfiniteScroll
                        dataLength={videoList.length}
                        next={handleVideoListDataOnPage}
                        style={{ width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}
                        endMessage={
                            <h1></h1>
                        }
                        hasMore={hasMore}
                        loader={<CardSkelTon />}
                        scrollableTarget="scrollableDiv"
                    >
                        <div className="row">
                            {
                                videoList.map((item: any, i: number) => {
                                    if (item.status != 0) {
                                        return (
                                            <div className="col-xl-3  col-lg-4 col-md-12  col-12 mt-3 px-1  " style={{ minHeight: "350px", maxHeight: "350px", height: "350px", cursor: "pointer" }} key={i}>
                                                <div className="card h-100 border-0 shadow" style={{ backgroundColor: item.status == 0 ? "#80808052" : "" }} >

                                                    <div className="card-body m-0 p-0 px-3" >

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
                                    }
                                })
                            }

                        </div>

                    </InfiniteScroll>

                </div>
            </div>

        </div>
    )
}

export default ChannelProfilePage