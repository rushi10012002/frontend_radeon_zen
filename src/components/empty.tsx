import React from 'react'
import "../app/globals.css"
import Image from 'next/image'
import { url } from 'inspector'
function Empty() {
    return (
        <div className='empty'>


            <img src="http://localhost:3000/empty.svg" alt="" />
        </div>
    )
}

export default Empty