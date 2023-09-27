'use client'
import EmailItem from '@/components/emailItem'
import { getAllEmails, updateEmailStatus } from '@/services/getCall'
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import Protected from '@/components/protected'
import { useSelector } from 'react-redux'
import Empty from '@/components/empty'
function TrashEmailPage() {
    const [emailList, setEmailList] = useState([])
    const [page, setpage] = useState(1)
    const [totalPage, settotalPage] = useState(0)
    const [selectedEmails, setSelectedEmails] = useState([])
    const user = useSelector((state: any) => state.auth?.user)
    const handleEmailList = () => {
        getAllEmails(page, "trash", user?.email).then((response) => {

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
    useEffect(() => {
        handleEmailList()
    }, [page])
    return (
        <Protected>
            <main className={styles.main}>
                <h1 className={styles.headingMain}>starred e-mails </h1>
                <div className='hr-line'></div>

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

export default TrashEmailPage