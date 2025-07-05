import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";
import ky from "ky";

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();

    const response = await ky.post(`${env.NEXT_PUBLIC_TEE_URL}/api/register`, { json: body });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Failed to register subdomain" }, { status: 500 });
  }
};
