import { NextResponse } from "next/server"

export const POST = async () => {
  return NextResponse.json(undefined, { status: 204 });
}