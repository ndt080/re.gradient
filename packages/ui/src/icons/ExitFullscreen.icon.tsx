import { Icon, IconProps } from './Icon';

export function ExitFullscreenIcon(props: IconProps) {
  return Icon({
    ...props,
    viewBox: '0 0 14 15',
    children: (
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.72.22a.75.75 0 1 1 1.06 1.06L11.56 4.5h1.94a.75.75 0 0 1 0 1.5H9.75A.75.75 0 0 1 9 5.25V1.5a.75.75 0 1 1 1.5 0v1.94L13.72.22zM1.75 8.75A.75.75 0 0 1 2.5 8h3.75a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0v-1.943L2.277 13.78a.75.75 0 0 1-1.06-1.06L4.436 9.5H2.5a.75.75 0 0 1-.75-.75z"
        fill="#fff"
      />
    ),
  });
}
