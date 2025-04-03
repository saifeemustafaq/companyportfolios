import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

interface PageParams {
  params: Promise<{
    slug: string[]
  }>
}

export default async function ContentPage({
  params,
}: PageParams) {
  // Await the params before using them
  const resolvedParams = await params;
  
  // Handle the slug parameter
  const fileName = resolvedParams.slug.join('/');
  const decodedFileName = decodeURIComponent(fileName);
  const filePath = path.join(process.cwd(), 'app/content', `${decodedFileName}.md`);

  // Check if file exists
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    
    // Remove the sequence line if it exists
    const lines = fileContent.split('\n');
    const contentWithoutSeq = lines[0].startsWith('seq:') 
      ? lines.slice(1).join('\n')
      : fileContent;

    return (
      <article className="prose dark:prose-invert max-w-none">
        <MDXRemote source={contentWithoutSeq} />
      </article>
    );
  } catch (error) {
    return notFound();
  }
} 