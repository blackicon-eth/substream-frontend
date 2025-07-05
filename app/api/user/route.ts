import { getUserFromAddress } from "@/lib/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    const user = await getUserFromAddress(address);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to get user" }, { status: 500 });
  }
};
