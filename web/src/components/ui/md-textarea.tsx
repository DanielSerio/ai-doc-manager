import * as React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/theme";

function MdTextarea({ className, value, ...props }: React.ComponentProps<typeof CodeMirror>) {
  const { theme } = useTheme();
  const classNames = cn(
    `p-2 max-h-[33svh] overflow-y-auto`,
    'border rounded-sm',
    className
  );
  return (
    <CodeMirror
      {...props}
      value={`${value}`}
      className={classNames}
      theme={theme === 'dark' ? 'dark' : 'light'}
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
    />
  );
}

export { MdTextarea };
