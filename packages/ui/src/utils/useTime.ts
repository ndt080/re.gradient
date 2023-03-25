export interface Hms {
  h: number;
  m: number;
  s: number;
}

export function useTime() {
  const toHMS = (value: number): Hms => ({
    h: Math.floor(value / 3600),
    m: Math.floor((value % 3600) / 60),
    s: Math.floor((value % 3600) % 60),
  });

  const toHMSStrings = (value: number) => {
    const { h, m, s } = toHMS(value);
    return {
      h: h < 10 ? `0${h}` : `${h}`,
      m: m < 10 ? `0${m}` : `${m}`,
      s: s < 10 ? `0${s}` : `${s}`,
    };
  };

  return { toHMS, toHMSStrings };
}
