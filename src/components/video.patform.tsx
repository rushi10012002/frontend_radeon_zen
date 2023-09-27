/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Line } from 'rc-progress';
import { createPost } from '@/services/getCall';
import VideoList from './videoList';
function VideoPlatForm() {
    const channelDetailsData = useSelector((state: any) => state.channel?.channel)
    const [selectedFile, setSelectedFile] = useState(null)
    const [tv, setTv] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [progress, setProgress] = useState(0)
    const [formPost, setFormPost] = useState({
        title: "",
        subTitle: "",
        desc: "",
        type: ""
    })
    const handleOnChange = (e: any) => {
        setFormPost({ ...formPost, [e.target.name]: e.target.value })
    }
    const onUploadProgress = (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        let precentage = Math.floor((loaded * 100) / total);
        setProgress(precentage)
        console.log(precentage);

    }
    const handleOnSubmit = async (e: any) => {

        console.log(selectedFile);
        console.log(formPost);
        let postFormData = new FormData()
        postFormData.append("video", selectedFile[0])
        postFormData.append("title", formPost.title)
        postFormData.append("subTitle", formPost.subTitle)
        postFormData.append("description", formPost.desc)
        postFormData.append("type", channelDetailsData.type)
        postFormData.append("status", "true")
        postFormData.append("channelId", channelDetailsData.channelId)

        const res = await createPost(postFormData, onUploadProgress)
        console.log(res);
        setProgress(0)
        setFormPost({
            title: "",
            subTitle: "",
            desc: "",
            type: channelDetailsData.type
        })
        setRefresh(!refresh)

    }
    return (
        <div className="row">
            <div className="col-md-4 col-lg-3 col-6" >
                <div className="row">
                    <div className="col-12 text-center">
                        <div className="card mt-2 shadow border-0 " >
                            <div className="card-body">
                                <h3 className='uppercase bold' style={{ fontSize: "15px" }}>profile of channel</h3>
                                <img src={`http://localhost:8000/${channelDetailsData.profilePath}`} alt="" style={{
                                    width: "100px", height: "100px", objectFit: "contain", border: "2px solid rgb(110, 196, 250)",
                                    borderRadius: "50%"
                                }} />
                                <h5>{channelDetailsData.name}</h5>
                                <h5>{channelDetailsData.bio}</h5>
                                <span className='bg-dark text-white w-25 text-center rounded px-4 py-1 uppercase'>#{channelDetailsData.type}</span>
                                <span className='bg-danger text-white w-25 text-center rounded px-4 py-1 uppercase' style={{ marginLeft: ".5rem" }}>start live</span>

                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mt-2 shadow border-0 bg-dark text-white">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-6">
                                        <b>total videos</b> <br />
                                        <b>{tv}</b>
                                    </div>
                                    <div className="col-6">
                                        <b>subscriber</b> <br />
                                        <b>100</b>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="card mt-2 shadow border-0">
                            <div className="card-body">
                                <div className="row text-center">
                                    <div className="col-12">
                                        <b>upload the videos / create the post</b> <br />
                                    </div>
                                    <div className="col-12 mt-3">
                                        <input accept='.mp4' onChange={(e: any) => {
                                            setSelectedFile(e.target.files)
                                        }} type="file" name="file" id="" className='form-control' />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <input value={formPost.title} onChange={handleOnChange} type="text" name="title" id="" className='form-control' placeholder='enter the title' />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <input value={formPost.subTitle} onChange={handleOnChange} type="text" name="subTitle" id="" className='form-control' placeholder='enter the subTitle' />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <input value={channelDetailsData.type} disabled onChange={handleOnChange} type="text" name="type" id="" className='form-control' placeholder='enter the video type' />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <textarea value={formPost.desc} onChange={handleOnChange} className='form-control' placeholder='enter the description' name="desc" id="" cols={10} rows={3}></textarea>
                                    </div>
                                    <div className="col-12 mt-2">

                                        <button className='Btn w-100 mx-0' disabled={selectedFile == null || formPost.title == "" || progress > 0} onClick={handleOnSubmit}>upload {progress > 0 && progress + "%"}</button>
                                    </div>
                                    {
                                        progress > 0 && <div className="col-12 mt-2">
                                            <Line percent={progress} strokeWidth={2} strokeColor="#6ec4fa" />

                                        </div>
                                    }


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8 col-lg-9 col-6" >
                <VideoList setTv={setTv} refresh={refresh} />
            </div>
        </div>
    )
}

export default VideoPlatForm;