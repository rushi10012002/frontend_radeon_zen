/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import CopyIcon from '@/icons/copy'
import DownloadIcon from '@/icons/download'
import SaveIcon from '@/icons/save'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { WhatsappShareButton, WhatsappIcon, LinkedinIcon, LinkedinShareButton, FacebookIcon, FacebookShareButton, EmailShareButton, EmailIcon } from 'react-share'
import { videoListType } from '@/redux/slices/videoDetails'
import { video } from "../../redux/slices/videoDetails"
import { loader } from '@/redux/slices/loader'
import { addVideoInCollection, createPlayList, getPlayList, watchList } from '@/services/getCall';
import Modal from "react-awesome-modal"
import Link from "next/link"
import UserIcon from '@/icons/user'
function VideoDetailsPage() {
    const dispatch = useDispatch()
    const login = useSelector((state: any) => state.auth.auth)
    const user = useSelector((state: any) => state.auth?.user)
    const videoDetailsData = useSelector((state: any) => state.video?.video)
    const videoDetailsList = useSelector((state: any) => state.video?.videoListData)
    const [mode, setMode] = useState("less")
    const [show, setShow] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [selectedPlayList, setSelectedPlayList] = useState(null)
    const [newPlayList, setNewPlayList] = useState(null)
    const [page, setPage] = useState(1)
    const [playList, setPlayList] = useState([])
    function myFunction() {
        var copyText = document.getElementById("myInput");
        copyText?.select();
        copyText.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(copyText.value);
        toast.info("Copied the video link")
    }
    const loadVideo = (url: string) => {
        // You can use the <video> tag's methods to load and play the video
        const videoElement: any = document.getElementById('videoPlayer');
        videoElement.src = `http://localhost:8000/${url}`;
        videoElement.load(); // Load the new video
        videoElement.play(); // Play the video
    };

    const sortAndMore = (str: string, mode: string) => {
        let strLength = str?.length
        let newStr = ""
        if (strLength > 200 && mode === "less") {
            newStr = str.slice(0, 200) + "..."
        } else {
            newStr = str
        }
        return newStr
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
    const handleMode = (value: string) => {
        setMode(value)
    }
    const handleSingleDetails = (item: any) => {
        dispatch(loader(true))
        dispatch(video(item))
        dispatch(loader(false))
    }
    useEffect(() => {
        loadVideo(videoDetailsData.videoPath);
    }, [videoDetailsData.videoPath]);

    useEffect(() => {
        dispatch(videoListType({ page, type: videoDetailsData?.type }))
    }, [videoDetailsData, page])

    const handleLoaderNext = () => {
        if (page < videoDetailsList.totalPages) {
            setPage(page + 1)
        }
    }
    const handleLoaderPrev = () => {
        if (page > 1) {
            setPage(page - 1)
        }
    }
    const handlePlayList = async () => {
        const res = await getPlayList(user?.userId)
        if (res.data.code == "1111") {
            setPlayList(res.data.playList)
            // setSelectedPlayList(res.data.playList[0].playListId)
            setShow(true)
        } else {
            toast.error(res.data.message)
        }

    }
    const handlePlayListClose = () => {
        setShow(false)
    }
    const handlePlayListCreate = () => {
        setShowForm(true)
        setNewPlayList(null)
    }
    const handlePlayListCreateClose = () => {
        setShowForm(false)
    }
    const handleWatchLater = async () => {
        const res = await watchList({ userId: user?.userId, postId: videoDetailsData?.postId })


        if (res.data.code == "1111") {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }
    const handleOnCreate = async () => {
        const res = await createPlayList({
            userId: user?.userId,
            name: newPlayList
        })
        if (res.data.code == "1111") {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
        setNewPlayList(null)
        handlePlayListCreateClose()
    }
    const handleOnAddCollection = async () => {
        const res = await addVideoInCollection({
            postId: videoDetailsData.postId,
            playListId: parseInt(selectedPlayList)
        })
        if (res.data.code == "1111") {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }
    return (
        <div className="container-fluid" style={{ minHeight: "98vh", maxHeight: "98vh", height: "100%", overflowY: "auto" }}>

            <div className="row bg-dark text-white py-1">
                <div className="col-3" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
                    {
                        !login &&
                        <h2 style={{ fontSize: "1.2rem", textTransform: "uppercase", fontWeight: "600" }}  >readon<span style={{ color: "rgb(110, 196, 250)" }}>zen</span></h2>

                    }
                </div>
                {
                    login ? <div className="col-2 offset-7  d-flex align-items-center  "><Link style={{ textDecoration: "none" }} href={"/profile"}> <div className="item-profile" style={{ marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}><div className="text-light" style={{ marginRight: "1rem", fontSize: "1rem", fontWeight: "600" }}>{user?.name}


                    </div>
                        {user.picture ? <img src={user.picture} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} /> : <UserIcon />}
                    </div>
                    </Link></div> : <div className="col-1 offset-8  d-flex align-items-center  ">
                        <Link href="/login">
                            <div className="btn btn-info uppercase py-0">login</div></Link>
                    </div>
                }

            </div>
            <Modal visible={show} width={"500px"} height={playList.length > 0 ? "250px" : "200px"} effect="fadeInUp" onClickAway={handlePlayListClose} >
                <div className="main-model">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h3 className='uppercase mt-3'>add into playlist</h3>
                            </div>
                            {
                                playList.length > 0 && <div className="col-10 offset-1">
                                    <select onChange={(e: any) => {
                                        setSelectedPlayList(e.target.value)
                                    }} name="" id="" className='form-select mt-3 py-2' placeholder='select the playlist'>
                                        <option selected value={""}>select the playlist</option>
                                        {
                                            playList.map((opt: any, j) => <option key={j} value={opt.playListId}>{opt.name}</option>)
                                        }
                                    </select>

                                </div>
                            }



                            <div className="col-12 mt-4 text-center">
                                <button onClick={handleOnAddCollection} className="Btn" disabled={selectedPlayList == null}>add</button>
                                <button className="Btn" style={{ color: "red", border: "1px solid red" }} onClick={handlePlayListClose}>cancel</button>
                                <button className="Btn" onClick={handlePlayListCreate}>create new</button>
                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            <Modal visible={showForm} width={"500px"} height={"200px"} effect="fadeInRight" onClickAway={handlePlayListCreateClose} >
                <div className="main-model">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <h3 className='uppercase mt-3'>Create New Playlist</h3>
                            </div>
                            <div className="col-10 offset-1 mt-3">
                                <input onChange={(e: any) => setNewPlayList(e.target.value == "" ? null : e.target.value)} type="text" className="form-control" placeholder='enter the playlist name' />
                            </div>


                            <div className="col-12 mt-4 text-center">
                                <button onClick={handleOnCreate} className="Btn" disabled={newPlayList == null}>create</button>
                                <button className="Btn" style={{ color: "red", border: "1px solid red" }} onClick={handlePlayListCreateClose}>cancel</button>

                            </div>
                        </div>
                    </div>

                </div>
            </Modal>
            <div className="row mt-5">
                <div className="col-9 ">
                    <div className="card mb-3 border-0">
                        <div className="card-body">
                            <input style={{ display: "none" }} type="text" value={`http://localhost:8000/${videoDetailsData.videoPath}`} name="" id="myInput" />
                            <video id="videoPlayer" width="100%" height="600px" poster={videoDetailsData.coverPath != "" ? `http://localhost:8000/${videoDetailsData.coverPath}` : "http://localhost:3000/995.jpg"} controls >
                                <source src={`http://localhost:8000/${videoDetailsData.videoPath}`} type="video/mp4" />
                            </video>
                        </div>
                        <div className="card-footer text-end">
                            <div className=" " role="group" aria-label="Basic example">
                                <small>{moment(videoDetailsData.createdAt).startOf('hour').fromNow()}</small>

                                <button disabled type="button" className="btn btn-dark mx-1">👍like</button>
                                <button onClick={handlePlayList} disabled={login != true} type="button" className="btn btn-dark mx-1">playlist</button>
                                <button type="button" disabled={login != true} className="btn btn-dark mx-1" onClick={handleWatchLater}>watch later</button>

                                <button type="button" className="btn btn-dark mx-1"><DownloadIcon size={25} /> <a style={{ textDecoration: "none", color: "white" }} href={`http://localhost:8000/${videoDetailsData.videoPath}`} target='_blank' download={`http://localhost:8000//${videoDetailsData.videoPath}`}>download</a></button>
                                <button type="button" className="btn btn-dark mx-1" onClick={myFunction}><CopyIcon /> copy</button>
                                <button type="button" className="btn btn-dark mx-1">
                                    <WhatsappShareButton url={`http://localhost:8000//${videoDetailsData.videoPath}`}>
                                        <WhatsappIcon size={26} />
                                    </WhatsappShareButton>
                                </button>

                                <button type="button" className="btn btn-dark mx-1">
                                    <LinkedinShareButton url={`http://localhost:8000//${videoDetailsData.videoPath}`}>
                                        <LinkedinIcon size={26} />
                                    </LinkedinShareButton>
                                </button>
                                <button type="button" className="btn btn-dark mx-1">
                                    <FacebookShareButton url={`http://localhost:8000//${videoDetailsData.videoPath}`}>
                                        <FacebookIcon size={26} />
                                    </FacebookShareButton>
                                </button>
                                <button type="button" className="btn btn-dark mx-1">
                                    <EmailShareButton url={`http://localhost:8000//${videoDetailsData.videoPath}`}>
                                        <EmailIcon size={26} />
                                    </EmailShareButton>
                                </button>





                                <button disabled type="button" className="btn btn-dark mx-1"><SaveIcon /> save</button>
                            </div>
                        </div>
                    </div>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h2>{videoDetailsData.title}</h2>
                            <h4>{videoDetailsData.subTitle}</h4>
                            <p>{sortAndMore(videoDetailsData.description, mode)} {videoDetailsData?.description?.length > 200 && (mode == "less" ? <div className="btn btn-link" onClick={() => handleMode("more")}>more</div> : <div className="btn btn-link " onClick={() => handleMode("less")}>less</div>)}
                            </p>

                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            comments
                        </div>
                    </div>

                </div>
                <div className="col-3">
                    {
                        videoDetailsList?.videos?.data.filter((list: any) => list.postId != videoDetailsData.postId).map((list: any, i: number) => {
                            return (
                                <div className="card border-0 shadow mt-2" key={i} onClick={() => handleSingleDetails(list)}>
                                    <div className="card-body m-0 p-0" style={{ display: "flex" }}>
                                        <div>
                                            <img className='video-Thum-sort  ' src={list.coverPath == "" ? "http://localhost:3000/995.jpg" : `http://localhost:8000/${list.coverPath}`} alt={list.title} />
                                        </div>
                                        <div className='px-2'>
                                            <b style={{ fontSize: "12px" }}>{sortString(list.title, 30)}</b> <br />
                                            {/* <small style={{ fontSize: "12px" }}>{sortString(list.subTitle, 30)}</small> <br /> */}
                                            <small style={{ fontSize: "12px" }}>{sortString(list.description, 20)}</small><br />
                                            <small style={{ fontSize: "12px" }}>{moment(list.createdAt).startOf('hour').fromNow()}</small>

                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }

                    {
                        page > 1 && <div className="btn btn-dark" onClick={handleLoaderPrev}>prev</div>
                    }
                    {
                        videoDetailsList.totalPages > 1 && <div className="btn btn-dark" onClick={handleLoaderNext}>next</div>
                    }
                </div>
            </div>
        </div >
    )
}

export default VideoDetailsPage