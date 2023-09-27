'use client'
import * as React from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useParams } from 'next/navigation'
import Protected from '@/components/protected';
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux';
export default function App() {
    const router = useRouter()
    const user = useSelector((state: any) => state.auth?.user)
    const params = useParams()
    const appID = 236965399;
    const serverSecret = "f432299f76bdc0bb2c7b670c495278b5";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, params?.roomID, Date.now().toString(), user?.name.toString());


    // start the call
    let myMeeting = async (element: any) => {
        // Create instance object from Kit Token.
        const zp: any = ZegoUIKitPrebuilt.create(kitToken);
        // start the call
        zp.joinRoom({
            container: element,
            maxUsers: 10,

            sharedLinks: [
                {
                    name: "copy link",
                    url: `http://localhost:3000/live/${params.roomID}`
                }
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.LiveStreaming
            },
            showScreenSharingButton: true,
            showRoomTimer: true,
            onLeaveRoom: () => {
                router.push("/public")
            }


        });

    };

    return (
        <Protected>

            <div
                className="container"
                style={{ width: '100vw', height: '100vh' }}
            >
                <div ref={myMeeting} />

            </div>
        </Protected>
    );
}