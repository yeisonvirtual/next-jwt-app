import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose';

export async function middleware(request) {

  const token = request.cookies.get('token');

  console.log(request.nextUrl.pathname);

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const secret = new TextEncoder().encode(process.env.SECRET);

  try {
    const { payload } = await jwtVerify(token.value, secret);
    console.log(payload);
    
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
}

// Rutas que pasan por el middleware
export const config = {
  matcher: ['/dashboard', '/admin/:path*'],
}
 
// This function can be marked `async` if using `await` inside
// export async function middleware(request) {

//   const token = request.cookies.get('token');

//   console.log(request.nextUrl.pathname)

//   if(request.nextUrl.pathname.startsWith('/dashboard')) {

//     if (!token) {
//       return NextResponse.redirect(new URL('/login', request.url));
//     }

//     const secret = new TextEncoder().encode(process.env.SECRET);

//     try {
//       const { payload } = await jwtVerify(token.value, secret);
//       console.log(payload);
//       return NextResponse.next();
//     } catch (error) {
//       console.log(error);
//       return NextResponse.redirect(new URL('/login', request.url));
//     }
    
//   } else {

//     return NextResponse.next();
    
//   }
  
// }