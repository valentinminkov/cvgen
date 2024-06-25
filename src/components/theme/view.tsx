"use client";

import { loadThemeComponents } from "@/lib/utils";
import { $allEntriesSorted } from "@/stores/computed";
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
      componentName ? "component not found" : "components not found"
    } component not found`}</div>
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

  return (
    <>
      {/* TODO Make it dynamic */}
      {sections.map((section) => {
        {
          if (section === "personal") {
            {
              return components.personal ? (
                <Suspense
                  fallback={<LoadingComponent componentName={section} />}
                >
                  <components.personal />
                </Suspense>
              ) : (
                <ComponentNotAvailable componentName={section} />
              );
            }
          } else if (section === "skills") {
            {
              return components.skills ? (
                <Suspense
                  fallback={<LoadingComponent componentName={section} />}
                >
                  <components.skills />
                </Suspense>
              ) : (
                <ComponentNotAvailable componentName={section} />
              );
            }
          } else if (section === "education") {
            {
              return components.educations ? (
                <Suspense
                  fallback={<LoadingComponent componentName={section} />}
                >
                  <components.educations />
                </Suspense>
              ) : (
                <ComponentNotAvailable componentName={section} />
              );
            }
          } else if (section === "experience") {
            {
              return components.experiences ? (
                <Suspense
                  fallback={<LoadingComponent componentName={section} />}
                >
                  <components.experiences />
                </Suspense>
              ) : (
                <ComponentNotAvailable componentName={section} />
              );
            }
          } else if (section === "languages") {
            {
              return components.language ? (
                <Suspense
                  fallback={<LoadingComponent componentName={"languages"} />}
                >
                  <components.language />
                </Suspense>
              ) : (
                <ComponentNotAvailable componentName={section} />
              );
            }
          }
        }
      })}
    </>
  );
}
