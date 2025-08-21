import { deleteSession } from "@/lib/sessions"
import { NextResponse } from "next/server";

export const POST = async () => {
  try {
    await deleteSession();
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log("Failed to delete user session! ", error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}