import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(request) {
  
  const { email, password } = await request.json();

  if(!email || !password) return NextResponse.json({ message: 'Faltan campos'}, {status: 400});
  
  if(email==='yeison@gmail.com' && password==='123456'){
    
    const token = jwt.sign({
      exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 * 30,
      email: email,
      username: 'yeison'
    }, process.env.SECRET);

    const serialized = serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: '/'
    });

    // const response = NextResponse.next();
    // response.cookies.set({
    //   name: 'token',
    //   value: token,
    //   httpOnly: true
    // });

    // response.cookies.delete('token');

    // return response;

    return NextResponse.json({ message: 'Login successfully' },{ headers: {'Set-Cookie': serialized} });
  
  }
  
  return NextResponse.json({ message: 'Login error' },{ status: 400 });

}

export async function GET() {
  return NextResponse.json('correcto');
}