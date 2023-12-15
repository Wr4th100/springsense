import { NextResponse, type NextRequest } from "next/server";


export async function POST (req: NextRequest) {
    console.log("=== POST ===");
    console.log(req.text())
    
    return NextResponse.json({ message: "Hello, world!" });
}