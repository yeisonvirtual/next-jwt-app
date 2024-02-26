import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  
  const { email, password } = await request.json();

  if(!email || !password) return NextResponse.json({ message: 'Faltan campos'}, {status: 400});
  
  if(email==='yeison@gmail.com' && password==='123456'){
    
    const token = jwt.sign({
      exp: Math.floor(Date.now()/1000) + 60 * 60 * 24 * 30,
      email: email,
      username: 'yeison'
    }, process.env.SECRET);
    
    return NextResponse.json({ message: 'Login successfully', user: { email, username: 'yeison' }, jwt: token });
  
  }
  
  return NextResponse.json({ message: 'Login error' },{ status: 400 });

}

export async function GET() {
  return NextResponse.json('correcto');
}