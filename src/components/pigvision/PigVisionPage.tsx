"use client";

import { useI18n } from "@/i18n/context";
import { ProductPage } from "@/components/product/ProductPage";
import { ProductHero } from "@/components/product/ProductHero";

export function PigVisionPage() {
  const { t } = useI18n();
  const p = t.pigvision;
  const c = t.common;

  return (
    <ProductPage
      current="pigvision"
      productName="PigVision"
      problemAspect="732 / 663"
      solutionAspect="779 / 962"
      solutionGridCols="1.1fr_1fr"
      hero={
        <ProductHero
          title="PigVision"
          subtitle={p.subtitle}
          extraLine={p.range}
          precision={97}
          poster="/images/pigvision/pv_problem.webp"
          videoSrc="/images/pigvision/pigvision_hero.mp4"
        />
      }
      data={{
        pageLabel: p.pageLabel,
        problemTitle: p.problemTitle,
        problemImg: "/images/pigvision/pv_problem.webp",
        problemImgAlt: p.problemImgAlt,
        problems: p.problems,
        solutionSubtitle: p.solutionSubtitle,
        solutionImg: "/images/pigvision/pv_solution_render.webp",
        solutionImgAlt: p.solutionImgAltRender,
        highlightTitle: `${p.highlightTitle1} ${p.highlightTitle2}`,
        highlightText: p.highlightText,
        features: p.features,
        diffSlides: p.diffSlides,
        comparison: p.comparison,
        ecosystemHeading: (
          <>
            PigVision {c.connectsWith}{" "}
            <span className="font-light">{c.connectsWithRest}</span>
          </>
        ),
      }}
    />
  );
}
