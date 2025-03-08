import { FileUploader } from "@/components/file-uploader"
import { PageHeader } from "@/components/page-header"

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <PageHeader
        title="Markdown to PDF Converter"
        description="Upload your Markdown files and convert them to PDF format with ease."
      />
      <FileUploader />
    </main>
  )
}

