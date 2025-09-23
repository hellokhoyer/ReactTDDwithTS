import type { ChangeEvent } from "react";
import { useState } from "react";

import {
  FACEBOOK_MAX_CHARACTERS,
  INSTAGRAM_MAX_CHARACTERS,
} from "../lib/constants";
import type { Stats } from "../lib/types";
import Warning from "./Warning";

type TextareaProps = {
  onStatsChange: (stats: Stats) => void;
};

export default function Textarea({ onStatsChange }: TextareaProps) {
  const [text, setText] = useState("");
  const [warning, setWarning] = useState("");

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    let textValue = event.target.value;

    if (textValue.includes("<script>")) {
      setWarning("You can't use <script> in your text.");
      textValue = textValue.replace("<script>", "");
    } else {
      setWarning("");
    }

    setText(textValue);

    const trimmed = textValue.trim();
    const words = trimmed.length > 0 ? trimmed.split(/\s+/).length : 0;

    onStatsChange({
      numberOfWords: words,
      numberOfCharacters: textValue.length,
      instagramCharactersLeft: INSTAGRAM_MAX_CHARACTERS - textValue.length,
      facebookCharactersLeft: FACEBOOK_MAX_CHARACTERS - textValue.length,
    });
  };

  return (
    <section className="textarea">
      <textarea
        spellCheck="false"
        placeholder="Enter your text"
        onChange={handleChange}
        value={text}
      />

      <Warning warningText={warning} />
    </section>
  );
}
