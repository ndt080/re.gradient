import Icon, { IconProps } from './Icon';

function PlayIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.306 0.00565815C12.6494 -0.0610802 13.9211 0.470631 15.1762 1.17438C16.4324 1.87865 17.9584 2.92779 19.853 4.23034L19.93 4.28328L37.1854 16.1463L37.2573 16.1958C38.7492 17.2215 39.9703 18.061 40.8785 18.8144C41.8057 19.5838 42.6005 20.4155 43.0401 21.4933C43.6959 23.1002 43.6959 24.8999 43.0401 26.5066C42.6005 27.5844 41.8057 28.4161 40.8785 29.1855C39.9703 29.9391 38.7492 30.7785 37.2573 31.8042L37.1854 31.8536L19.93 43.7167L19.853 43.7695L19.8528 43.7698C17.9583 45.0722 16.4324 46.1213 15.1762 46.8256C13.9211 47.5294 12.6494 48.061 11.306 47.9944C9.35505 47.8974 7.5459 46.9458 6.36078 45.3929C5.54474 44.3238 5.26242 42.9745 5.13123 41.5415C4.99995 40.1076 4.99998 38.2558 5 35.9568V35.9566V35.863V12.1369V12.0432V12.043C4.99998 9.74407 4.99995 7.89234 5.13123 6.45833C5.26242 5.02534 5.54474 3.67617 6.36078 2.60701C7.5459 1.05424 9.35505 0.102581 11.306 0.00565815Z"
        fill="white"
      />
    </Icon>
  );
}

export default PlayIcon;
