import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { cn } from '@/lib/utils';

export function MdRenderer({ content }: { content: string; }) {
  const classNames = cn(
    'markdown',
    `p-2 max-h-[41svh] overflow-y-auto`,
  );
  return (
    <div className={classNames}>
      <ReactMarkdown
        components={{
          code({ node, className, children, ref, style, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div" // Use a div for the pre tag
                style={oneLight}
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} ref={ref} {...props}>
                {children}
              </code>
            );
          },
        }}
      >{content}</ReactMarkdown>
    </div>
  );
}