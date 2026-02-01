
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";
import  bcrypt  from 'bcryptjs';
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';



const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
export const prisma = new PrismaClient({ adapter })
export async function POST(request:NextRequest) {
    try{
const { name, email, password } = await request.json();

    if(!email){
        console.log("Email is missing!");
       return NextResponse.json({error:"email is Require"},{status:400})
    }
    if(!password){
        console.log("Password is missing!");
        return NextResponse.json({error:"password is Require"},{status:400})
    }
    if(password.length < 6){
        console.log("Password is too short!");
        return NextResponse.json({error:"رمز عبور باید حداقل ۶ کاراکتر باشد"},{status:400})
    }
        // اعتبارسنجی فرمت ایمیل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        console.log('فرمت ایمیل معتبر نیست');
        
      return NextResponse.json(
        { error: 'فرمت ایمیل معتبر نیست' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
        where: { email: email.trim() }
    })
    if(existingUser){
        console.log("کاربر با این ایمیل قبلاً ثبت شده است");
        
       return NextResponse.json({error:"این ایمیل قبلاً ثبت شده است"},{status:400})
    }
    //هش کردن پسورد
    const hasheddPassword = await bcrypt.hash(password.trim(),12)

    // ایجاد کاربر جدید
    const user = await prisma.user.create({
        data:{
            name: name?.trim() || null,
            email: email.trim(),
            password: hasheddPassword
        }
    })
        // حذف رمز عبور از پاسخ
    const { password: _, ...userWithoutPassword } = user


    return NextResponse.json({
        success:true,
        message: 'کاربر با موفقیت ایجاد شد',
        user:userWithoutPassword
    },{status:201})
    } catch (err) {
        console.error('خطا در ثبت نام کاربر:', err)
        return NextResponse.json(
          { error: 'خطایی در سرور رخ داده است' },
          { status: 500 }
        )
      }

    return NextResponse.json({error:"خطا در ثبت کاربر"},{status:500} )
}
