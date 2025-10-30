// app/api/git-rl/route.ts
import { NextResponse } from "next/server";

const GITHUB_API_BASE = "https://api.github.com";

export async function GET() {
    const token = process.env.GITHUB_TOKEN;
    const url = `${GITHUB_API_BASE}/rate_limit`;

    const headers: HeadersInit = {
        "User-Agent": "blazingly-fast-app",
        Accept: "application/vnd.github+json",
    };

    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(url, { headers });
    const data = await res.json();

    const usingToken = !!token;
    const limit = data?.rate?.limit ?? data?.resources?.core?.limit;
    const remaining = data?.rate?.remaining ?? data?.resources?.core?.remaining;

    return NextResponse.json({
        usingToken,
        limit,
        remaining,
        message: usingToken
            ? "✅ Using GITHUB_TOKEN"
            : "⚠️ No GITHUB_TOKEN detected (rate limit will be 60/hour)",
        raw: data,
    });
}
