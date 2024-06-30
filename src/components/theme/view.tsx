"use client";

import { loadThemeComponents } from "@/lib/utils";
import { $settings } from "@/stores/settingsStore";
import { $allEntriesSorted, $allSections } from "@/stores/computed";
import type { ThemeComponents } from "@/types";
import { useStore } from "@nanostores/react";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import GeneratePdf from "@/components/GeneratePdf";
import html2PDF from "jspdf-html2canvas";
import type { MouseEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { translations } from "@/config/content";

function LoadingComponent({ componentName }: { componentName: string }) {
  return <div>Loading {componentName} data component</div>;
}

function ComponentNotAvailable({ componentName }: { componentName?: string }) {
  return (
    <div className="capitalize">{`${
      componentName ? `${componentName} ` : ""
    }component not found`}</div>
  );
}

export default function View() {
  const { theme, darkMode } = useStore($settings);
  const sections = useStore($allSections);
  const [components, setComponents] = useState<ThemeComponents | null>(null);
  const [loading, setLoading] = useState(true);
  const entries = useStore($allEntriesSorted);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents = await loadThemeComponents(theme);
      setComponents(loadedComponents);
      setLoading(false);
    };

    loadComponents();
  }, [theme]);

  if (loading) {
    return <Loading />;
  }

  if (!components) {
    return <ComponentNotAvailable />;
  }

  const componentMapping: Partial<ThemeComponents> = {
    personal: components.personal,
    skills: components.skills,
    educations: components.educations,
    experiences: components.experiences,
    languages: components.languages,
  };

  const componentPropsMapping: Partial<Record<string, any>> = {
    personal: {
      data: entries?.user,
      darkMode,
    },
    skills: {
      data: entries?.skills,
      darkMode,
    },
    educations: {
      data: entries?.educations,
      darkMode,
    },
    experiences: {
      data: entries?.experiences,
      darkMode,
    },
    languages: {
      data: entries?.languages,
      darkMode,
    },
  };

  const generatePDF = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!containerRef?.current) {
      toast({
        title: translations.CV_GENERATE_FAIL,
      });
      return;
    }
    await html2PDF(containerRef?.current, {});
  };

  return (
    <div>
      <GeneratePdf
        onClick={(e: MouseEvent<HTMLButtonElement>) => generatePDF(e)}
      />
      <div className="flex flex-col" ref={containerRef}>
        {sections.map((section) => {
          const Component = componentMapping[section];
          const componentProps = componentPropsMapping[section];

          return (
            <div key={section}>
              {Component ? (
                <Suspense
                  fallback={<LoadingComponent componentName={section} />}
                >
                  <Component {...componentProps} />
                </Suspense>
              ) : (
                <ComponentNotAvailable componentName={section} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
