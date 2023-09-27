import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { checkChannel } from '@/services/getCall';
import { channelDetails } from '../redux/slices/channel'
import Link from 'next/link'
function CreateChannel() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth?.user)
    const SignUpSchema = Yup.object().shape({
        channelName: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('channel name is Required'),
        bio: Yup.string()
            .min(2, 'Too Short!')
            .max(100, 'Too Long!')
            .required('bio is Required'),
        type: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('type is Required'),


    });
    return (
        <>
            <Formik
                initialValues={{
                    channelName: '',
                    bio: '',
                    type: "",
                    profile: ""

                }}
                validationSchema={SignUpSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);
                    const channelForm = new FormData();
                    channelForm.append("profilePath", values.profile)
                    channelForm.append("name", values.channelName)
                    channelForm.append("bio", values.bio)
                    channelForm.append("type", values.type)
                    channelForm.append("userId", user.userId)
                    channelForm.append("check", "false")
                    const res = await checkChannel(channelForm)
                    console.log(res);
                    dispatch(channelDetails(res.data.channel))
                    resetForm()
                    setSubmitting(false);
                }}
            >
                {({ errors, touched, isSubmitting, setFieldValue }: any) => (
                    <Form>
                        <div className="row">
                            <div className="col-10 offset-1 mt-5">
                                <label htmlFor="channelName "> Upload a Profile :</label>
                                <input className="form-control" type="file" name="file" id="" onChange={(e: any) => {
                                    console.log(e.target.files[0]);
                                    setFieldValue("profile", e.target.files[0])
                                }} />
                                {/* <Field onChange={(e: any) => {
                                    console.log(e.target.files[0]);
                                    setFieldValue("profile", e.target.files[0])

                                }} className="form-control" name="profile" type="file" accept=".jpg, .jpeg, .png" />
                                {errors.profile && touched.profile ? (
                                    <div className='text-danger' style={{ textTransform: "capitalize" }}>
                                        <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.profile}</small>
                                    </div>
                                ) : null} */}
                            </div>
                            <div className="col-10 offset-1 mt-3">
                                <label htmlFor="channelName"> Channel Name :</label>
                                <Field className="form-control" name="channelName" />
                                {errors.channelName && touched.channelName ? (
                                    <div className='text-danger' style={{ textTransform: "capitalize" }}>
                                        <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.channelName}</small>
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-10 offset-1 mt-3">
                                <label htmlFor="bio"> Bio :</label>
                                <Field name="bio" className="form-control" />
                                {errors.bio && touched.bio ? (
                                    <div className='text-danger' style={{ textTransform: "capitalize" }}>
                                        <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.bio}</small>
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-10 offset-1 mt-3">
                                <label htmlFor="type"> type or category :</label>
                                <Field name="type" className="form-control" />
                                {errors.type && touched.type ? (
                                    <div className='text-danger' style={{ textTransform: "capitalize" }}>
                                        <small style={{ fontSize: "12px", paddingLeft: ".5rem" }}>{errors.type}</small>
                                    </div>
                                ) : null}
                            </div>
                            <div className="col-10 offset-1 text-center">
                                <button type="submit" className='Btn mt-5' disabled={isSubmitting}>

                                    {isSubmitting ? 'creating...' : 'Submit'}
                                </button>
                                <Link href="/">   <button type="button" className='Btn mt-5'  >
                                    home

                                </button></Link>
                            </div>
                        </div>



                    </Form>
                )}

            </Formik>
        </>
    )
}

export default CreateChannel;