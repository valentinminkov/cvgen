"use client";

import { loadThemeComponents } from "@/lib/utils";
import { $settings } from "@/stores/settingsStore";
import { $allEntriesSorted, $allSections } from "@/stores/computed";
import type { Sections, ThemeComponents } from "@/types";
import { useStore } from "@nanostores/react";
import { Suspense, useEffect, useRef, useState } from "react";
import Loading from "@/components/Loading";
import GeneratePdf from "@/components/GeneratePdf";
import html2PDF from "jspdf-html2canvas";
import type { MouseEvent } from "react";
import { toast } from "@/components/ui/use-toast";
import { translations } from "@/config/content";

const A4_PAGE_HEIGHT_PX = 1500;

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

const classes = {
  pageContainer: "",
  page: "pb-4",
};

export default function View() {
  const { theme, darkMode } = useStore($settings);
  const sections = useStore($allSections);
  const [components, setComponents] = useState<ThemeComponents | null>(null);
  const [loading, setLoading] = useState(true);
  const entries = useStore($allEntriesSorted);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const [pagesHTML, setPagesHTML] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents = await loadThemeComponents(theme);
      setComponents(loadedComponents);
      setLoading(false);
    };

    loadComponents();
  }, [theme]);

  // load pages html based on section component height
  // which is rendered before the 'pages'
  useEffect(() => {
    if (containerRef.current) {
      //  ensure that the height of elements is captured after they have been fully rendered
      const observer = new MutationObserver(() => {
        if (sectionRefs.current.length === sections.length) {
          const htmlPagesElements = formatPages();
          setPagesHTML(htmlPagesElements);
        }
      });

      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });

      return () => observer.disconnect();
    }
  }, [sections, entries, components]);

  const generatePDF = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!pageRefs?.current.length) {
      toast({
        title: translations.CV_GENERATE_FAIL,
      });
      return;
    }
    try {
      await html2PDF(pageRefs.current, {
        jsPDF: { format: "a4" },
        success: (pagesPdf) => {
          pagesPdf.save();
        },
      });
    } catch (error) {
      console.log("error generating pdf", error);
    }
  };

  const formatPages = () => {
    const newPages: JSX.Element[] = [];
    let currentPageHeight = 0;
    let currentPageElements: JSX.Element[] = [];

    sectionRefs.current?.forEach((sectionRef, i) => {
      if (sectionRef) {
        const sectionHeight = sectionRef.offsetHeight;
        const sectionHtml = getSectionHtml(sections[i], i);
        if (currentPageHeight + sectionHeight > A4_PAGE_HEIGHT_PX) {
          // Complete the current page and start a new one
          newPages.push(
            <div
              className={`page-${newPages.length + 1} ${classes.page}`}
              key={newPages.length}
              ref={(newPageRef) => {
                if (newPageRef) pageRefs.current.push(newPageRef);
              }}
            >
              {currentPageElements}
            </div>
          );
          currentPageElements = [sectionHtml];
          currentPageHeight = sectionHeight;
        } else {
          // Add to the current page
          currentPageElements.push(sectionHtml);
          currentPageHeight += sectionHeight;
        }
      }
    });

    if (currentPageElements.length) {
      newPages.push(
        <div
          className={`page-${newPages.length + 1} ${classes.page}`}
          key={newPages.length}
          ref={(newPageRef) => {
            if (newPageRef) pageRefs.current.push(newPageRef);
          }}
        >
          {currentPageElements}
        </div>
      );
    }

    return newPages;
  };

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

  const getSectionHtml = (section: Sections, index?: number) => {
    const Component = componentMapping[section];
    const componentProps = componentPropsMapping[section];

    return (
      <div
        key={section}
        ref={(curRef) => {
          if (index !== undefined && curRef) {
            sectionRefs.current[index] = curRef;
          }
        }}
      >
        {Component ? (
          <Suspense fallback={<LoadingComponent componentName={section} />}>
            <Component {...componentProps} />
          </Suspense>
        ) : (
          <ComponentNotAvailable componentName={section} />
        )}
      </div>
    );
  };

  return (
    <div>
      <GeneratePdf
        onClick={(e: MouseEvent<HTMLButtonElement>) => generatePDF(e)}
      />

      {!pagesHTML.length && (
        <div ref={containerRef}>
          <div className="flex flex-col page">
            {sections.map((section, index) => getSectionHtml(section, index))}
          </div>
        </div>
      )}

      {pagesHTML.length && pagesHTML}
    </div>
  );
}
