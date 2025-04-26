import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useFormContext } from "react-hook-form";

import useRMScontent, { GenerateRMSContentParams } from "@/hooks/useRMSContent";

import "./rmsEditor.css";

const convertNewlinesToParagraphs = (text: string) => {
  const paragraphs = text.split("\n").map((line) => `<p>${line}</p>`);
  return paragraphs.join("");
};

function RMSEditor() {
  const form = useFormContext();
  const params = form.watch();

  const { data: rmsContent } = useRMScontent(
    params as GenerateRMSContentParams
  );

  const editor = useEditor(
    {
      extensions: [StarterKit],
      content: convertNewlinesToParagraphs(rmsContent),
    },
    [rmsContent]
  );

  return <EditorContent editor={editor} className="rms-editor h-full w-full" />;
}

export default RMSEditor;
