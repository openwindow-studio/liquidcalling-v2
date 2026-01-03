'use client'

export function Footer() {
  const asciiLogo = String.raw` ___       ___  ________  ___  ___  ___  ________
|\  \     |\  \|\   __  \|\  \|\  \|\  \|\   ___ \
\ \  \    \ \  \ \  \|\  \ \  \\\  \ \  \ \  \_|\ \
 \ \  \    \ \  \ \  \\\  \ \  \\\  \ \  \ \  \ \\ \
  \ \  \____\ \  \ \  \\\  \ \  \\\  \ \  \ \  \_\\ \
   \ \_______\ \__\ \_____  \ \_______\ \__\ \_______\
    \|_______|\|__|\|___| \__\|_______|\|__|\|_______|
                         \|__|


 ________  ________  ___       ___       ___  ________   ________
|\   ____\|\   __  \|\  \     |\  \     |\  \|\   ___  \|\   ____\
\ \  \___|\ \  \|\  \ \  \    \ \  \    \ \  \ \  \\ \  \ \  \___|
 \ \  \    \ \   __  \ \  \    \ \  \    \ \  \ \  \\ \  \ \  \  ___
  \ \  \____\ \  \ \  \ \  \____\ \  \____\ \  \ \  \\ \  \ \  \|\  \
   \ \_______\ \__\ \__\ \_______\ \_______\ \__\ \__\\ \__\ \_______\
    \|_______|\|__|\|__|\|_______|\|_______|\|__|\|__| \|__|\|_______|`

  return (
    <div style={{ padding: '0', margin: '0' }}>
      <div className="relative overflow-visible max-w-screen-2xl mx-auto rounded-[36px] border border-white/20 shadow-[0_0_25px_rgba(0,0,0,0.15)] px-[clamp(12px,6vw,135px)] py-[clamp(12px,6vw,30px)] flex flex-col items-stretch gap-[clamp(20px,6vw,30px)]" style={{ fontFamily: 'Britti Sans, sans-serif', backgroundColor: 'rgba(36, 36, 161, 0.8)', margin: '20px' }}>

      <div className="w-full relative z-10 flex flex-col gap-y-8 md:grid md:grid-cols-[1fr_auto]">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <pre style={{
              fontFamily: 'Consolas, Monaco, "Courier New", Courier, monospace',
              fontSize: 'clamp(4px, 1.5vw, 10px)',
              lineHeight: '0.9',
              color: 'rgba(255, 255, 255, 0.9)',
              whiteSpace: 'pre',
              margin: 0,
              letterSpacing: '0px'
            }}>
              {asciiLogo}
            </pre>
          </div>
          <div className="text-xs text-white/60">Liquid Calling © 2026</div>
        </div>

        <div className="grid grid-cols-[max-content_max-content] gap-x-6 md:gap-x-10 gap-y-6 md:col-start-2 md:justify-self-end">
          <div className="flex flex-col gap-6 w-[160px]">
            <div>
              <div className="text-sm font-medium text-white mb-3">Help</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://t.me/braunschweiler" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                    <span>Telegram Support</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-medium text-white mb-3">Socials</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://x.com/callonliquid" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-white/80 hover:text-white">
                    <span>X (Twitter)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-white mb-3">Company</div>
            <ul className="space-y-2 text-sm">
              <li><a className="text-white/80 hover:text-white" href="/company/how-it-works">How it Works</a></li>
              <li><a className="text-white/80 hover:text-white" href="/terms">Terms of Service</a></li>
              <li><a className="text-white/80 hover:text-white" href="/privacy">Privacy Policy</a></li>
              <li><a className="text-white/80 hover:text-white" href="/pricing">Pricing</a></li>
              <li><a className="text-white/80 hover:text-white" href="/sdk">Developer SDK</a></li>
            </ul>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}