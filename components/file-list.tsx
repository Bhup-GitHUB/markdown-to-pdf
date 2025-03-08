"use client"

import { FileIcon, XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FileListProps {
  files: File[]
  onRemove: (index: number) => void
}

export function FileList({ files, onRemove }: FileListProps) {
  return (
    <div className="space-y-2 w-full">
      <h3 className="text-sm font-medium">Files to convert ({files.length})</h3>
      <ul className="space-y-2">
        {files.map((file, index) => (
          <li key={`${file.name}-${index}`} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
            <div className="flex items-center gap-2 truncate">
              <FileIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm truncate">{file.name}</span>
              <span className="text-xs text-muted-foreground">({(file.size / 1024).toFixed(1)} KB)</span>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onRemove(index)}>
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove file</span>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

