export type UserRole = 'buyer' | 'creator';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  balance: number; // in VND
  isVerified?: boolean;
}

export type Category = 
  | 'Tất cả'
  | 'Sticker & Decal'
  | 'Áo thun & Apparel'
  | 'Logo & Brand Identity'
  | 'Washi Tape & Stationery'
  | 'Phone Case & Phụ kiện'
  | 'Poster & Decor';

export type ArtStyle = 
  | 'Tất cả'
  | 'Anime & Chibi'
  | 'Indie & Y2K'
  | 'Tối giản (Minimalist)'
  | 'Doodle & Nét cọ tay'
  | 'Retro & Vintage'
  | 'Cyberpunk & Neon';

export type PriceRange = 'all' | 'under50k' | '50k-150k' | 'above150k';

export type LicenseType = 'personal' | 'commercial';

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistAvatar: string;
  artistRating: number;
  imageUrl: string;
  category: Exclude<Category, 'Tất cả'>;
  style: Exclude<ArtStyle, 'Tất cả'>;
  personalPrice: number;
  commercialPrice: number;
  isSoldOut?: boolean;
  editionTotal?: number;
  editionRemaining?: number;
  likes: number;
  createdAt: string;
  description: string;
  inspiration: string;
  dimensions: string;
  resolution: string;
  deliverables: string[]; // e.g. ['.PNG 300 DPI', '.PSD Layered', '.AI Vector']
  colorProfile: string;
  hasWatermark: boolean;
  views: number;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  tags?: string[];
  mockupImages?: {
    canvas?: string;
    tshirt?: string;
    phonecase?: string;
    totebag?: string;
  };
}

export interface MockupProduct {
  id: 'canvas' | 'tshirt' | 'phonecase' | 'totebag';
  name: string;
  label: string;
  iconName: string;
}

export interface OwnedArtwork {
  orderId: string;
  artworkId: string;
  artworkTitle: string;
  artistName: string;
  imageUrl: string;
  licenseType: LicenseType;
  pricePaid: number;
  purchaseDate: string;
  certificateHash: string;
  deliverables: string[];
}

export type CommissionStep = 
  | 'deposit_escrow'
  | 'sketch_concept'
  | 'color_refinement'
  | 'final_approval'
  | 'completed';

export interface CommissionOrder {
  id: string;
  title: string;
  buyerName: string;
  artistName: string;
  artistAvatar: string;
  budget: number;
  licenseType: LicenseType;
  currentStep: CommissionStep;
  createdAt: string;
  deadline: string;
  brief: string;
  sketches: string[];
  finalArtworkUrl?: string;
  escrowStatus: 'locked' | 'partially_released' | 'fully_released';
}

export interface CommissionPackage {
  id: string;
  name: string;
  tagline: string;
  price: number;
  estimatedDays: number;
  features: string[];
  revisions: number;
}

export interface ArtistProfile {
  id: string;
  name: string;
  pseudonym: string;
  avatar: string;
  coverImage: string;
  bio: string;
  location: string;
  rating: number;
  reviewCount: number;
  responseRate: string;
  completedOrders: number;
  isAcceptingCommissions: boolean;
  slotsRemaining: number;
  packages: CommissionPackage[];
}
