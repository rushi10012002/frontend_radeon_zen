import React, { useEffect } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { upDatePost } from '@/services/getCall';
import EditPost from './editPost';

function UpdatePost({ closeModal, HandleUpdate }: any) {

    const videoDetails = useSelector((state: any) => state.videoEdit.videoEdit)
    const SignUpSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(500, 'Too Long!')
            .required('title is Required'),
        subTitle: Yup.string()
            .min(2, 'Too Short!')
            .max(1000, 'Too Long!')
            .required('subTitle is Required'),
        desc: Yup.string()
            .min(2, 'Too Short!')
            .max(10000, 'Too Long!')
            .required('description is Required'),


    });
    return (
        <>
            <Formik
                initialValues={{
                    title: videoDetails.title,
                    subTitle: videoDetails.subTitle,
                    desc: videoDetails.description,
                    coverPath: ""

                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    const channelForm = new FormData();
                    channelForm.append("coverPath", values.coverPath || videoDetails.coverPath)
                    channelForm.append("title", values.title)
                    channelForm.append("subTitle", values.subTitle)
                    channelForm.append("description", values.desc)
                    channelForm.append("postId", videoDetails.postId)
                    const res = await upDatePost(channelForm)
                    console.log(res);
                    HandleUpdate()
                    resetForm()
                    setSubmitting(false);
                    closeModal()
                }}

            >
                {({ values, errors, touched, isSubmitting, setFieldValue, handleReset }: any) => {


                    return (
                        <EditPost {...{ values, errors, touched, isSubmitting, setFieldValue, handleReset, closeModal }} />
                    )
                }}

            </Formik>
        </>
    )
}

export default UpdatePost;