import {connect} from '@/dbconfig/dbconfig'
import User from '@/models/userModel'
import { NextRequest , NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody= await request.json()
        const{email,password}=reqBody
        //validation
        console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User doesnot Exists"},{status:400})
        }
        console.log("User exist");

        const validPassword = bcryptjs.compare(password,user.password)

        if(!validPassword){
            return NextResponse.json({error: "Check Your Credentials"},{status:400})
        }
        
        const tokenData={
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET! ,{expiresIn:'1d'})

        const responce = NextResponse.json({
            message:"Logged In Succcess",
            success:true
        })

        responce.cookies.set("token",token,{
            httpOnly:true
        })

        return responce

    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}
