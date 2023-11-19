export interface Track {
  /** A user-readable title of the text track which is used by the browser when listing available text tracks. */
  label: string;
  /**
   * How the text track is meant to be used. If omitted the default kind is subtitles. The following keywords are allowed:
   *  - subtitles. Subtitles provide translation of content that cannot be understood by the viewer.
   *  - captions. Closed captions provide a transcription and possibly a translation of audio.
   *  - descriptions. Textual description of the video content.
   *  - chapters. Chapter titles are intended to be used when the user is navigating the media resource.
   *  - metadata. Tracks used by scripts. Not visible to the user.
   */
  kind: 'subtitles' | 'captions' | 'descriptions' | 'chapters' | 'metadata';
  /** Language of the track text data. It must be a valid BCP 47 language tag. If the kind attribute is set to subtitles, then srclang must be defined. */
  srclang: string;
  /** Address of the track (.vtt file). Must be a valid URL. This attribute must be specified and its URL value must have the same origin as the document — unless the <audio> or <video> parent element of the track element has a crossorigin attribute. */
  src: string;
  /** This property indicates that the track should be enabled unless the user's preferences indicate that another track is more appropriate. This may only be used on one track element per media element. */
  default?: boolean;
}
