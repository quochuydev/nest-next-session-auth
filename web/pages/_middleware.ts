import { NextResponse, NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest & { user: any }) {
  return NextResponse.next();
}
