import { describe, expect, it } from "vitest";

import {
  getAboutScrollMotion,
  getHeroScrollMotion,
} from "@/lib/scroll-motion";

describe("scroll motion", () => {
  it("moves the AI core away from the portrait as the hero scrolls out", () => {
    expect(getHeroScrollMotion(0, 1440, 1000)).toEqual({
      copyOpacity: 1,
      copyY: 0,
      coreOpacity: 1,
      coreRotate: 0,
      coreScale: 1,
      coreX: 0,
      coreY: 0,
      portraitScale: 1,
      portraitY: 0,
      railOpacity: 1,
      railY: 0,
    });

    expect(getHeroScrollMotion(1, 1440, 1000)).toEqual({
      copyOpacity: 0.25,
      copyY: -50,
      coreOpacity: 0.85,
      coreRotate: 16,
      coreScale: 0.54,
      coreX: 432,
      coreY: 440,
      portraitScale: 1.045,
      portraitY: 70,
      railOpacity: 0,
      railY: 30,
    });
  });

  it("raises and expands the violet surface while its copy enters", () => {
    expect(getAboutScrollMotion(0)).toEqual({
      contentOpacity: 0.25,
      contentY: 100,
      headingX: -100,
      surfaceScale: 0.88,
      surfaceY: 140,
    });

    expect(getAboutScrollMotion(1)).toEqual({
      contentOpacity: 1,
      contentY: 0,
      headingX: 0,
      surfaceScale: 1,
      surfaceY: 0,
    });
  });

  it("clamps progress outside the scroll range", () => {
    expect(getHeroScrollMotion(-1, 1000, 800)).toEqual(
      getHeroScrollMotion(0, 1000, 800),
    );
    expect(getAboutScrollMotion(2)).toEqual(getAboutScrollMotion(1));
  });
});
