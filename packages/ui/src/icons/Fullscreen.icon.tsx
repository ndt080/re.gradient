import { Icon, IconProps } from './Icon';

export function FullscreenIcon(props: IconProps) {
  return Icon({
    ...props,
    viewBox: '0 0 14 14',
    children: (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.75.75A.75.75 0 0 1 9.5 0h3.75a.75.75 0 0 1 .75.75V4.5a.75.75 0 0 1-1.5 0V2.56L9.276 5.785a.75.75 0 1 1-1.06-1.061L11.439 1.5H9.5a.75.75 0 0 1-.75-.75zM5.783 8.216a.75.75 0 0 1 0 1.06L2.561 12.5H4.5a.75.75 0 0 1 0 1.5H.75a.75.75 0 0 1-.75-.75V9.5a.75.75 0 0 1 1.5 0v1.94l3.223-3.224a.75.75 0 0 1 1.06 0z"
        fill="#fff"
      />
    ),
  });
}
