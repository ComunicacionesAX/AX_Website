"use client";

import { useI18n } from "@/i18n/context";
import { ProductPage } from "@/components/product/ProductPage";
import { ProductHero } from "@/components/product/ProductHero";

export function InsyloPage() {
  const { t } = useI18n();
  const p = t.insylo;
  const c = t.common;

  return (
    <ProductPage
      current="insylo"
      productName="Insylo"
      problemAspect="732 / 686"
      solutionAspect="1 / 1"
      solutionGridCols="1.1fr_1fr"
      hero={
        <ProductHero
          title="Insylo"
          subtitle={p.subtitle}
          extraLine={p.range}
          precision={97}
          poster="/images/insylo/is_problem.webp"
          videoSrc="/images/insylo/insylo_hero.mp4"
        />
      }
      data={{
        pageLabel: p.pageLabel,
        problemTitle: p.problemTitle,
        problemImg: "/images/insylo/is_problem.webp",
        problemImgAlt: p.problemImgAlt,
        problems: p.problems,
        solutionSubtitle: p.solutionSubtitle,
        solutionImg: "/images/insylo/is_solution_center.webp",
        solutionImgAlt: p.solutionImgAltCenter,
        highlightTitle: p.highlightTitle,
        highlightText: p.highlightText,
        features: p.features,
        diffSlides: p.diffSlides,
        comparison: p.comparison,
        ecosystemHeading: (
          <>
            Insylo {c.connectsWith}{" "}
            <span className="font-light">{c.connectsWithRest}</span>
          </>
        ),
      }}
    />
  );
}
