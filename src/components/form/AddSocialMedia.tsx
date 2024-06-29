"use client";
import { useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { SocialMedia } from "@/types";
import { content, translations } from "@/config/content";

interface Props {
  addSocialMedia: (socialMedia: SocialMedia) => boolean;
}

export default function AddSocialMedia({ addSocialMedia }: Props) {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  const {
    content: {
      components: { AddSocialMedia },
    },
  } = content;

  const resetInputFields = () => {
    setName("");
    setUrl("");
    setIcon("");
  };

  const submitSocialMedia = () => {
    const socialMedia: SocialMedia = { name, url, icon };
    const submitted = addSocialMedia(socialMedia);
    if (submitted) resetInputFields();
  };

  return (
    <div className="flex flex-col gap-4 w-6/12">
      <h3>{translations.ENTER_SOCIAL_MEDIA}</h3>
      <div>
        <Label>{translations.NAME}</Label>
        <Input
          value={name}
          onChange={(e) => setName(e?.currentTarget?.value)}
        />
      </div>
      <div>
        <Label>{translations.URL}</Label>
        <Input value={url} onChange={(e) => setUrl(e?.currentTarget?.value)} />
      </div>
      <div>
        <Label>{translations.SOCIAL_MEDIAL_URL}</Label>
        <Input
          value={icon}
          onChange={(e) => setIcon(e?.currentTarget?.value)}
        />
      </div>
      <div className="pt-2">
        <Button
          type="button"
          disabled={!(!!name && !!url && !!icon)}
          onClick={(e) => {
            e.preventDefault();
            submitSocialMedia();
          }}
        >
          {translations.ADD_SOCIAL_MEDIA}
        </Button>
      </div>
    </div>
  );
}
