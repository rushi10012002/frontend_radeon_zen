'use client'
import EmailItem from '@/components/emailItem'
import React from 'react'
import styles from '../page.module.css'

import '../globals.css'
import Protected from '@/components/protected'
function SentEmailPage() {
    return (
        <Protected>

            <main className={styles.main}>
                <h1 className={styles.headingMain}>sent e-mails list</h1>
                <div className='hr-line'></div>

                <div className={styles.emailListContainer}>
                    <div className={`${styles.emailItems} ${styles.unread}`}>
                        {/* <EmailItem status={"sent"} /> */}
                    </div>

                </div>
                <div className="paginationBtn">
                    {/* <button disabled className='btn'>prev</button>
            <button className='btn'>Next</button> */}
                </div>

            </main>
        </Protected>
    )
}

export default SentEmailPage