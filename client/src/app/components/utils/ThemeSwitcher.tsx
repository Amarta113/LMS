'use client'

import {useState, useEffect} from 'react'
import { useTheme } from 'next-themes'
import { BiMoon, BiSun} from 'react-icons/bi'

const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false)
    const {resolvedTheme, setTheme} = useTheme()

    useEffect(()=> setMounted(true), []);

    if(!mounted){
        return null
    }
    return (
        <div className="flex items-center justify-center mx-4">
            {
                <button
                    type="button"
                    aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                    className="cursor-pointer"
                >
                    {resolvedTheme === "dark" ? (
                        <BiSun size={25} aria-hidden="true" />
                    ) : (
                        <BiMoon size={25} aria-hidden="true" />
                    )}
                </button>
            }
        </div>
    )
}

export default ThemeSwitcher;