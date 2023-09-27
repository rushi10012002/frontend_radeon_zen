'use client'
import React, { use, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
function Protected({ children }: any) {
    const router = useRouter()
    const login = useSelector((state: any) => state.auth.auth)
    useEffect(() => {
        if (login == false) {
            router.push("/login")

        }

    }, [router])

    if (login) {
        return (
            <>{children}</>
        )

    }


}

export default Protected