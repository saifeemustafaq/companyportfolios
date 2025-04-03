import fs from 'fs/promises'
import path from 'path'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { Metadata } from 'next'
import { type ReactElement } from 'react'
import {
  MarkdownTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from '../../components/MarkdownTable'

export const dynamicParams = true

type Props = {
  params: {
    slug: string[]
  }
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { slug = [] } = params
  
  return {
    title: slug.length > 0 ? slug.join(' - ') : 'Content',
  }
}

const components = {
  table: MarkdownTable,
  thead: TableHead,
  tbody: TableBody,
  tr: TableRow,
  td: TableCell,
  th: TableHeader,
}

export default async function Page(props: Props): Promise<ReactElement> {
  const params = await props.params
  const { slug = [] } = params
  if (slug.length === 0) notFound()

  try {
    const decodedSlug = slug.map(segment => decodeURIComponent(segment))
    
    const filePath = path.join(
      process.cwd(),
      'content',
      `${decodedSlug.join('/')}.md`
    )

    console.log('Attempting to read file:', filePath)
    
    try {
      const content = await fs.readFile(filePath, 'utf-8')
      console.log('File read successfully')
      
      const contentWithoutSeq = content.replace(/^seq:\s*\d+\s*\n/, '')

      return (
        <article className="prose dark:prose-invert max-w-none prose-table:shadow-lg prose-table:border prose-table:border-gray-200 dark:prose-table:border-gray-700">
          <MDXRemote 
            source={contentWithoutSeq}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeHighlight],
              },
            }}
          />
        </article>
      )
    } catch (readError) {
      console.error('Error reading file:', readError)
      notFound()
    }
  } catch (error) {
    console.error('Error in page render:', error)
    notFound()
  }
} 