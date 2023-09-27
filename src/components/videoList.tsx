import { getAllVideo, updateStatus } from '@/services/getCall'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { video } from "../redux/slices/videoDetails"
import { loader } from '@/redux/slices/loader'
import { useRouter } from 'next/navigation'
import ModalCom from './modal.component'
import UpdatePost from './updatePost'
import { videoEdit } from '@/redux/slices/video'
import { toast } from 'react-toastify'
import SearchIcon from '@/icons/search'
import MenuVerIcon from '@/icons/menu.vertical'
import moment from 'moment'
function VideoList({ setTv, refresh }: any) {
    const router = useRouter()
    const channelDetailsData = useSelector((state: any) => state.channel?.channel)
    const [page, setPage] = useState(1)
    const [upDate, setUpDate] = useState(false)
    const HandleUpdate = () => {
        setUpDate(!upDate)
    }
    const [mode, setMode] = useState(false)
    const dispatch = useDispatch()
    const [videoList, setVideoList] = useState([])
    const handleStatus = async (postId: number, status: number) => {
        const res: any = await updateStatus(postId, status)
        toast.success("status updated successfully")
        getVideoData()
    }
    async function getVideoData(formData: object = { searchString: "", filter: false }) {
        const res = await getAllVideo(page, channelDetailsData.channelId, formData)
        console.log(res.data.videos);
        setVideoList(res.data.videos.data);
        setTv(res.data.videos.totalVideos)
    }
    useEffect(() => {

        getVideoData()
    }, [refresh, upDate, channelDetailsData])
    const handleSingleDetails = (item: any) => {
        dispatch(loader(true))
        dispatch(video(item))
        router.push("/videoDetails")
        dispatch(loader(false))
    }
    const closeModal = () => {
        setMode(false)
    }
    const openModal = (item: any) => {
        dispatch(videoEdit(item))
        setMode(true)
    }
    const handleLoaderMore = () => {

    }
    const handleKeyUpEvent = (event: any) => {

        if (event.key == "Enter") {
            console.log(event.target.value);
            const formData = {
                searchString: event.target.value,
                filter: true
            }
            getVideoData(formData)
        }
        if (event.target.value == "") {
            const formData = {
                searchString: event.target.value,
                filter: false
            }
            console.log("input empty");
            getVideoData(formData)
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

    return (
        <div className='video-container ' style={{ minHeight: "98vh", maxHeight: "98vh", height: "100%", overflowY: "auto" }}>

            <div className="container">
                <ModalCom width="700px" height="90%" mode={mode} closeModal={closeModal} Component={<UpdatePost HandleUpdate={HandleUpdate} closeModal={closeModal} />} />
                <div className="row">
                    <div className="col-4 offset-8 d-flex align-items-center pt-3 "><input onKeyUp={handleKeyUpEvent} type="text" placeholder='serach video title/type/keywords' className='form-control mr-1 search-input' />
                        <div className="btn btn-dark uppercase"><SearchIcon size={20} /></div>
                    </div>
                </div>
                <div className="row pb-5">
                    {
                        videoList.map((item: any, i) => {
                            return (
                                <div className="col-xl-4  col-lg-6 col-md-12  col-12 mt-3 px-1  " style={{ minHeight: "300px", maxHeight: "300px", height: "300px" }} key={i}>
                                    <div className="card h-100 border-0 shadow" style={{ backgroundColor: item.status == 0 ? "#80808052" : "" }} >

                                        <div className="card-body m-0 p-0 px-3" >
                                            <div className="dropdown" style={{ position: "absolute", right: "4%", backgroundColor: "#0000008c", color: "white", fontSize: "12px" }}>
                                                <span className="btn rounded" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <MenuVerIcon color='white' />
                                                </span>

                                                <ul className="dropdown-menu  dropdown-menu-start text-center ">
                                                    <li> <button className="btn btn-outline-success  mt-1 uppercase w-75" disabled={item.status == 1} onClick={() => handleStatus(item.postId, 1)} >public</button> </li>
                                                    <li> <button className="btn btn-outline-danger  mt-1 uppercase w-75" disabled={(item.status == 0)} onClick={() => handleStatus(item.postId, 0)}>block</button> </li>
                                                    <li> <button className="btn btn-light  mt-1 uppercase w-75" onClick={() => openModal(item)} >📝 edit</button> </li>

                                                </ul>
                                            </div>
                                            <div onClick={() => handleSingleDetails(item)}>
                                                <img className='video-Thum  ' src={item.coverPath == "" ? "http://localhost:3000/995.jpg" : `http://localhost:8000/${item.coverPath}`} alt={item.title} />
                                                <h4 className='video-h4 mt-1'>{sortString(item.title, 35)}</h4>
                                                <h4 className='video-h5'>{sortString(item.subTitle, 35)}</h4>
                                                <small>{moment(item.createdAt).startOf('millisecond').fromNow()}</small>
                                            </div>


                                        </div>

                                        {/* <div className={item.status == 1 ? "card-footer border-success" : "card-footer border-danger"} style={{ display: 'flex', justifyContent: "space-evenly", alignItems: "center", cursor: "pointer" }}>
                                            <button className="btn btn-dark uppercase mr-3 " >
                                                block ❌
                                            </button>

                                            <button  className="btn btn-dark  uppercase text-white ml-3" >
                                                public ✅
                                            </button>
                                            <button className="btn btn-dark  uppercase text-white ml-3"  >
                                                edit 📝
                                            </button>


                                        </div> */}
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default VideoList