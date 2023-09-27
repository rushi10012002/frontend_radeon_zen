'use client'
import EmailItem from '@/components/emailItem'
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'

import '../globals.css'
import { getAllEmails, updateEmailStatus } from '@/services/getCall'
import Protected from '@/components/protected'
import { useSelector } from 'react-redux'
import Empty from '@/components/empty'
function SpamPage() {
    const [emailList, setEmailList] = useState([])
    const [page, setpage] = useState(1)
    const [totalPage, settotalPage] = useState(0)
    const [status, setstatus] = useState("spam")
    const [selectedEmails, setSelectedEmails] = useState([])
    const user = useSelector((state: any) => state.auth?.user)
    const handleEmailList = () => {
        getAllEmails(page, status, user?.email).then((response) => {

            console.log(response.data.emails);
            setEmailList(response.data.emails)
            settotalPage(response.data.totalPages)
        })
    }
    const handleNext = () => {
        setpage(page + 1)
    }
    const handlePrev = () => {
        if (page > 1) {
            setpage(page - 1)
        }
    }
    const handleStatus = (status: string) => {
        console.log(status);
        updateEmailStatus({ status, emailIdList: selectedEmails }).then(() => {
            console.log("refresh");

            handleEmailList()
        })

    }
    const handleSelectedEmails = (id: number) => {
        if (selectedEmails.includes(id)) {

            setSelectedEmails(selectedEmails.filter((item) => item != id))
        } else {
            setSelectedEmails([...selectedEmails, id])
        }
    }
    const handleCheckBox = (e: any) => {
        if (e.target.checked) {
            setstatus("read")
        } else {
            setstatus("spam")
        }
        setSelectedEmails([])
    }
    useEffect(() => {
        handleEmailList()
    }, [page, status])

    return (
        <Protected>
            <main className={styles.main}>
                <h1 className={styles.headingMain}>All e-mails list</h1>
                <div className='hr-line'></div>

                <div className='filterBtn'>
                    {
                        selectedEmails.length > 0 && <><button className='Btn' onClick={() => {
                            handleStatus("read")
                        }}>mark as read</button>
                            <button className='Btn' onClick={() => {
                                handleStatus("fav")
                            }}>like</button>
                            <button className='Btn' onClick={() => {
                                handleStatus("trash")
                            }}>trash</button>
                            <button className='Btn' onClick={() => {
                                handleStatus("spam")
                            }}>spam</button>
                            <button className='Btn'>delete permenantly</button></>
                    }

                    <input type='checkbox' onClick={handleCheckBox} /> read
                </div>
                <div className={styles.emailListContainer}>
                    {/* {
                        emailList.map((item: any, i) => {
                            return (

                                <div key={i} className={`${styles.emailItems} ${item.seen ? null : styles.unread}`}>
                                    <EmailItem status={item?.status} item={item} handleSelectedEmails={handleSelectedEmails} />
                                </div>
                            )
                        })
                    } */}
                    {
                        emailList.length > 0 ?
                            emailList.map((item: any, i) => {
                                return (

                                    <div key={i} className={`${styles.emailItems} ${item.seen ? null : styles.unread}`}>
                                        <EmailItem status={item?.status} item={item} handleSelectedEmails={handleSelectedEmails} />
                                    </div>
                                )
                            }) : <Empty />
                    }


                </div>
                {
                    totalPage > 1 && <div className="paginationBtn">
                        <button disabled={page <= 1} className='Btn' onClick={handlePrev}>prev</button>
                        <button disabled={page === totalPage} className='Btn' onClick={handleNext}>Next</button>
                    </div>
                }


            </main>
        </Protected>
    )
}

export default SpamPage