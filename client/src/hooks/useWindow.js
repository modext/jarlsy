import React, { useEffect, useRef, useState } from 'react'

function useWindow() {
    const [width, setWidth] = useState(0)
    const timer = useRef(null)
    useEffect(() => {
        let handler = (e) => {
            if (timer.current) clearTimeout(timer.current)
            timer.current = setTimeout(() => {
                setWidth(window.innerWidth)
            }, 2000)
        }
        window.addEventListener("resize", handler)
    }, [])
    return [!width ? window.innerWidth : width]
}

export default useWindow
