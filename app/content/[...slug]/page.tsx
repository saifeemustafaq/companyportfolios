import fs from 'fs';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import Image, { ImageProps as NextImageProps } from 'next/image';

type CustomImageProps = Omit<NextImageProps, 'alt'> & {
  alt?: string;
};

interface ComponentProps {
  children?: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}

const components = {
  img: (props: CustomImageProps) => (
    <div className="relative w-full h-64 my-4">
      <Image
        {...props}
        fill
        style={{ objectFit: 'contain' }}
        alt={props.alt || 'Image'}
      />
    </div>
  ),
  pre: (props: ComponentProps) => (
    <pre {...props} className="not-prose bg-[var(--code-bg)] p-4 rounded-lg overflow-x-auto">
      {props.children}
    </pre>
  ),
  table: (props: ComponentProps) => (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  ),
  blockquote: (props: ComponentProps) => (
    <blockquote {...props} className="border-l-4 border-[var(--border-color)] pl-4 italic" />
  ),
};

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ContentPage({
  params,
}: PageProps) {
  // Get the slug parameter
  const resolvedParams = await params;
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
        <MDXRemote 
          source={contentWithoutSeq} 
          components={components}
          options={{
            parseFrontmatter: true
          }}
        />
      </article>
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_error) {
    return notFound();
  }
} 