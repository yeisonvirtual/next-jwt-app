import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  const token = request.cookies.get('token');

  if(!token) return NextResponse.json({ message: 'Token not found' },{ status:400 });

  try {
    
    verify(token.value, process.env.SECRET);
    
    const serialized = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 0,
      path: '/'
    });

    return NextResponse.json({ message: 'Logout successfully' },{ headers: {'Set-Cookie': serialized} },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json('Invalid token', { status: 401 });
  }


  

}