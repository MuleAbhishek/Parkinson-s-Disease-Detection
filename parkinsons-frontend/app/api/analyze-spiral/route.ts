import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const name = formData.get("name") as string;
    const surname = formData.get("surname") as string;
    const age = formData.get("age") as string;
    const gender = formData.get("gender") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json(
        { success: false, error: "No image provided" },
        { status: 400 }
      );
    }

    console.log("Calling Spiral API with image:", image.name);

    // Create a new FormData object for the external API - ONLY with the image
    const apiFormData = new FormData();
    apiFormData.append("image", image);

    // Call the external Spiral API
    const apiResponse = await fetch("http://127.0.0.1:8000/predict/spiral/", {
      method: "POST",
      body: apiFormData,
    });

    console.log("API Response status:", apiResponse.status);

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("API Error:", errorText);
      throw new Error(`API responded with status: ${apiResponse.status}`);
    }

    const apiResult = await apiResponse.json();
    console.log("API Result:", apiResult);

    // Calculate processing time (random for demo)
    const processingTime = `${(Math.random() * 2 + 3).toFixed(1)} seconds`;

    // Map the API response to our application's format
    const result = {
      success: true,
      diagnosis:
        apiResult.prediction.toLowerCase() === "parkinson"
          ? "detected"
          : "not-detected",
      processingTime,
      scanType: "spiral",
      patientInfo: {
        name,
        surname,
        age,
        gender,
      },
      imageUrl: "", // Will be set on client side
    };

    console.log("Sending result:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Spiral analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Analysis failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
