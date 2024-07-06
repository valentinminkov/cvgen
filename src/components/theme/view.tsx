"use client";

import { cn, loadThemeComponents } from "@/lib/utils";
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
  page: "pb-4 bg-gray-800 shadow-xl",
};

export default function View() {
  const { theme, darkMode } = useStore($settings);
  const sections = useStore($allSections);
  const [components, setComponents] = useState<ThemeComponents | null>(null);
  const [loading, setLoading] = useState(true);
  const entries = useStore($allEntriesSorted);
  const containerRef = useRef<HTMLDivElement>();
  const sectionRefs = useRef<HTMLDivElement[]>([]);
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const [pagesHTML, setPagesHTML] = useState<JSX.Element[]>([]);
  const [pdfHeight, setPdfHeight] = useState<number | null>(null);
  const [pdfWidth, setPdfWidth] = useState<number | null>(null);

  useEffect(() => {
    const loadComponents = async () => {
      const loadedComponents = await loadThemeComponents(theme);
      setComponents(loadedComponents);
      setLoading(false);
    };

    loadComponents();
  }, [theme]);

  const calculatePdfDimensions = async (element: HTMLElement) => {
    try {
      await html2PDF(element, {
        jsPDF: {
          format: "a4",
          unit: "pt",
        },
        autoResize: true,
        success: (pdf) => {
          const A4_PAGE_HEIGHT_PT = pdf.internal.pageSize.getHeight();
          const A4_PAGE_WIDTH_PT = pdf.internal.pageSize.getWidth();
          const A4_PAGE_HEIGHT_PX = A4_PAGE_HEIGHT_PT * 1.333;
          const A4_PAGE_WIDTH_PX = A4_PAGE_WIDTH_PT * 1.333;
          setPdfHeight(A4_PAGE_HEIGHT_PX);
          setPdfWidth(A4_PAGE_WIDTH_PX);
        },
      });
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  useEffect(() => {
    if (!sectionRefs?.current[0]) return;
    // On first render the component size might be smaller than actual
    // which messes with the pages size. Set a observer watching the component height
    // to avoid such cases
    const resizeObserver = new ResizeObserver(() => {
      if (
        pdfHeight &&
        pdfWidth &&
        sections.length === sectionRefs.current.length
      ) {
        const BUFFER = 50;
        const htmlPagesElements = formatPages(
          Math.floor(pdfHeight) + BUFFER,
          Math.floor(pdfWidth) + BUFFER
        );
        setPagesHTML(htmlPagesElements);
      }
    });
    resizeObserver.observe(sectionRefs.current[0]);
    return () => resizeObserver.disconnect(); // clean up
  }, [pdfHeight, pdfWidth, sections.length, sectionRefs.current.length]);

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
        jsPDF: { format: "a4", unit: "pt" },
        success: (pagesPdf) => {
          pagesPdf.save();
        },
      });
    } catch (error) {
      console.error("Error generating PDF", error);
    }
  };

  const formatPages = (maxPageHeight: number, maxPageWidth: number) => {
    const newPages: JSX.Element[] = [];
    // We do not want pageRefs building up
    pageRefs.current = [];
    let currentPageHeight = 0;
    let currentPageElements: JSX.Element[] = [];

    sectionRefs.current?.forEach((sectionRef, i) => {
      if (sectionRef) {
        const sectionHeight = sectionRef.offsetHeight;
        const sectionHtml = getSectionHtml(sections[i], i);
        if (currentPageHeight + sectionHeight > maxPageHeight) {
          newPages.push(
            <div
              style={{
                width: Math.floor(maxPageWidth),
              }}
              className={cn(`page-${newPages.length + 1}`)}
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
          currentPageElements.push(sectionHtml);
          currentPageHeight += sectionHeight;
        }
      }
    });

    if (currentPageElements.length) {
      newPages.push(
        <div
          style={{
            minHeight: Math.floor(maxPageHeight),
            width: Math.floor(maxPageWidth),
          }}
          className={cn(`page-${newPages.length + 1}`, classes.page)}
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
    <div className="flex flex-col gap-4 items-center">
      <div className="w-full"></div>
      {!pagesHTML.length && (
        <div
          ref={(ref) => {
            if (ref) {
              containerRef.current = ref;
              if (!pdfHeight || !pdfWidth) {
                calculatePdfDimensions(ref);
              }
            }
          }}
        >
          <div className="flex flex-col page">
            {sections.map((section, index) => getSectionHtml(section, index))}
          </div>
        </div>
      )}

      <div>
        <GeneratePdf
          onClick={(e: MouseEvent<HTMLButtonElement>) => generatePDF(e)}
        />
        <div className="flex flex-col gap-8 items-center">
          {!!pagesHTML.length &&
            pagesHTML.map((page) => {
              return (
                <div
                  style={pdfHeight ? { minHeight: pdfHeight } : {}}
                  className={classes.page}
                >
                  {page}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
