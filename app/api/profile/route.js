import { NextResponse } from "next/server";
import { verify } from "jsonwebtoken";

export async function GET(request) {

  const token = request.cookies.get('token');

  if(!token) return NextResponse.json({ message: 'Token not found' },{ status:400 });

  //console.log(token.value);

  try {

    const user = verify(token.value, process.env.SECRET);
    console.log(user);
    return NextResponse.json({ email: user.email, username: user.username });
    
  } catch (error) {
    return NextResponse.json('Invalid token', { status: 401 });
  }
}