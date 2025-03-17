import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json();
    if (!tag) return NextResponse.json({ message: "Missing revalidation tag" }, { status: 422 });
    let { REVALIDATE_TOKEN } = process.env;
    const requestHeaders = new Headers(request.headers);
    const token = requestHeaders.get("Authorization");
    if (!token) return NextResponse.json({ message: "Missing Authorization Header" }, { status: 403 });
    if (REVALIDATE_TOKEN !== token) return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    revalidateTag(tag);
    return NextResponse.json({ message: `Tag \`${tag}\` sucessfully invalidated.` });
  } catch (error) {
    const message = (error as Error).message ?? error;
    console.error(message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
