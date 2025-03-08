import { type NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest, { params }: { params: { fileId: string } }) {
  try {
    const fileId = params.fileId

    // Validate ObjectId format
    let objectId: ObjectId
    try {
      objectId = new ObjectId(fileId)
    } catch (error) {
      return NextResponse.json({ error: "Invalid file ID format" }, { status: 400 })
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Get file metadata
    const fileMetadata = await db.collection("files").findOne({
      _id: objectId,
    })

    if (!fileMetadata) {
      return NextResponse.json({ error: "File not found" }, { status: 404 })
    }

    // Get file content
    const fileContent = await db.collection("fileContents").findOne({
      fileId: objectId,
    })

    if (!fileContent || !fileContent.content) {
      return NextResponse.json({ error: "File content not found" }, { status: 404 })
    }

    // Update download count
    await db.collection("files").updateOne({ _id: objectId }, { $inc: { downloadCount: 1 } })

    // Ensure we have a Buffer
    const buffer = Buffer.isBuffer(fileContent.content)
      ? fileContent.content
      : Buffer.from(fileContent.content.buffer || fileContent.content)

    // Create filename for download
    const filename = fileMetadata.originalName.replace(/\.md$/i, ".pdf")

    // Return the PDF file
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error) {
    console.error("Error downloading file:", error)
    return NextResponse.json({ error: "Failed to download file", details: (error as Error).message }, { status: 500 })
  }
}

