'use client'

import '../app/globals.css'
import React from 'react'
import HomeIcon from "../icons/home"
import TrashIcon from "../icons/trash"
import CreateMailIcon from "../icons/createMail"
import SendIcon from "../icons/send"
import DraftIcon from "../icons/draft"
import LableIcon from "../icons/lable"
import EmailIcon from "../icons/email"
import FavIcon from "../icons/fav"
import UserIcon from "../icons/user"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import MenuIcon from '@/icons/menu'
import { useState, createContext } from 'react'
import { loader } from "../redux/slices/loader"
import { useDispatch, useSelector } from 'react-redux'
import Loader from './loader'
import LogoutIcon from '@/icons/logout'
import { logout } from '../redux/slices/auth'
import VideoIcon from '@/icons/video'
import { logOutChannel } from '@/redux/slices/channel'
function SideBar({ children }: any) {
    const dispatch = useDispatch()
    const auth = useSelector((state: any) => state.auth.auth)
    const user = useSelector((state: any) => state.auth?.user)
    const loaders = useSelector((state: any) => state.loader.loader)
    const pathName = usePathname()
    console.log(pathName);
    const [nav, setNav] = useState(false)
    const handleNav = (check: boolean) => {

        if (check) {
            setNav(check)
        } else {
            setNav(check)
        }
    }

    const handleLogOut = () => {
        dispatch(logout())
        dispatch(logOutChannel())
    }

    return (

        <div className="Container">
            {
                auth && <div className='sidebar' style={{ flexBasis: nav ? "0%" : "15%" }}>
                    <div style={{ display: "flex", justifyContent: nav ? "center" : "space-evenly" }}>
                        <h2 style={{ fontSize: "1.2rem" }} className={nav ? "navItemData" : ""}>readon<span className='app-name-span'>zen</span></h2>
                        <span style={{ cursor: "pointer" }} onClick={() => handleNav(!nav)}> <MenuIcon size={25} /></span>

                    </div>
                    <div className='hr-line'></div>
                    <br />

                    {/* <div className="item-list-Container" onMouseEnter={() => handleNav(false)} onMouseLeave={() => handleNav(true)} id="containerList" style={{ width: nav ? "70px" : "auto" }}> */}
                    <div className="item-list-Container" id="containerList" style={{ width: nav ? "70px" : "auto" }}>
                        <div >
                            <Link href="/"> <div className={pathName == "/" ? " item active-class-item" : "item"}> <EmailIcon /> <div className={nav ? "navItemData" : ""} style={{ marginLeft: "1rem", fontSize: "1rem" }}>all mail</div></div></Link>
                            <hr style={{ color: "rgb(110, 196, 250)" }} />
                            <Link href="/createEmail"> <div className={pathName == "/createEmail" ? " item active-class-item" : "item"}> <CreateMailIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>create mail</div></div></Link>
                            <Link href={"/draftEmail"}><div className={pathName == "/draftEmail" ? " item active-class-item" : "item"}> <DraftIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>draft e-mail</div></div></Link>
                            <Link href={'/sentEmail'}> <div className={pathName == "/sentEmail" ? " item active-class-item" : "item"}> <SendIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>sent</div></div></Link>
                            <hr style={{ color: "rgb(110, 196, 250)" }} />
                            <Link href={'/favEmail'}>  <div className={pathName == "/favEmail" ? " item active-class-item" : "item"}> <FavIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>faviorate</div></div></Link>
                            <Link href={'/spamEmail'}> <div className={pathName == "/spamEmail" ? " item active-class-item" : "item"}> <HomeIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>spam</div></div></Link>
                            <Link href={"trashEmail"}> <div className={pathName == "/trashEmail" ? " item active-class-item" : "item"}> <TrashIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>trash</div></div></Link>
                            <hr style={{ color: "rgb(110, 196, 250)" }} />
                            <Link onClick={() => {
                                dispatch(loader(true))
                            }} href={"video"}> <div className={pathName == "/video" ? " item active-class-item" : "item"}> <VideoIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>create channel </div></div></Link>
                            <Link href={"/public"}> <div className={pathName == "/public" ? " item active-class-item" : "item"}> <VideoIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>videos </div></div></Link>
                            <Link href={'/watch-later'}><div className={pathName == "/watch-later" ? " item active-class-item" : "item"}> <LableIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>playlist</div></div></Link>
                        </div>
                        <div style={{ paddingBottom: "1rem" }}>
                            <Link href={"/profile"}> <div className="item-profile" style={{ marginBottom: "1rem" }}>{user.picture ? <img src={user.picture} alt="" style={{ width: "30px", height: "30px", borderRadius: "50%" }} /> : <UserIcon />} <div className={nav ? "navItemData" : ""} style={{ marginLeft: "1rem", fontSize: "1rem" }}>{user?.name}
                                <small style={{ display: "block", fontSize: ".7rem", color: "rgb(110, 196, 250)" }}>{user?.email}</small>

                            </div>
                            </div>
                            </Link>
                            <Link href={"/login"}> <div className={"item"} onClick={handleLogOut}> <LogoutIcon /> <div style={{ marginLeft: "1rem", fontSize: "1rem" }} className={nav ? "navItemData" : ""}>logout</div></div></Link>
                        </div>


                    </div>

                </div>
            }
            <div className="content">
                <div className="content-load">
                    {children}

                </div>
            </div>
            {
                loaders && <Loader />
            }
        </div>
    )
}

export default SideBar