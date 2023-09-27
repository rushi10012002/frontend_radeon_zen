'use client'
import CreateChannel from '@/components/create.channel';
import ModalCom from '@/components/modal.component';
import Protected from '@/components/protected';
import VideoPlatForm from '@/components/video.patform';
import { channelDetails } from '@/redux/slices/channel';
import { checkChannel } from '@/services/getCall';

import React, { useEffect, useState } from 'react'
import Modal from 'react-awesome-modal';
import { useDispatch, useSelector } from 'react-redux';
import { loader } from "../../redux/slices/loader"
function VideoPage() {
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth?.user)
    const channelDetailsData = useSelector((state: any) => state.channel?.channel)
    const [mode, setMode] = useState(false)
    const [show, setShow] = useState(false)
    const openModal = () => {
        setMode(true)
    }

    const closeModal = () => {
        setMode(false)
    }
    useEffect(() => {
        if (channelDetailsData == null) {
            openModal()
        }
    }, [channelDetailsData])
    useEffect(() => {
        async function fetchData() {
            let channelForm = {
                userId: user.userId,
                check: true
            }
            const res = await checkChannel(channelForm)
            await dispatch(channelDetails(res.data.channel))
            dispatch(loader(false))
        }
        fetchData()
    }, [])

    return (
        <Protected>
            <div className="container-fluid" style={{ overflowY: "auto", maxHeight: "98vh" }}>
                {
                    channelDetailsData == null ? <>
                        <div className="row">
                            <div className="col-6" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <img src="http://localhost:3000/learn.svg" alt="" height={"400px"} />
                            </div>
                            <div className="col-6" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <img src="http://localhost:3000/tutorial.svg" alt="" height={"400px"} />
                            </div>
                            <div className="col-12" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <button className='Btn w-25 my-2' onClick={openModal}>create channel</button>
                            </div>

                            <div className="col-6" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <img src="http://localhost:3000/influ.svg" alt="" height={"400px"} />
                            </div>
                            <div className="col-6" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
                                <img src="http://localhost:3000/online.svg" alt="" height={"400px"} />
                            </div>

                        </div>
                        <ModalCom width="500px" height="550px" mode={mode} closeModal={closeModal} Component={<CreateChannel />} /></>
                        : <div className='row'>
                            {/* <div className="col-12 " style={{ height: "98vh", background: "url(http://localhost:3000/welcome.svg)", backgroundRepeat: "no-repeat", backgroundAttachment: "fixed", width: "100%", backgroundPosition: "center" }}>

                            </div> */}
                            <div className="col-12" style={{ height: "98vh" }}>
                                <VideoPlatForm />
                            </div>
                        </div>

                }



            </div>
        </Protected>
    )
}

export default VideoPage