import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
function EditPost({ values, errors, touched, isSubmitting, setFieldValue, handleReset, closeModal }: any) {

    const videoDetails = useSelector((state: any) => state.videoEdit.videoEdit)
    useEffect(() => {
        setFieldValue("title", videoDetails.title)
        setFieldValue("subTitle", videoDetails.subTitle)
        setFieldValue("desc", videoDetails.description)
        setFieldValue("coverPath", null)
    }, [videoDetails])

    return (
        <Form>
            <div className="row">
                <div className="col-10 offset-1 mt-2">

                    {
                        videoDetails.coverPath != "" && <>
                            <label htmlFor="channelName "> current thumbnail :</label><img className='video-Thum thum-border ' style={{ width: "100%", minHeight: "300px", objectFit: "cover" }} src={`http://localhost:8000/${videoDetails.coverPath}`} alt={videoDetails.title} />
                        </>
                    }

                </div>
                <div className="col-10 offset-1 mt-3">
                    <label htmlFor="channelName "> Upload a thumbnail for update :</label>
                    <input className="form-control" type="file" name="file" id="" onChange={(e: any) => {
                        console.log(e.target.files[0]);
                        setFieldValue("coverPath", e.target.files[0])
                    }} />

                </div>
                <div className="col-10 offset-1 mt-3">
                    <label htmlFor="channelName"> Title :</label>
                    <Field className="form-control" name="title" placeHolder="enter the title" />
                    {errors.title && touched.title ? (
                        <div className='text-danger' style={{ textTransform: "capitalize" }}>
                            <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.title}</small>
                        </div>
                    ) : null}
                </div>
                <div className="col-10 offset-1 mt-3">
                    <label htmlFor="bio"> subTitle :</label>
                    <Field name="subTitle" className="form-control" placeHolder="enter the subTitle" />
                    {errors.subTitle && touched.subTitle ? (
                        <div className='text-danger' style={{ textTransform: "capitalize" }}>
                            <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.subTitle}</small>
                        </div>
                    ) : null}
                </div>
                <div className="col-10 offset-1 mt-3">
                    <label htmlFor="type"> Description :</label>
                    <Field name="desc" className="form-control" as="textarea" placeHolder="enter the description" cols={3} rows={5} />
                    {errors.desc && touched.desc ? (
                        <div className='text-danger' style={{ textTransform: "capitalize" }}>
                            <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.desc}</small>
                        </div>
                    ) : null}
                </div>
                <div className="col-10 offset-1 text-center">
                    <button type="submit" className='Btn mt-5' disabled={isSubmitting}>

                        {isSubmitting ? 'UPDATING...' : 'UPDATE'}
                    </button>
                    <button type="reset" className='Btn mt-5' onClick={() => {
                        closeModal()
                        handleReset()
                    }} >
                        cancel
                    </button>
                </div>
            </div>



        </Form>
    )
}

export default EditPost