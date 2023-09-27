/* eslint-disable @next/next/no-img-element */
'use client'
import { channelDetails } from '@/redux/slices/channel'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

function ChannelDetails({ channelList, id }: any) {
    const router = useRouter()
    const dispatch = useDispatch()
    const [channel, setChannel]: any = useState({})
    const findCorrectChannel = () => {
        const xx = channelList.find((item: any) => item.channelId == id);
        if (xx) {
            setChannel(xx)
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
    const handleChannel = async () => {
        dispatch(channelDetails(channel))
        router.push("/public/channel-profile")
    }
    useEffect(() => {
        findCorrectChannel()
    }, [])

    return (
        <div className="card border-0" onClick={handleChannel}>
            <div className="card-body" style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                <div>
                    <img style={{ border: "1px solid red", borderRadius: "50%", width: "30px", height: "30px" }} src={`http://localhost:8000/${channel?.profilePath}`} alt="" srcset="" />
                </div>
                <div style={{ marginLeft: "1rem" }}>
                    <small style={{ fontWeight: "600", fontSize: "14px" }}>{channel.name}</small> <br />
                    <small style={{ color: "gray", fontSize: "12px" }}>{sortString(channel.bio, 50)}</small>
                </div>
            </div>
        </div>
    )
}

export default ChannelDetails