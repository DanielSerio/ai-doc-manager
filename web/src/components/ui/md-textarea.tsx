import * as React from "react";
import CodeMirror from '@uiw/react-codemirror';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { languages } from '@codemirror/language-data';
import { cn } from "@/lib/utils";

function MdTextarea({ className, value, ...props }: React.ComponentProps<typeof CodeMirror>) {
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
      extensions={[markdown({ base: markdownLanguage, codeLanguages: languages })]}
    />
  );
}

export { MdTextarea };
