export type TypographyType =
  | (typeof SUPPORTED_GOOGLE_FONTS)[number]
  | (typeof NOT_GOOGLE_FONTS)[number];

export const SUPPORTED_GOOGLE_FONTS = ['Philosopher', 'Josefin Sans', 'Lato', 'Inter'];
export const SUPPORTED_CUSTOM_FONTS = ['OpenDyslexic']; // need to add to ./extra-fonts.css

export const DEFAULT_MONOSPACE_FONT = 'Courier';
export const DEFAULT_BODY_FONT = 'Inter';
export const DEFAULT_HEADER_FONT = 'Inter'; // Changed from Roboto to Inter
export const NOT_GOOGLE_FONTS = [...SUPPORTED_CUSTOM_FONTS];
