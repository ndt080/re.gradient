export interface IconProps {
  className?: string;
  width?: string;
  height?: string;
  viewBox?: string;
  children?: string;
}

export function Icon({
  width = '48',
  height = '48',
  viewBox = '0 0 48 48',
  className = '',
  children,
}: IconProps) {
  return `
    <svg
      width='${width}'
      height='${height}'
      class='${className}'
      viewBox='${viewBox}'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      ${children}
    </svg>
  `;
}
