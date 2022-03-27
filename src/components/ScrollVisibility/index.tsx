import React, { useState, useLayoutEffect } from "react"
import throttle from "lodash/throttle"

type ScrollVisibilityProps = {
  [key: string]: any
}

const ScrollVisibility: React.FC<ScrollVisibilityProps> = ({
  className,
  children,
  hidden = true,
  visiblePageYOffset = 500,
}) => {
  const [isHidden, setIsHidden] = useState(hidden)

  const handleVisibility = throttle(() => {
    setIsHidden(window.pageYOffset <= visiblePageYOffset)
  }, 150)

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleVisibility)

    return () => {
      window.removeEventListener("scroll", handleVisibility)
    }
  }, [])

  return (
    <div className={`${isHidden ? "hidden" : ""} ${className}`}>{children}</div>
  )
}

export default ScrollVisibility
