"use client";

export default function Navbar() {
    return (
        <div className="fixed top-0 left-0 w-full z-50 bg-[var(--navbar-blur)] backdrop-blur-[24px] px-[40px] h-[80px] flex justify-between items-center transition-all duration-300">
            <div className="flex items-center gap-2">
                {/* Exact HealthTogether Logo SVG */}
                <svg fill="none" viewBox="0 0 46 45" width="46" height="45" aria-hidden="true" className="w-[40px] h-auto">
                    {/* We'll use the gradient fills to match the exact heart logo from the benchmark */}
                    <defs>
                        <linearGradient id="logo-gradient-1" x1="20.899" y1="28.28" x2="43.087" y2="18.232" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#00D4AA" />
                            <stop offset="1" stopColor="#00B896" />
                        </linearGradient>
                        <linearGradient id="logo-gradient-2" x1="12.923" y1="10.597" x2="-4.402" y2="-3.111" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#33EACC" />
                            <stop offset="1" stopColor="#00D4AA" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#logo-gradient-1)" d="M43.087 18.232c-3.328-3.33-8.813-3.33-12.141 0L20.899 28.28c-2.316 2.317-2.316 6.136 0 8.453 2.316 2.317 6.134 2.317 8.452 0l10.046-10.046c1.077-1.076 1.077-2.852 0-3.928-1.077-1.077-2.85-1.077-3.927 0l-7.794 7.794c-.4.4-.413 1.054-.012 1.455.402.402 1.056.402 1.456 0l5.88-5.878c.801-.801 2.133-.801 2.934 0s.801 2.133 0 2.934L25.358 41.69c-3.134 3.137-8.312 3.137-11.45 0-3.136-3.137-3.136-8.315 0-11.45l9.539-9.541c4.498-4.498 12.015-4.498 16.513 0 4.498 4.498 4.498 12.015 0 16.513l-13.82 13.82c-5.836 5.836-15.586 5.836-21.42 0A15.111 15.111 0 0 1 .425 29.613l13.56-13.562c1.05-1.05 1.05-2.784 0-3.834a2.722 2.722 0 0 0-3.833 0l-10.87 10.87c-.392.394-.392 1.043 0 1.437s1.042.394 1.436 0l9.04-9.043c.803-.803 2.134-.803 2.936 0 .802.803.802 2.135 0 2.937L2.43 28.683c-2.91 2.91-2.91 7.712 0 10.62 2.909 2.91 7.71 2.91 10.618 0l12.42-12.42c4.076-4.075 10.89-4.075 14.966 0 4.076 4.075 4.076 10.89 0 14.966l-9.15 9.15c-.4.4-.4 1.053 0 1.455.401.402 1.055.402 1.456 0l10.347-10.348c4.275-4.274 4.275-11.332 0-15.607Z"></path>
                    <path fill="url(#logo-gradient-2)" d="M12.923 10.597c2.317 2.316 6.136 2.316 8.452 0l10.046-10.046c1.077-1.078 1.077-2.852 0-3.928-1.077-1.077-2.85-1.077-3.927 0L19.7 4.417c-.4.402-.413 1.055-.011 1.455.401.402 1.055.402 1.456 0l5.879-5.878c.8-1 2.133-1 2.933 0 .801.8.801 2.133 0 2.934L17.382 15.552c-3.136 3.137-8.314 3.137-11.452 0-3.136-3.137-3.136-8.314 0-11.45l9.54-9.54A11.517 11.517 0 0 1 31.984 0V0C36.48-1 36.48 6.516 31.984 11.015L18.164 24.834c-5.836 5.836-15.586 5.836-21.422 0-5.836-5.833-5.836-15.586 0-21.42L10.301-10.15c1.05-1.05 1.05-2.784 0-3.834a2.723 2.723 0 0 0-3.833 0L-4.402-3.111c-.392.392-.392 1.042 0 1.435.394.394 1.044.394 1.436 0l9.041-9.043c.803-.803 2.135-.803 2.937 0 .802.802.802 2.135 0 2.935l-10.263 10.264c-2.91 2.91-2.91 7.712 0 10.622 2.909 2.908 7.71 2.908 10.618 0l12.418-12.42c4.077-4.075 10.892-4.075 14.968 0 4.076 4.076 4.076 10.892 0 14.968l-9.15 9.15c-.402.402-.402 1.055 0 1.458.401.401 1.055.401 1.455 0l10.348-10.35c4.275-4.274 4.275-11.33 0-15.605-4.276-4.276-11.332-4.276-15.607 0l-11.644 11.643Z"></path>
                </svg>
                <span className="font-bold text-[18px] tracking-tight text-white/90 ml-1">Healthy<br />Together</span>
            </div>

            <nav className="hidden md:flex items-center gap-10">
                <a href="#" className="font-semibold text-[15px] tracking-tight text-white hover:opacity-80 transition-opacity">Solutions</a>
                <a href="#" className="font-semibold text-[15px] tracking-tight text-white hover:opacity-80 transition-opacity">Company</a>
                <a href="#" className="font-semibold text-[15px] tracking-tight text-white hover:opacity-80 transition-opacity">Resources</a>
            </nav>

            <button
                className="bg-[var(--button-accent)] text-[#0A1118] font-semibold py-[12px] px-[24px] rounded-[1600px] text-[15px] hover:scale-[1.03] transition-transform duration-500 shadow-md"
                style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
            >
                Need Help?
            </button>
        </div>
    );
}
