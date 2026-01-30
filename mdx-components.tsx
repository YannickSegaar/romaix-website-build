import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom image component with responsive sizing
    img: (props) => (
      <Image
        {...(props as any)}
        alt={props.alt || ''}
        width={800}
        height={600}
        className="rounded-lg"
        style={{ width: '100%', height: 'auto' }}
      />
    ),
    // Custom link component for external links
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith('http');
      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }
      return (
        <Link href={href || '#'} {...props}>
          {children}
        </Link>
      );
    },
    // Custom code block styling
    pre: ({ children, ...props }) => (
      <pre className="rounded-lg overflow-x-auto" {...props}>
        {children}
      </pre>
    ),
    // Apply prose classes to all MDX content
    wrapper: ({ children }) => (
      <div className="prose prose-slate lg:prose-lg dark:prose-invert max-w-none">
        {children}
      </div>
    ),
    ...components,
  };
}
