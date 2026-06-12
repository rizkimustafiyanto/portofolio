import { animation } from '~/constans/animation'

export const useAnimation = () => {
  return {
    fadeUp: `transition-all ${animation.duration.slower} ${animation.easing.smooth}`,
    hoverScale: 'hover:scale-[1.02]',
  }
}
