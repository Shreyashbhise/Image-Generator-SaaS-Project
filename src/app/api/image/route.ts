import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) { 
    const { prompt } = await request.json();

    function generateRandomNumber(): number {
        return Math.floor(Math.random() * 100000000) + 1;
    }

    const randomSeed = generateRandomNumber();

    // Fixing the URL construction
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}=sofa&randomSeed=${randomSeed}`;

    // Fetch the image from the corrected URL
    const response = await fetch(imageURL);

    // Assuming you want to return the imageURL
    return NextResponse.json({ url: imageURL });
}
