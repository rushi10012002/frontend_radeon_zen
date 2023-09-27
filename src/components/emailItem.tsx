import React from 'react'
import EmailIcon from '@/icons/email'
import StarIcon from '@/icons/star'
import TimeIcon from '@/icons/time'
import FavIcon from '@/icons/fav'
import EyeIcon from '@/icons/eye'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { loader } from '@/redux/slices/loader'
function EmailItem(props: any) {
    const dispatch = useDispatch()
    const [eye, setEye] = React.useState(0)
    const handleDateFormat = (value: string) => {
        let formatedDate: any = new Date(value)
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
        formatedDate = formatedDate.getDate() + "-" + months[formatedDate.getMonth()] + " " + formatedDate.getFullYear()
        return formatedDate || value
    }
    const handleCheckBox = () => {
        props.handleSelectedEmails(props.item.emailId)
    }
    const handleHover = (id: any) => {
        if (eye == 0) {
            setEye(id)
        } else {
            setEye(0)
        }


    }

    return (
        <>

            <div onMouseEnter={() => { handleHover(props.item.emailId) }} onMouseLeave={() => { handleHover(props.item.emailId) }} style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", minWidth: "50%" }}>
                <div style={{ textAlign: "end", width: "30px", marginLeft: "1rem", fontSize: "smaller", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>{eye == props.item.emailId && <Link href={`/${props.item.emailId}`} onClick={() => dispatch(loader(true))}><EyeIcon size={20} /></Link>} </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginLeft: ".1rem", minWidth: "50px" }}><input type='checkbox' onClick={handleCheckBox} />   {props.status == "fav" ? <FavIcon color="#DAA520" size={18} /> : props.status == "trash" ? "" : <StarIcon />}</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", marginLeft: "2rem", }}><EmailIcon />  &nbsp;&nbsp;profile   <span className={`newTag ${props.status == "new" || props.status == "read" ? props.status : "other"}`}>{props.status}</span> </div>

                <div className="title" style={{ maxWidth: "400px", textTransform: "capitalize", marginLeft: "1rem", fontSize: "smaller" }}>{props.item.subject}</div>
                <div style={{ textTransform: "capitalize", marginLeft: "3rem", paddingLeft: ".1rem", fontWeight: "500", fontSize: "13px" }}> - {props.item.subject}</div>

            </div>
            <div style={{ width: "300px", textAlign: "end", marginLeft: ". 1rem", fontSize: "smaller", display: "flex", alignItems: "center", justifyContent: "center" }}> <TimeIcon size={25} /> &nbsp;&nbsp;&nbsp;{handleDateFormat(props.item.createdAt)}</div>

        </>
    )
}

export default EmailItem