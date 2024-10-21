import { cn } from './utils'

interface LineSvgProps {
  className: string
  strokeColor?: string
  strokeWidth?: number
}

const LineSvg = ({ className, strokeColor = '#8967B3', strokeWidth = 15 }: LineSvgProps) => {
  return (
    <svg
      className={cn('absolute', className)}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      viewBox="0 0 800 400"
    >
      <path
        d="M139.60572814941406,184.9462432861328C155.6854761505127,177.9838765716553,195.5241800689697,147.64336975097658,226.52328491210938,147.31182861328125C257.52238975524904,146.98028747558592,274.51164932250975,182.65681732177734,307.16845703125,183.1541290283203C339.82526473999025,183.6514407348633,373.8709440612793,149.33691772460938,403.04656982421875,150C432.2221955871582,150.66308227539062,432.7150405883789,184.41756958007812,464.8745422363281,186.7383575439453C497.03404388427737,189.0591455078125,544.7222178649903,163.04211151123047,576.8817138671875,162.5447998046875C609.0412098693847,162.04748809814453,627.2714865112305,180.07168968200685,638.7096557617188,184.05018615722656"
        fill="none"
        strokeWidth={strokeWidth}
        stroke={strokeColor}
        strokeLinecap="butt"
        transform="matrix(1,0,0.35265396141692995,1,-58.927483606802184,0)"
      ></path>
      <defs>
        <linearGradient id="SvgjsLinearGradient1001">
          <stop stopColor="hsl(37, 99%, 67%)" offset="0"></stop>
          <stop stopColor="hsl(316, 73%, 52%)" offset="1"></stop>
        </linearGradient>
      </defs>
    </svg>
  )
}

export default LineSvg
