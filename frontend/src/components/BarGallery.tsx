import { useState } from 'react'
import backImg from '../assets/bars/back.png'
import front1g from '../assets/bars/front-1g.png'
import front2g from '../assets/bars/front-2g.png'
import front5g from '../assets/bars/front-5g.png'
import front20g from '../assets/bars/front-20g.png'

const bars = [
  {
    weight: 1,
    front: front1g,
    desc: 'سبيكة بوزن غرام واحد — قطعة صغيرة مناسبة للإهداء والاستثمار المبتدئ.',
  },
  {
    weight: 2,
    front: front2g,
    desc: 'سبيكة بوزن غرامين — حجم عملي يوازن بين القيمة وسهولة الاحتفاظ.',
  },
  {
    weight: 5,
    front: front5g,
    desc: 'سبيكة بوزن خمسة غرامات — وزن أوضح مع النقاء نفسه 995.',
  },
  {
    weight: 20,
    front: front20g,
    desc: 'سبيكة بوزن عشرين غراماً — خيار استثماري بوزن أكبر وحضور أوضح.',
  },
]

function BarCard({
  weight,
  front,
  desc,
}: {
  weight: number
  front: string
  desc: string
}) {
  const [flipped, setFlipped] = useState(false)

  return (
    <article>
      <p className="text-[11px] font-bold tracking-[0.28em] text-gold-400 mb-2">GROSS WEIGHT</p>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
        {weight} <span className="text-lg font-semibold text-gold-300">غرام</span>
      </h3>
      <p className="text-sm text-white/50 leading-relaxed mb-6 min-h-[3rem]">{desc}</p>

      <button
        type="button"
        dir="ltr"
        className={`bar-flip ${flipped ? 'is-flipped' : ''}`}
        onClick={() => setFlipped((v) => !v)}
        aria-label={`قلب بطاقة سبيكة ${weight} غرام لعرض الوجه والظهر`}
      >
        <span className="bar-flip-inner">
          <span className="bar-flip-face bar-flip-front">
            <img src={front} alt={`سبيكة ${weight} غرام — الوجه`} />
            <span className="bar-flip-badge">الوجه</span>
          </span>
          <span className="bar-flip-face bar-flip-back">
            <img src={backImg} alt={`سبيكة ${weight} غرام — الظهر`} />
            <span className="bar-flip-badge">الظهر</span>
          </span>
        </span>
      </button>

      <p className="mt-4 text-center text-xs text-white/35">
        مرّر أو اضغط لقلب البطاقة — الوجه يختلف حسب الوزن، والظهر موحّد
      </p>
    </article>
  )
}

export default function BarGallery() {
  return (
    <div className="grid sm:grid-cols-2 gap-10 lg:gap-14">
      {bars.map((bar, i) => (
        <div key={bar.weight} className="bar-card-enter" style={{ animationDelay: `${i * 120}ms` }}>
          <BarCard {...bar} />
        </div>
      ))}
    </div>
  )
}
