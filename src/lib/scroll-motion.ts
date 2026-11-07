export function getHeroScrollMotion(
  progress: number,
  viewportWidth: number,
  viewportHeight: number,
) {
  const value = clampProgress(progress);
  const coreTransition = Math.min(value / 0.62, 1);

  return {
    copyOpacity: 1 - value * 0.75,
    copyY: value === 0 ? 0 : value * -50,
    coreOpacity: Number((1 - coreTransition * 0.15).toFixed(4)),
    coreRotate: value * 16,
    coreScale: Number((1 - coreTransition * 0.58).toFixed(4)),
    // Mount is centred at (40vw, 50vh); settle its centre ~120px/150px inside the bottom-right corner.
    coreX: coreTransition * (viewportWidth * 0.6 - 120),
    coreY: coreTransition * (viewportHeight * 0.5 - 150),
    portraitScale: Number((1 + value * 0.045).toFixed(4)),
    portraitY: value * 70,
    railOpacity: 1 - value,
    railY: value * 30,
  };
}

export function getAboutScrollMotion(progress: number) {
  const value = clampProgress(progress);

  return {
    contentOpacity: 0.25 + value * 0.75,
    contentY: (1 - value) * 100,
    headingX: value === 1 ? 0 : (1 - value) * -100,
    surfaceScale: Number((0.88 + value * 0.12).toFixed(4)),
    surfaceY: (1 - value) * 140,
  };
}

function clampProgress(value: number) {
  return Math.min(Math.max(value, 0), 1);
}
