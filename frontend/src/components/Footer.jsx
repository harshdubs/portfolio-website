export default function Footer() {
  return (
    <footer className="w-full py-8 px-6 border-t border-white/[0.06]">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-text-secondary text-xs">
          Designed &amp; built by <span className="text-text-primary">Harsh Dubey</span>
        </p>
        <p className="font-mono text-text-secondary/40 text-[10px] tracking-wider">2025</p>
      </div>
    </footer>
  )
}
