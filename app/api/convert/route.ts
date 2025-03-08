import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { convertMarkdownToPdf } from "@/lib/pdf-converter"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const files = formData.getAll("files") as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: "No markdown files provided" }, { status: 400 })
    }

    // Process the first file for simplicity
    // In a real app, you might want to handle multiple files
    const file = files[0]
    const fileContent = await file.text()

    // Convert markdown to PDF
    const pdfBuffer = await convertMarkdownToPdf(fileContent)

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Store file metadata in MongoDB
    const result = await db.collection("files").insertOne({
      originalName: file.name,
      contentType: "application/pdf",
      size: pdfBuffer.length,
      uploadDate: new Date(),
      downloadCount: 0,
    })

    // Store the PDF buffer in a separate collection
    await db.collection("fileContents").insertOne({
      fileId: result.insertedId,
      content: Buffer.from(pdfBuffer),
    })

    return NextResponse.json({
      success: true,
      fileId: result.insertedId.toString(),
    })
  } catch (error) {
    console.error("Error converting file:", error)
    return NextResponse.json({ error: "Failed to convert file", details: (error as Error).message }, { status: 500 })
  }
}

