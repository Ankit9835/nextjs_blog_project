import { NextResponse } from "next/server";
import dbConnect from '@/utils/dbConnect'
import User from '@/models/user'
import bcrypt from 'bcrypt'

export async function POST(req) {
    const _req = await req.json()
    await dbConnect()
    try {
        const { name, email, password } = _req
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return NextResponse.json({
                err: 'Email already exists',
            },{
                status: 402
            })
        } else {
            await new User({
                name,
                email,
                password: await bcrypt.compare(password, user.password)
            }).save()

            return  NextResponse.json({
                success: 'Registered Sucessfully',

            },{
                status: 200
            })
        }


        } catch (error) {
            return NextResponse.json({
                err: 'Server error',
            }, {
                status: 500
            })
        }
    }