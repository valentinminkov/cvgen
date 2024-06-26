"use client";

import { loadThemeComponents } from "@/lib/utils";
import { $settings } from "@/stores/settingsStore";
import type { ThemeComponents } from "@/types";
import { useStore } from "@nanostores/react";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/components/Loading";

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
  const {
    theme,
    order: { sections },
  } = useStore($settings);
  const [components, setComponents] = useState<ThemeComponents | null>(null);
  const [loading, setLoading] = useState(true);

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

  const componentMapping = {
    personal: components.personal,
    skills: components.skills,
    education: components.educations,
    experience: components.experiences,
    languages: components.language,
  };

  return (
    <>
      {sections.map((section) => {
        const Component = componentMapping[section];
        return (
          <div key={section}>
            {Component ? (
              <Suspense fallback={<LoadingComponent componentName={section} />}>
                <Component />
              </Suspense>
            ) : (
              <ComponentNotAvailable componentName={section} />
            )}
          </div>
        );
      })}
    </>
  );
}
