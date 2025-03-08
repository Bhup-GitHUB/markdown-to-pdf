import { marked } from "marked"
import { jsPDF } from "jspdf"

export async function convertMarkdownToPdf(markdownContent: string): Promise<Buffer> {
  // Convert markdown to HTML
  const html = marked(markdownContent)

  // Create a new PDF document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  // Simple text-based approach for reliable conversion
  const lines = markdownContent.split("\n")
  let y = 20

  for (const line of lines) {
    // Simple heading detection
    if (line.startsWith("# ")) {
      doc.setFontSize(24)
      doc.text(line.substring(2), 10, y)
      y += 10
    } else if (line.startsWith("## ")) {
      doc.setFontSize(20)
      doc.text(line.substring(3), 10, y)
      y += 8
    } else if (line.startsWith("### ")) {
      doc.setFontSize(16)
      doc.text(line.substring(4), 10, y)
      y += 6
    } else if (line.trim() !== "") {
      doc.setFontSize(12)

      // Handle long lines by splitting them
      const textLines = doc.splitTextToSize(line, 190)
      doc.text(textLines, 10, y)
      y += 5 * textLines.length
    } else {
      // Empty line
      y += 5
    }

    // Check if we need a new page
    if (y > 280) {
      doc.addPage()
      y = 20
    }
  }

  // Convert the PDF to a buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"))

  return pdfBuffer
}

