'use client'
import React, { useContext } from 'react'
import "../globals.css"
import style from "../login.module.css"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/slices/auth'
import { loader } from "../../redux/slices/loader"
// import { signIn, useSession } from "next-auth/react";
import { useGoogleLogin, hasGrantedAnyScopeGoogle } from '@react-oauth/google';
import axios from 'axios'
import { loginUser } from '@/services/getCall'

function LoginPage() {
    const xx = useRouter()
    const dispatch = useDispatch()
    const count = useSelector((state: any) => state.count.count)
    const loginGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse)
            const profileResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${tokenResponse.access_token}`,
                },
            });


            loginUser(profileResponse.data).then((res) => {
                console.log(res);

                dispatch(login(res.data.user))
                dispatch(loader(true))
                xx.push("/")
            })

        },
        onError: (error) => {
            console.log(error)
        }
    });
    const handleLogin = async () => {


        dispatch(loader(true))
        xx.push("/")
    }
    const handleLoginGoogle = async (e: any) => {

        loginGoogle()

    }

    return (

        <div className={style.container}>
            {
                count == 0 ? <div className={style.main}>
                    <div className={style.first}></div>
                    <div className={style.second}>
                        <h2 className={`${style.h2} mt-3`} >readon<span className={style.appNameSpan}>zen</span> <br /> login</h2>
                        <div className="row mt-5 text-center">
                            <div className="col-10 offset-1">
                                <label htmlFor="email"></label>
                                <input type="text" className="form-control py-3" placeholder='example@gmail.com' id='email' />
                            </div>
                            <div className="col-10 offset-1 mt-2">
                                <label htmlFor="email"></label>
                                <input type="password" className="form-control py-3" placeholder='Enter the security key' id='email' />
                            </div>
                            <br />
                            <br />
                            <br />
                            <br />
                            <br />
                            <div className="col-10 offset-1 mt-5">
                                <button className="Btn w-100" onClick={handleLogin} >login</button>
                            </div>
                            <div className="col-10 offset-1 mt-4">
                                <button className="Btn w-100" onClick={handleLoginGoogle}>login with google</button>

                            </div>
                            <div className="col-10 offset-1 mt-t pt-5">
                                <Link href={""}>
                                    resister account
                                </Link>

                            </div>
                            <div className="col-10 offset-1 mt-t pt-5">
                                <Link href={"/public"}>
                                    <button className="Btn w-100"  >entertainments</button>
                                </Link>

                            </div>


                        </div>
                    </div>
                </div> : <h1>welcome gmailclone app</h1>
            }

        </div>

    )
}

export default LoginPage