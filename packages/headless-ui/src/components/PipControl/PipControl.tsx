import type { ComponentType } from 'solid-element';
import { createSignal, onCleanup, onMount, Show } from 'solid-js';

export interface PipControlProps {
  tooltipEnterText: string;
  tooltipLeaveText: string;
}

const PipControl: ComponentType<PipControlProps> = (props, { element, player }) => {
  const isDisabled = (player.$mediaEl as HTMLVideoElement).disablePictureInPicture ?? false;
  const isSupported = document.pictureInPictureEnabled || isDisabled;

  const [isEntered, setIsEntered] = createSignal<boolean>(false);

  onMount(() => {
    player.on<HTMLVideoElementEventMap>('enterpictureinpicture', onEnterPip);
    player.on<HTMLVideoElementEventMap>('leavepictureinpicture', onLeavePip);
    element.addEventListener('click', onControlClick);
  });

  onCleanup(() => {
    player.off<HTMLVideoElementEventMap>('enterpictureinpicture', onEnterPip);
    player.off<HTMLVideoElementEventMap>('leavepictureinpicture', onLeavePip);
    element.removeEventListener('click', onControlClick);
  });

  const onEnterPip = () => setIsEntered(true);
  const onLeavePip = () => setIsEntered(false);

  const onControlClick = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await (player.$mediaEl as HTMLVideoElement).requestPictureInPicture();
      }
    } catch (err) {
      console.error('Picture-in-picture unsupported');
    }
  };

  return (
    <>
      <re-tooltip
        text={isEntered() ? props.tooltipLeaveText : props.tooltipEnterText}
        target={element}
      />

      <Show when={isSupported}>
        <Show
          when={isEntered()}
          fallback={
            <slot name="enter-icon">
              <svg
                stroke="currentColor"
                stroke-width="1.4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 9V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h4" fill="none" />
                <rect fill="none" height="7" rx="2" width="10" x="12" y="13" />
              </svg>
            </slot>
          }
          children={
            <slot name="leave-icon">
              <svg
                viewBox="0 0 15 15"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: 'scale(-1, 1)' }}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M12 13C12.5523 13 13 12.5523 13 12V3C13 2.44771 12.5523 2 12 2H3C2.44771 2 2 2.44771 2 3V6.5C2 6.77614 2.22386 7 2.5 7C2.77614 7 3 6.77614 3 6.5V3H12V12H8.5C8.22386 12 8 12.2239 8 12.5C8 12.7761 8.22386 13 8.5 13H12ZM9 6.5C9 6.5001 9 6.50021 9 6.50031V6.50035V9.5C9 9.77614 8.77614 10 8.5 10C8.22386 10 8 9.77614 8 9.5V7.70711L2.85355 12.8536C2.65829 13.0488 2.34171 13.0488 2.14645 12.8536C1.95118 12.6583 1.95118 12.3417 2.14645 12.1464L7.29289 7H5.5C5.22386 7 5 6.77614 5 6.5C5 6.22386 5.22386 6 5.5 6H8.5C8.56779 6 8.63244 6.01349 8.69139 6.03794C8.74949 6.06198 8.80398 6.09744 8.85143 6.14433C8.94251 6.23434 8.9992 6.35909 8.99999 6.49708L8.99999 6.49738"
                  fill="currentColor"
                />
              </svg>
            </slot>
          }
        />
      </Show>
    </>
  );
};

export default PipControl;
