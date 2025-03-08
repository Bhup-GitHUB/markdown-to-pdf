"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileIcon, UploadCloudIcon, FileTextIcon, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileList } from "@/components/file-list"
import { cn } from "@/lib/utils"

export function FileUploader() {
  const router = useRouter()
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isConverting, setIsConverting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [convertedFileId, setConvertedFileId] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) => file.name.endsWith(".md"))

    if (droppedFiles.length > 0) {
      setFiles((prev) => [...prev, ...droppedFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).filter((file) => file.name.endsWith(".md"))
      setFiles((prev) => [...prev, ...selectedFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleConvert = async () => {
    if (files.length === 0) return

    setIsConverting(true)
    setProgress(0)
    setConvertedFileId(null) // Reset previous conversion

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return 90
        }
        return prev + 10
      })
    }, 300)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Conversion failed")
      }

      const data = await response.json()
      setConvertedFileId(data.fileId)
      setProgress(100)
    } catch (error) {
      console.error("Error converting files:", error)
      alert(`Error: ${error instanceof Error ? error.message : "Conversion failed"}`)
      setProgress(0)
    } finally {
      clearInterval(interval)
      setIsConverting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <h2 className="text-lg font-medium">Upload Markdown Files</h2>
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <div className="flex flex-col items-center gap-2">
              <UploadCloudIcon className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium">Drag and drop your Markdown files here</h3>
              <p className="text-sm text-muted-foreground">or click to browse (only .md files)</p>
              <input id="file-input" type="file" accept=".md" multiple className="hidden" onChange={handleFileChange} />
            </div>
          </div>
        </CardContent>
        {files.length > 0 && (
          <CardFooter className="flex flex-col items-stretch border-t pt-6">
            <FileList files={files} onRemove={removeFile} />
            <Button className="mt-4 w-full" onClick={handleConvert} disabled={isConverting}>
              {isConverting ? (
                <>
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                <>
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Convert to PDF
                </>
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {isConverting && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Converting...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          </CardContent>
        </Card>
      )}

      {convertedFileId && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileIcon className="h-5 w-5 text-primary" />
                <span className="font-medium">Conversion complete!</span>
              </div>
              <Button asChild size="sm" variant="outline">
                <a href={`/api/download/${convertedFileId}`} download>
                  Download PDF
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

