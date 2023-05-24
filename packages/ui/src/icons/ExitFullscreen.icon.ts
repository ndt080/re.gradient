import { Icon, IconProps } from './Icon';

export function ExitFullscreenIcon(props: IconProps) {
  return Icon({
    ...props,
    viewBox: '0 0 14 15',
    children: `
      <path
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M13.7197 0.21967C14.0126 -0.0732233 14.4874 -0.0732233 14.7803 0.21967C15.0732 0.512563 15.0732 0.987437 14.7803 1.28033L11.5607 4.5L13.5 4.5C13.9142 4.5 14.25 4.83579 14.25 5.25C14.25 5.66421 13.9142 6 13.5 6L9.74994 6C9.33572 6 8.99994 5.66421 8.99994 5.25V1.5C8.99994 1.08579 9.33572 0.75 9.74994 0.75C10.1642 0.75 10.4999 1.08579 10.4999 1.5V3.4394L13.7197 0.21967ZM1.75 8.75C1.75 8.33579 2.08578 8 2.5 8L6.25006 8C6.66427 8 7.00006 8.33579 7.00006 8.75L7.00006 12.5C7.00006 12.9142 6.66427 13.25 6.25006 13.25C5.83584 13.25 5.50006 12.9142 5.50006 12.5V10.5573L2.2773 13.7803C1.98442 14.0732 1.50954 14.0732 1.21664 13.7804C0.923734 13.4875 0.923716 13.0126 1.2166 12.7197L4.43603 9.5L2.5 9.5C2.08578 9.5 1.75 9.16422 1.75 8.75Z'
        fill='white'
      />
  `,
  });
}