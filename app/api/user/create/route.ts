import { createUser, getUserFromAddress } from "@/lib/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { address: evmAddress } = await request.json();

  if (!evmAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingUser = await getUserFromAddress(evmAddress);

  if (existingUser) {
    return NextResponse.json(existingUser, { status: 200 });
  }

  try {
    const user = await createUser({ evmAddress, subdomain: null, intmaxAddress: null });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};
