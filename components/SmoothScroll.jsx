"use client";
import { ReactLenis, useLenis } from 'lenis/react'

function SmoothScroll({children}) {
  return (
    <ReactLenis root>
        {children}
    </ReactLenis>
  )
}

export default SmoothScroll;