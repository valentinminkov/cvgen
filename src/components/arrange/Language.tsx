"use client";

import { $language } from "@/stores/languageStore";
import { useStore } from "@nanostores/react";
import { translations } from "@/config/content";
import { viewComponentStyles } from "@/components/arrange/classes";
import SortableItems from "./SortableItems";
import type { Language } from "@/types";

interface Props {}

const { containerClass, labelClass, dangerButtonClass, subheaderClass } =
  viewComponentStyles;

interface EntryProps {
  entry: Language;
  index: number;
  remove: (index: number) => void;
}

const Entry = ({ entry, index, remove }: EntryProps) => {
  return (
    <div key={index} className="py-4">
      <h2 className={subheaderClass}>{entry.language}</h2>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div>
          <p className={labelClass}></p>
          <p>{entry.skills.listening}</p>
        </div>
        <div>
          <p className={labelClass}>{translations.READING}</p>
          <p>{entry.skills.reading}</p>
        </div>
        <div>
          <p className={labelClass}>{translations.WRITING}</p>
          <p>{entry.skills.writing}</p>
        </div>
      </div>
      <button onClick={() => remove(index)} className={dangerButtonClass}>
        {translations.REMOVE_LANGUAGE}
      </button>
    </div>
  );
};

export default function LanguageView({}: Props) {
  const { language } = useStore($language);

  const removeEntry = (index: number) => alert("remove language");

  const renderEntry = (entry: Language, index: number) => (
    <Entry entry={entry} index={index} remove={removeEntry} />
  );

  return (
    <div className={`${containerClass}`}>
      {!!language.otherLanguages.length && (
        <div className="divide-y divide-gray-200">
          <SortableItems
            items={language.otherLanguages}
            itemRender={renderEntry}
            itemType="languages"
          ></SortableItems>
        </div>
      )}
    </div>
  );
}
