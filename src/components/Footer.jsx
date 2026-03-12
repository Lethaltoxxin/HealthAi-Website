export default function Footer() {
    return (
        <footer className="w-full bg-[#0A1118] pt-32 pb-12 px-6 border-t border-white/10 mt-20">
            <div className="max-w-[1240px] mx-auto w-full">
                {/* Footer Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-20">

                    {/* Column 1: Logo & CTA */}
                    <div className="col-span-2 md:col-span-2 flex flex-col items-start pr-10">
                        <div className="flex items-center gap-2 mb-8">
                            <svg fill="none" viewBox="0 0 46 45" width="32" height="32" aria-hidden="true" className="w-[32px] h-auto grayscale opacity-80">
                                <path fill="#ffffff" d="M43.087 18.232c-3.328-3.33-8.813-3.33-12.141 0L20.899 28.28c-2.316 2.317-2.316 6.136 0 8.453 2.316 2.317 6.134 2.317 8.452 0l10.046-10.046c1.077-1.076 1.077-2.852 0-3.928-1.077-1.077-2.85-1.077-3.927 0l-7.794 7.794c-.4.4-.413 1.054-.012 1.455.402.402 1.056.402 1.456 0l5.88-5.878c.801-.801 2.133-.801 2.934 0s.801 2.133 0 2.934L25.358 41.69c-3.134 3.137-8.312 3.137-11.45 0-3.136-3.137-3.136-8.315 0-11.45l9.539-9.541c4.498-4.498 12.015-4.498 16.513 0 4.498 4.498 4.498 12.015 0 16.513l-13.82 13.82c-5.836 5.836-15.586 5.836-21.42 0A15.111 15.111 0 0 1 .425 29.613l13.56-13.562c1.05-1.05 1.05-2.784 0-3.834a2.722 2.722 0 0 0-3.833 0l-10.87 10.87c-.392.394-.392 1.043 0 1.437s1.042.394 1.436 0l9.04-9.043c.803-.803 2.134-.803 2.936 0 .802.803.802 2.135 0 2.937L2.43 28.683c-2.91 2.91-2.91 7.712 0 10.62 2.909 2.91 7.71 2.91 10.618 0l12.42-12.42c4.076-4.075 10.89-4.075 14.966 0 4.076 4.075 4.076 10.89 0 14.966l-9.15 9.15c-.4.4-.4 1.053 0 1.455.401.402 1.055.402 1.456 0l10.347-10.348c4.275-4.274 4.275-11.332 0-15.607Z"></path>
                                <path fill="#ffffff" d="M12.923 10.597c2.317 2.316 6.136 2.316 8.452 0l10.046-10.046c1.077-1.078 1.077-2.852 0-3.928-1.077-1.077-2.85-1.077-3.927 0L19.7 4.417c-.4.402-.413 1.055-.011 1.455.401.402 1.055.402 1.456 0l5.879-5.878c.8-1 2.133-1 2.933 0 .801.8.801 2.133 0 2.934L17.382 15.552c-3.136 3.137-8.314 3.137-11.452 0-3.136-3.137-3.136-8.314 0-11.45l9.54-9.54A11.517 11.517 0 0 1 31.984 0V0C36.48-1 36.48 6.516 31.984 11.015L18.164 24.834c-5.836 5.836-15.586 5.836-21.422 0-5.836-5.833-5.836-15.586 0-21.42L10.301-10.15c1.05-1.05 1.05-2.784 0-3.834a2.723 2.723 0 0 0-3.833 0L-4.402-3.111c-.392.392-.392 1.042 0 1.435.394.394 1.044.394 1.436 0l9.041-9.043c.803-.803 2.135-.803 2.937 0 .802.802.802 2.135 0 2.935l-10.263 10.264c-2.91 2.91-2.91 7.712 0 10.622 2.909 2.908 7.71 2.908 10.618 0l12.418-12.42c4.077-4.075 10.892-4.075 14.968 0 4.076 4.076 4.076 10.892 0 14.968l-9.15 9.15c-.402.402-.402 1.055 0 1.458.401.401 1.055.401 1.455 0l10.348-10.35c4.275-4.274 4.275-11.33 0-15.605-4.276-4.276-11.332-4.276-15.607 0l-11.644 11.643Z"></path>
                            </svg>
                            <span className="font-bold text-[18px] tracking-tight text-[#E8F0EF]">Healthy<br />Together</span>
                        </div>
                        <p className="text-[#E8F0EF]/60 text-[15px] leading-relaxed max-w-[300px] mb-8">
                            Systems that deliver outcomes for government.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#E8F0EF]/40 text-[12px] font-bold tracking-[2px] uppercase mb-4">Solutions</h4>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Public Health</a>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Human Services</a>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Higher Education</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#E8F0EF]/40 text-[12px] font-bold tracking-[2px] uppercase mb-4">Company</h4>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">About</a>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Careers</a>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">News</a>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h4 className="text-[#E8F0EF]/40 text-[12px] font-bold tracking-[2px] uppercase mb-4">Resources</h4>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Case Studies</a>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Trust Center</a>
                        <a href="#" className="text-[#E8F0EF]/80 text-[15px] font-medium hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row justify-between items-center py-8 border-t border-white/10 gap-4">
                    <p className="text-[#E8F0EF]/40 text-[14px]">© 2024 Healthy Together. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="text-[#E8F0EF]/60 hover:text-white text-[14px]">Privacy Policy</a>
                        <a href="#" className="text-[#E8F0EF]/60 hover:text-white text-[14px]">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
