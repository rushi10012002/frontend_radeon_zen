"use client"
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "../globals.css"
import { getEmailDetails } from '@/services/getCall'
import Image from 'next/image'
import { url } from 'inspector'
import DownloadIcon from '@/icons/download'
import { loader } from '@/redux/slices/loader'
import { useDispatch } from 'react-redux'
import Protected from '@/components/protected'
import MyStatefulEditor from '@/components/textEditors'


function EmailDetails() {
    const dispatch = useDispatch()
    const params = useParams()
    const [emailDetails, setEmailDetails] = useState({
        email: {
            from: "",
            to: "",
            ccc: "",
            subject: "",
            message: ""
        },
        file: []
    })
    const handleFileNameAndLogo = (fileName: string) => {
        const fileExension = fileName.split(".")[1]
        let logoUrl = ""
        switch (fileExension) {
            case "pdf":
                logoUrl = "http://localhost:3000/PDF_file_icon.svg.png"
                break;
            case "jpg":
                logoUrl = "http://localhost:3000/google_photo_logo_icon_159338.png"
                break;
            case "png":
                logoUrl = "http://localhost:3000/google_photo_logo_icon_159338.png"
                break;
            case "svg":
                logoUrl = "http://localhost:3000/google_photo_logo_icon_159338.png"
                break;
            case "docs":
                logoUrl = "http://localhost:3000/Google-Docs-logo.jpg"
                break;
            case "excel":
                logoUrl = "http://localhost:3000/27071-9-excel.png"
                break;
            case "webm":
                logoUrl = "http://localhost:3000/video icon.png"
                break;
            case "mp4":
                logoUrl = "http://localhost:3000/video icon.png"
                break;

            default:
                logoUrl = "http://localhost:3000/documents-symbol.svg"
                break;
        }
        return logoUrl

    }
    useEffect(() => {
        getEmailDetails(+params.emailDetail).then(res => {
            console.log(res.data.email);
            setEmailDetails({
                email: res.data.email,
                file: res.data.file
            })
            dispatch(loader(false))
        })
    }, [])
    const onChange = (value: any) => {
        console.log(value);

    };
    return (
        <Protected>
            <div className="container-fluid mx-auto w-75">
                <div className="row mt-5">
                    <div className="card" style={{ border: "1px solid  rgb(110, 196, 250)", maxHeight: "90vh", overflowY: "auto", backgroundColor: " rgba(110, 196, 250, 0.152)" }}>
                        <div className="card-body d-flex " style={{ flexDirection: "column" }}>
                            <div className="row">
                                <div className="col-6">
                                    <b  >from : </b> <br />
                                    <div className='messageEmail px-3 mt-1 mb-3'>
                                        {emailDetails?.email?.froms}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <b>to : </b> <br />
                                    <div className='messageEmail px-3 mt-1 mb-3'>
                                        {emailDetails?.email?.tos}
                                    </div>
                                </div>
                                <div className="col-6">
                                    <b>ccc : </b> <br />
                                    <div className='messageEmail px-3 mt-1 mb-3'>
                                        {emailDetails?.email?.ccc}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <b>subject : </b> <br />
                                    <div className='messageEmail px-3 mt-1 mb-3'>
                                        {emailDetails?.email?.subject}
                                    </div>
                                </div>

                                <div className="col-6 bg-light mr-3">
                                    <b>message : </b> <br />
                                    <div className='messageEmail px-3 mt-1'>

                                        <div dangerouslySetInnerHTML={{ __html: emailDetails?.email?.message }} />

                                    </div>
                                </div>
                                <div className="col-4 offset-1 bg-light py-3" >
                                    <b>attachments : </b> <br />
                                    {
                                        emailDetails?.file?.length > 0 && emailDetails.file.map((item: any, i) => <div key={i} style={{ display: "flex", alignItems: "center", }} className='my-3'>
                                            <Image
                                                style={{ objectFit: "contain" }}
                                                src={handleFileNameAndLogo(item?.orgName)}
                                                width={30}
                                                height={25}
                                                alt="Picture of the author"
                                            />
                                            <b className='d-block' style={{ fontSize: "12px", flexBasis: "80%" }}> {item?.orgName}</b>
                                            <b className='ml-2' style={{ justifySelf: "flex-end", flexBasis: "5%" }}><a href={`http://localhost:8000/${item?.filesPath}`} target='_blank' download={`http://localhost:8000//${item.filesPath}`}> <DownloadIcon size={25} /></a></b>
                                        </div>)
                                    }
                                </div>
                            </div>





                        </div>
                    </div>
                </div>
            </div>
        </Protected>
    )
}

export default EmailDetails