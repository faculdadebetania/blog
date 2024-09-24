import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export default function RevalidateTagHandler(tag: string) {
  return function (request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    if (!requestHeaders.has("Authorization")) return;
    if (process.env.REVALIDATE_TOKEN !== requestHeaders.get("Authorization")) return;
    revalidateTag(tag);
  };
}
