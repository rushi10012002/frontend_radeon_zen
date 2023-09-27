'use client'
import React, { useRef, useState } from 'react'
import styles from '../page.module.css'


import '../globals.css'
import SendIcon from '@/icons/send'
import TrashIcon from '@/icons/trash'
import { postEmail } from '@/services/getCall'
import Protected from '@/components/protected'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import MyStatefulEditor from '@/components/textEditors'
function CreatePage() {
    const user = useSelector((state: any) => state.auth?.user)
    const filesRef: any = useRef(null)
    const [filsList, setfilsList]: any = useState([])
    const [val, setVal] = useState("");
    const onChange = (value: any) => {
        console.log(value);
        setVal(value);
        setFormData({ ...formData, message: value })
    };
    const [formData, setFormData] = useState({
        from: " ",
        to: " ",
        ccc: "",
        seen: false,
        status: "new",
        subject: "",
        message: ""
    })
    const handleOnChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value })
    }
    const handleSubmitForm = (event: any) => {
        console.log("formData => ", formData);
        console.log("filsList => ", filsList);

        let xx: any = {
            ...formData, images: filsList,
            seen: false,
            status: "new"
        }
        const formDataEmail = new FormData()
        formDataEmail.append("froms", user?.email)
        formDataEmail.append("tos", xx.to)
        formDataEmail.append("ccc", xx.ccc)
        formDataEmail.append("subject", xx.subject)
        formDataEmail.append("message", xx.message)
        // formDataEmail.append("images", xx.images[0])
        Object.keys(filsList)?.forEach((item: any) => formDataEmail.append("images", filsList[item]))
        formDataEmail.append("seen", xx.seen)
        formDataEmail.append("status", xx.status)


        postEmail(formDataEmail).then((res) => {
            console.log(res);
            toast.success('Email send successfully ', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setFormData({
                from: user?.email,
                to: " ",
                ccc: "",
                seen: false,
                status: "new",
                subject: "",
                message: ""
            })

        })

    }
    return (
        <Protected>
            <main className={styles.main}>
                <h1 className={styles.headingMain}>create e-mails </h1>
                <div className='hr-line'></div>
                <div className={styles.emailListContainer}>
                    <div className="container-fluid h-100" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div className="card h-100">
                            <div className="card-body">
                                {/* <form onSubmit={handleSubmitForm}> */}

                                <div className="row">
                                    <div className="col-6  mb-3">
                                        <label htmlFor="formGroupExampleInput" className="form-label">From</label>
                                        <input type="text" onChange={handleOnChange} name='from' className="form-control" id="formGroupExampleInput" disabled value={user?.email} placeholder="example@gmail.com" />
                                    </div>

                                    <div className=" col-6 mb-3">
                                        <label htmlFor="formGroupExampleInput" className="form-label">To</label>
                                        <input type="email" value={formData.to} name='to' onChange={handleOnChange} className="form-control" id="formGroupExampleInput" placeholder="example@gmail.com" />
                                    </div>
                                    <div className=" col-6 mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">CCC</label>
                                        <input value={formData.ccc} type="email" onChange={handleOnChange} name='ccc' className="form-control" id="formGroupExampleInput2" placeholder="example@gmail.com" />
                                    </div>
                                    <div className=" col-6 mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">Subject</label>
                                        <input value={formData.subject} type="text" name='subject' onChange={handleOnChange} className="form-control" id="formGroupExampleInput2" placeholder="Enter the subject" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="formGroupExampleInput2" className="form-label">Message</label>
                                        {/* <textarea value={formData.message} className='form-control' onChange={handleOnChange} placeholder='enter the message' name="message" id="" cols={30} rows={10}></textarea> */}
                                        <MyStatefulEditor markup="" onChange={onChange} />
                                    </div>
                                    <div className="mb-3">
                                        <input multiple type="file" onChange={(e: any) => {
                                            console.log(e.target?.files[0]);
                                            setfilsList(e.target?.files)
                                        }} name="files" id="" />


                                    </div>

                                </div>
                                <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <button type='submit' className='Btn' style={{ display: "flex", alignContent: "center", justifyContent: "space-evenly" }} onClick={handleSubmitForm}>send <SendIcon size={20} /></button>
                                    <button type='submit' className='Btn' style={{ display: "flex", alignContent: "center", justifyContent: "space-evenly" }}>draft <SendIcon size={20} /></button>
                                </div>
                                {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </Protected>
    )
}

export default CreatePage