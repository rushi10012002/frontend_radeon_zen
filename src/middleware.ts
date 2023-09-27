import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    // const basicAuth = req.headers.get('authorization')
    // // console.log("NextResponse", NextResponse);
    // // if (req.nextUrl.pathname != "/login") {
    // // return NextResponse.redirect(new URL("/login", req.url))
    // // }

    // console.log(req.headers.get('authorization'))
    // // if (!basicAuth) {
    // // return NextResponse.redirect(new URL("/login", req.url))
    // // }

}
// export const config = {
//     matcher: ["/", "/createEmail", "/trashEmail", "/draftEmail", "/favEmail", "/spamEmail", "/sentEmail"]
// }