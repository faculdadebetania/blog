import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    let { REVALIDATE_TOKEN } = process.env;
    const requestHeaders = new Headers(request.headers);
    const token = requestHeaders.get("Authorization");
    if (!token) return NextResponse.json({ message: "Missing Authorization Header" }, { status: 403 });
    if (REVALIDATE_TOKEN !== token) return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    revalidateTag("posts");
    return NextResponse.json({ message: "Success" });
  } catch (error) {
    const message = (error as Error).message ?? error;
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
