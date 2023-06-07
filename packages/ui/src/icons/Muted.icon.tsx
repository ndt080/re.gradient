import { Icon, IconProps } from './Icon';

export function MutedIcon(props: IconProps) {
  return Icon({
    ...props,
    viewBox: '0 0 18 18',
    children: (
      <path
        d="M3.715.295 17.7 14.285a1 1 0 0 1-1.32 1.498l-.094-.083L13 12.41V17a1 1 0 0 1-.883.993L12 18c-.642 0-1.258-.25-1.72-.695L4.79 12H2a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.765l.93-.896L2.301 1.71A1 1 0 0 1 3.715.295zM12 0a1 1 0 0 1 1 1v5.76L8.574 2.334l1.705-1.64c.416-.401.958-.642 1.53-.687L12 0z"
        fill="#fff"
      />
    ),
  });
}
