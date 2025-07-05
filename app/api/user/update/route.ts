import { getUserFromAddress, updateUser } from "@/lib/db/queries/user";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  const { evmAddress, subdomain, intmaxAddress } = await request.json();

  if (!evmAddress) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const existingUser = await getUserFromAddress(evmAddress);

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  try {
    const user = await updateUser(evmAddress, {
      subdomain: subdomain || existingUser.subdomain,
      intmaxAddress: intmaxAddress || existingUser.intmaxAddress,
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
};
