import { NextResponse } from "next/server";

export function errorResponse(message: string, status: number = 400) {
    return NextResponse.json({ error: message }, { status });
}