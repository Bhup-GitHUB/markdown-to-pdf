# Markdown to PDF Converter

A modern web application that converts Markdown files to PDF format with ease. Built with Next.js and TypeScript, this application provides a simple and intuitive interface for converting your Markdown documents to professionally formatted PDFs.

## 🚀 Features

- **Drag & Drop Interface**: Easy file upload through drag and drop functionality
- **Multiple File Selection**: Select multiple markdown files through the file browser
- **Progress Tracking**: Real-time conversion progress indicator
- **File Management**: View and manage selected files before conversion
- **Instant Download**: Direct download of converted PDF files
- **Persistent Storage**: MongoDB integration for storing conversion history
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Dark Mode Support**: System-based theme switching capability

## 🛠️ Tech Stack

### Frontend
- **Next.js 15.1.0**: React framework for production
- **React 18**: UI library
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible UI components
- **Lucide React**: Beautiful icons
- **class-variance-authority**: Dynamic class generation
- **next-themes**: Theme management

### Backend
- **Next.js API Routes**: Server-side functionality
- **MongoDB**: Document storage and retrieval
- **marked**: Markdown parsing
- **jsPDF**: PDF generation

### Development Tools
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS compatibility
- **ESLint**: Code linting
- **Tailwind Merge**: CSS class merging

## 🏗️ Project Structure

```
markdown-to-pdf/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # UI components
│   ├── file-list.tsx     # File listing component
│   ├── file-uploader.tsx # File upload component
│   └── page-header.tsx   # Header component
├── lib/                   # Utility functions
│   ├── mongodb.ts        # MongoDB connection
│   ├── pdf-converter.ts  # PDF conversion logic
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔄 Workflow

1. Upload Markdown files through drag & drop or file browser
2. Review selected files in the list
3. Click "Convert to PDF" button
4. Monitor conversion progress
5. Download the converted PDF file

## 🌟 Potential Improvements

### Enhanced Markdown Support
- Add support for GitHub Flavored Markdown (GFM)
- Implement syntax highlighting for code blocks
- Support for mathematical equations (LaTeX)
- Table of contents generation

### PDF Customization
- Customizable PDF templates
- Page size and orientation options
- Font selection and styling options
- Header and footer customization
- Page numbering options
- Watermark support

### File Management
- Batch processing of multiple files
- Conversion history tracking
- File preview before conversion
- Support for larger file sizes
- Progress tracking for individual files

### User Experience
- Authentication and user accounts
- Saved preferences for PDF formatting
- Keyboard shortcuts
- Offline support
- File compression options
- API access for programmatic conversion

### Performance
- Server-side caching
- Parallel processing for multiple files
- Optimized PDF generation
- Progress streaming for large files
- Queue system for heavy workloads

### Security
- File type validation
- Content sanitization
- Rate limiting
- Access control
- Secure file storage



