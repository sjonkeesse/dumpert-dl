// TypeScript interfaces for Dumpert API response

export interface MediaVariant {
  version: string;
  uri: string;
  uri_type: string;
}

export interface Media {
  mediatype: string;
  description: string;
  duration: number;
  variants: MediaVariant[];
}

export interface StillImages {
  thumb: string;
  "thumb-medium": string;
  still: string;
  "still-medium": string;
  "still-large": string;
}

export interface Stats {
  kudos_today: number;
  kudos_total: number;
  views_today: number;
  views_total: number;
  id: number;
}

export interface Uploader {
  name: string;
  email: string;
  ip_address: string;
}

export interface DumpertItem {
  id_int: number;
  id: string;
  composite_id: string;
  published_at: string;
  upload_id: string;
  title: string;
  description: string;
  thumbnail: string;
  tags: string;
  nsfw: boolean;
  nopreroll: boolean;
  secret: boolean;
  partner_content: boolean;
  media_type: "VIDEO" | "IMAGE" | "AUDIO"; // Assuming these are the possible values
  media: Media[];
  resolutions: string[][];
  still: string;
  stillist: StillImages[];
  stills: StillImages;
  stats: Stats;
  scripts: string;
  uploader: Uploader;
  created_at: string;
  date: string;
}

// Type for the API response that contains multiple items
export interface DumpertApiResponse {
  items: DumpertItem[];
  gentime: number;
  success: boolean;
}
