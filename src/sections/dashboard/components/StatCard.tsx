interface StatCardProps {
  label: string
  value: number
  accent?: 'sky' | 'violet' | 'amber' | 'emerald' | 'slate'
}

const accentStyles = {
  sky: 'text-sky-600 dark:text-sky-400',
  violet: 'text-violet-600 dark:text-violet-400',
  amber: 'text-amber-600 dark:text-amber-400',
  emerald: 'text-emerald-600 dark:text-emerald-400',
  slate: 'text-slate-500 dark:text-slate-400',
}

const dotStyles = {
  sky: 'bg-sky-500',
  violet: 'bg-violet-500',
  amber: 'bg-amber-500',
  emerald: 'bg-emerald-500',
  slate: 'bg-slate-400 dark:bg-slate-500',
}

export function StatCard({ label, value, accent = 'slate' }: StatCardProps) {
  return (
    <div className="group relative py-4 px-1">
      <div className="flex items-baseline gap-2">
        <span
          className={`text-3xl sm:text-4xl font-light tracking-tight tabular-nums ${accentStyles[accent]}`}
          style={{ fontFamily: "'Fira Code', monospace" }}
        >
          {value}
        </span>
        <span className={`w-1.5 h-1.5 rounded-full ${dotStyles[accent]} shrink-0 translate-y-[-2px]`} />
      </div>
      <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-slate-500">
        {label}
      </p>
    </div>
  )
}
