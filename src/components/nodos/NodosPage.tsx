"use client";

import { useI18n } from "@/i18n/context";
import { ProductPage } from "@/components/product/ProductPage";
import { ProductHero } from "@/components/product/ProductHero";

export function NodosPage() {
  const { t } = useI18n();
  const p = t.nodos;
  const c = t.common;

  return (
    <ProductPage
      current="nodos"
      productName={p.title1}
      problemAspect="730 / 691"
      solutionAspect="1 / 1"
      solutionGridCols="1.1fr_1fr"
      hero={
        <ProductHero
          title={
            <>
              {p.title1}
              <br />
              {p.title2}
            </>
          }
          subtitle={p.subtitle}
          extraLine={p.tagline}
          precision={99}
          poster="/images/nodos/nodos_problem.webp"
          videoSrc="/images/nodos/nodos_hero.mp4"
        />
      }
      data={{
        pageLabel: p.pageLabel,
        problemTitle: p.problemTitle,
        problemImg: "/images/nodos/nodos_problem.webp",
        problemImgAlt: p.problemImgAlt,
        problems: p.problems,
        solutionSubtitle: p.solutionSubtitle,
        solutionImg: "/images/nodos/nodos_solution_center.webp",
        solutionImgAlt: p.solutionImgAltCenter,
        highlightTitle: `${p.highlightTitle1} ${p.highlightTitle2}`,
        highlightText: p.highlightText,
        features: p.features,
        diffSlides: p.diffSlides,
        comparison: p.comparison,
        ecosystemHeading: (
          <>
            {p.title1} {c.connectsWith}{" "}
            <span className="font-light">{c.connectsWithRest}</span>
          </>
        ),
      }}
    />
  );
}
