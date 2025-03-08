interface PageHeaderProps {
  title: string
  description: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold tracking-tight mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

