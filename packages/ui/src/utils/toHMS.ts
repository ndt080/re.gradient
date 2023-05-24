/**
 * Interface for specifying timestamp in hh:mm:ss format
 */
export interface Hms<T = number> {
  /** Number of hours */
  h: T;
  /** Number of minutes */
  m: T;
  /** Number of seconds */
  s: T;
}

/**
 * toHMS utility
 * @description Converts seconds to an HMS type object that returns the number of hours, minutes, and seconds.
 * @author Andrei Petrov
 *
 * @param {number} value - number of milliseconds
 * @return {Hms<number>}
 */
export const toHMS = (value: number): Hms<number> => ({
  h: Math.floor(value / 3600),
  m: Math.floor((value % 3600) / 60),
  s: Math.floor((value % 3600) % 60),
});

/**
 * toHMSStrings utility
 * @description Converts seconds to an HMS type object that returns the number of hours, minutes, and seconds in formatted string
 * @author Andrei Petrov
 *
 * @param {number} value - number of milliseconds
 * @return {Hms<string>}
 */
export const toHMSStrings = (value: number): Hms<string> => {
  const { h, m, s } = toHMS(value);
  return {
    h: h < 10 ? `0${h}` : `${h}`,
    m: m < 10 ? `0${m}` : `${m}`,
    s: s < 10 ? `0${s}` : `${s}`,
  };
};
