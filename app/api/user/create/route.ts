import { createUser, getUserFromAddress } from "@/lib/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { evmAddress, subdomain, intmaxAddress } = await request.json();

  if (!evmAddress || !subdomain || !intmaxAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingUser = await getUserFromAddress(evmAddress);

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  try {
    const user = await createUser({ evmAddress, subdomain, intmaxAddress });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
};
