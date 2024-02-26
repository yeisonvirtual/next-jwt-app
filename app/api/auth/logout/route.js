import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function POST(request) {
  const token = request.cookies.get('token');

  if(!token) return NextResponse.json({ message: 'Token not found' },{ status:400 });

  try {
    
    verify(token.value, process.env.SECRET);

    return NextResponse.json({ message: 'Logout successfully' },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json('Invalid token', { status: 401 });
  }


  

}