import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest , NextResponse} from 'next/server'

import { getDatafromToken } from '@/helpers/detDatafromToken'

connect()

export async function POST(request:NextRequest) {
    //extract data from token
    const userId = await getDatafromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    return NextResponse.json({
        message:"User Found",
        data:user
    })

}