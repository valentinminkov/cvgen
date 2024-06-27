"use client";

import { loadThemeComponents } from "@/lib/utils";
import { $settings } from "@/stores/settingsStore";
import { $allEntriesSorted } from "@/stores/computed";
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
    darkMode,
    order: { sections },
  } = useStore($settings);
  const [components, setComponents] = useState<ThemeComponents | null>(null);
  const [loading, setLoading] = useState(true);
  const entries = useStore($allEntriesSorted);

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
      data: entries.user,
      darkMode,
    },
    skills: {
      data: entries.skills,
      darkMode,
    },
    educations: {
      data: entries.educations,
      darkMode,
    },
    experiences: {
      data: entries.experiences,
      darkMode,
    },
    languages: {
      data: entries.languages,
      darkMode,
    },
  };

  return (
    <div className="flex flex-col">
      {sections.map((section) => {
        const Component = componentMapping[section];
        const componentProps = componentPropsMapping[section];

        return (
          <div key={section}>
            {Component ? (
              <Suspense fallback={<LoadingComponent componentName={section} />}>
                <Component {...componentProps} />
              </Suspense>
            ) : (
              <ComponentNotAvailable componentName={section} />
            )}
          </div>
        );
      })}
    </div>
  );
}
