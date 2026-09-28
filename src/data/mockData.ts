import { Artwork, ArtistProfile, OwnedArtwork, CommissionOrder } from '../types';

import heroExhibitionImg from '../assets/images/hero_exhibition_art_1790610934612.jpg';
import artworkSolitudeImg from '../assets/images/artwork_solitude_oil_1790610949704.jpg';
import artworkZenithImg from '../assets/images/artwork_zenith_digital_1790610961800.jpg';
import artworkTerracottaImg from '../assets/images/artwork_terracotta_ceramic_1790610974018.jpg';
import artistAvatarLinhImg from '../assets/images/artist_avatar_linh_1790610985180.jpg';

export { 
  heroExhibitionImg, 
  artworkSolitudeImg, 
  artworkZenithImg, 
  artworkTerracottaImg, 
  artistAvatarLinhImg 
};

// 4 Active Young Artists & Indie Creators
export const MOCK_ARTISTS: ArtistProfile[] = [
  {
    id: 'artist-001',
    name: 'Hà My (Mèo Cam)',
    pseudonym: 'MeoCam Illustration',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1600&q=80',
    bio: 'Sinh viên năm 3 khoa Thiết kế Đồ họa ĐH Mỹ Thuật & Freelance Illustrator tự do. Đam mê vẽ sticker chibi mèo lười, washi tape pastel và văn phòng phẩm bullet journal mang lại niềm vui nhỏ mỗi ngày.',
    location: 'Hà Nội, Việt Nam',
    rating: 4.99,
    reviewCount: 214,
    responseRate: '100% (< 15 phút)',
    completedOrders: 128,
    isAcceptingCommissions: true,
    slotsRemaining: 4,
    packages: [
      {
        id: 'pkg-sticker-custom',
        name: 'Gói Vẽ Set 10 Sticker Chibi Theo Yêu Cầu',
        tagline: 'Phù hợp làm quà tặng, dán laptop, mũ bảo hiểm, in ấn kinh doanh nhỏ',
        price: 95000,
        estimatedDays: 2,
        revisions: 2,
        features: [
          '10 hình vẽ chibi độc quyền xuất file PNG 300 DPI trong suốt',
          'File vector cắt bế (die-cut line) chuẩn máy cắt decal',
          'Bản quyền sử dụng cá nhân hoặc in ấn số lượng nhỏ',
          'Chữ ký số chứng nhận bản quyền ARTFAIR'
        ]
      },
      {
        id: 'pkg-washi-tape',
        name: 'Gói Thiết Kế Cuộn Washi Tape Họa Tiết Lặp Liền Mạch',
        tagline: 'Mẫu pattern 30cm seamless dành cho các shop đồ dùng học tập, planner',
        price: 180000,
        estimatedDays: 3,
        revisions: 2,
        features: [
          'File vector .AI / .PSD chuẩn kích thước in băng keo giấy 15mm / 20mm',
          'Họa tiết lặp hoàn hảo không lộ vết nối (Seamless Pattern)',
          'Tặng kèm Mockup hiển thị thực tế sản phẩm',
          'Cấp quyền in ấn thương mại lên đến 2.000 cuộn'
        ]
      },
      {
        id: 'pkg-planner-suite',
        name: 'Trọn Bộ Stationery Planner & 3 Bookmark Mẫu',
        tagline: 'Gói quà tặng sổ tay và bộ kẹp sách nghệ thuật',
        price: 250000,
        estimatedDays: 4,
        revisions: 3,
        features: [
          'Bìa sổ tay A5 + 4 trang lót bullet journal + 3 bookmark',
          'File PDF & PNG 300 DPI sắc nét chuẩn in xưởng',
          'Toàn quyền thương mại in ấn bán lẻ cho shop'
        ]
      }
    ]
  },
  {
    id: 'artist-002',
    name: 'Vũ Long (Kev.Z)',
    pseudonym: 'StreetVibe POD Studio',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=80',
    bio: 'Gen Z Graphic Designer & Streetwear Merch Creator tại Sài Gòn. Chuyên hình in áo thun oversize phong cách Y2K, Cyberpunk và typography bụi bặm dành riêng cho các local brand và shop thời trang trẻ.',
    location: 'TP. Hồ Chí Minh',
    rating: 4.96,
    reviewCount: 165,
    responseRate: '99% (< 30 phút)',
    completedOrders: 98,
    isAcceptingCommissions: true,
    slotsRemaining: 2,
    packages: [
      {
        id: 'pkg-tee-single',
        name: 'Gói Thiết Kế Graphic Áo Thun Streetwear (1 Mặt)',
        tagline: 'Thiết kế artwork mặt trước hoặc mặt sau cho áo phông oversize',
        price: 250000,
        estimatedDays: 3,
        revisions: 2,
        features: [
          'File Vector .AI / .PNG tách nền 4000x5000px 300 DPI',
          'Mockup áo thun đen/trắng chân thực để đăng bài bán hàng',
          'Tách màu in lụa (Silk Screen) & In kỹ thuật số DTG',
          'Bản quyền in thương mại không giới hạn sản phẩm'
        ]
      },
      {
        id: 'pkg-tee-double',
        name: 'Gói Trọn Bộ Áo Thun / Hoodie (Mặt Trước Nhỏ + Sau Lớn)',
        tagline: 'Thiết kế full set trước ngực và artwork lưng áo ấn tượng',
        price: 450000,
        estimatedDays: 5,
        revisions: 3,
        features: [
          '2 Artwork đồng bộ nhận diện (Logo ngực + Bức tranh lưng áo)',
          'Đầy đủ file in sắc nét chuẩn xuất xưởng may mặc',
          'Cấp phép độc quyền thương mại vĩnh viễn (Exclusive Buyout)'
        ]
      }
    ]
  },
  {
    id: 'artist-003',
    name: 'Trúc An (An Nhiên)',
    pseudonym: 'An Nhiên Doodle & Decor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=80',
    bio: 'Freelance Illustrator & Họa sĩ minh họa màu nước, ốp điện thoại và poster lofi trang trí phòng trọ, góc học tập. Nét vẽ mang năng lượng chữa lành (healing), ấm cúng và dịu dàng.',
    location: 'Đà Nẵng, Việt Nam',
    rating: 4.97,
    reviewCount: 142,
    responseRate: '100% (< 1 giờ)',
    completedOrders: 86,
    isAcceptingCommissions: true,
    slotsRemaining: 3,
    packages: [
      {
        id: 'pkg-case-custom',
        name: 'Vẽ Minh Họa Ốp Lưng Điện Thoại Theo Ảnh Thật',
        tagline: 'Chân dung bạn bè, thú cưng hoặc cặp đôi phong cách doodle dễ thương',
        price: 120000,
        estimatedDays: 2,
        revisions: 2,
        features: [
          'File in ốp lưng chuẩn kích thước mọi dòng iPhone, Samsung',
          'File .PNG trong suốt in ốp trong hoặc ốp tráng gương',
          'Bản quyền cá nhân trọn đời'
        ]
      },
      {
        id: 'pkg-poster-lofi',
        name: 'Thiết Kế Poster A3 / A4 Lofi Decor Góc Làm Việc',
        tagline: 'Tranh treo tường góc học tập tạo cảm hứng học tập và thư giãn',
        price: 180000,
        estimatedDays: 3,
        revisions: 2,
        features: [
          'File in ấn độ nét cao 300 DPI khổ A3 / A4 / A5',
          'Tone màu pastel ấm cúng, thư giãn',
          'Giấy phép sử dụng cá nhân và in ấn quà lưu niệm'
        ]
      }
    ]
  },
  {
    id: 'artist-004',
    name: 'Minh Đăng (Lemon)',
    pseudonym: 'Lemon Branding & Logo',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80',
    bio: 'Chuyên gia thiết kế logo tối giản, mascot thương hiệu indie, tem nhãn ly trà sữa, quán cà phê và bao bì quà tặng handmade với mức giá hỗ trợ bạn trẻ khởi nghiệp và các shop nhỏ.',
    location: 'Sài Gòn',
    rating: 4.95,
    reviewCount: 178,
    responseRate: '98% (< 20 phút)',
    completedOrders: 110,
    isAcceptingCommissions: true,
    slotsRemaining: 5,
    packages: [
      {
        id: 'pkg-logo-indie',
        name: 'Gói Logo & Mascot Cho Quán Trà / Shop Online',
        tagline: 'Thiết kế logo nhận diện ấn tượng, dễ nhớ và gần gũi với giới trẻ',
        price: 280000,
        estimatedDays: 3,
        revisions: 3,
        features: [
          'Logo chính + Phiên bản rút gọn làm avatar mạng xã hội',
          'Đầy đủ file gốc Vector .AI, .SVG, .PNG không nền',
          'Bản quyền thương mại độc quyền trọn đời cho chủ shop'
        ]
      },
      {
        id: 'pkg-brand-sticker',
        name: 'Bộ Tem Nhãn Dán Ly & Băng Keo Niêm Phong Hàng',
        tagline: 'Combo tem dán ly đồ uống, hộp bánh và sticker niêm phong túi hàng',
        price: 450000,
        estimatedDays: 4,
        revisions: 3,
        features: [
          'Bộ 3 mẫu tem dán: Tem tròn, tem chữ nhật, tem niêm phong',
          'File vector xuất xưởng chuẩn kích thước in tem decal bế sẵn',
          'Toàn quyền thương mại'
        ]
      }
    ]
  }
];

export const ARTIST_LINH_DAN = MOCK_ARTISTS[0];

// Realistic Youth Artist POD & Daily Decor Catalog (Micro-transactions from 30.000 ₫ to 280.000 ₫)
export const INITIAL_ARTWORKS: Artwork[] = [
  // ==========================================
  // NHÓM 1: STICKER & DECAL (Giá: 30.000đ - 65.000đ)
  // ==========================================
  {
    id: 'art-stk-01',
    title: 'Set 12 Sticker Chibi Mèo Bánh Mì Lười',
    artistId: 'artist-001',
    artistName: 'Hà My (Mèo Cam)',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    category: 'Sticker & Decal',
    style: 'Anime & Chibi',
    personalPrice: 35000, // 35.000 VNĐ
    commercialPrice: 95000, // Cấp phép in POD bán lẻ
    isSoldOut: false,
    editionTotal: 100,
    editionRemaining: 84,
    likes: 480,
    createdAt: '2026-03-26',
    aspectRatio: 'square',
    tags: ['sticker', 'decal', 'mèo', 'chibi', 'dễ thương', 'dán laptop', 'bullet journal'],
    description: 'Bộ 12 hình dán mèo mập lười biến thành ổ bánh mì nướng bơ tỏi thơm lừng. Định dạng file PNG trong suốt độ nét 300 DPI, có đường bế viền cắt sẵn (die-cut) tiện lợi cho in decal bọc laptop, nón bảo hiểm hoặc sổ tay.',
    inspiration: 'Chú mèo mướp nằm cuộn tròn như ổ bánh mì baguette trong nắng sớm ban công.',
    dimensions: '3000 x 3000 px / Kích thước in A5',
    resolution: '300 DPI Siêu Nét',
    deliverables: ['12 File .PNG tách nền trong suốt', 'File .AI vector đường bế cắt sẵn (Die-cut)', 'Bản quyền in ấn thương mại cho shop POD'],
    colorProfile: 'CMYK chuẩn in ấn decal',
    hasWatermark: true,
    views: 3200,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-stk-02',
    title: 'Gói Sticker Hologram Cyberpunk Girl Y2K (Set 8 mẫu)',
    artistId: 'artist-002',
    artistName: 'Vũ Long (Kev.Z)',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.96,
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    category: 'Sticker & Decal',
    style: 'Indie & Y2K',
    personalPrice: 45000,
    commercialPrice: 120000,
    isSoldOut: false,
    editionTotal: 80,
    editionRemaining: 65,
    likes: 395,
    createdAt: '2026-03-25',
    aspectRatio: 'portrait',
    tags: ['sticker', 'y2k', 'cyberpunk', 'hologram', 'neon', 'dán ván trượt', 'genz'],
    description: 'Set sticker phong cách viễn tưởng Y2K phối màu holographic ngũ sắc cực ngầu. Rất thích hợp để in decal phản quang 7 màu dán ván trượt, vali hoặc ốp lưng điện thoại cá tính.',
    inspiration: 'Thẩm mỹ công nghệ những năm 2000 và trào lưu thời trang vị lai của giới trẻ Sài Gòn.',
    dimensions: '4000 x 5000 px',
    resolution: '350 DPI CMYK',
    deliverables: ['8 File .PNG độ phân giải cao', 'Layer phủ hiệu ứng Hologram riêng', 'Bản quyền in thương mại'],
    colorProfile: 'CMYK Japan Color',
    hasWatermark: true,
    views: 2890,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-stk-03',
    title: 'Bộ Sticker Cảm Xúc Capybara Chữa Lành (10 Biểu Cảm)',
    artistId: 'artist-003',
    artistName: 'Trúc An (An Nhiên)',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.97,
    imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    category: 'Sticker & Decal',
    style: 'Anime & Chibi',
    personalPrice: 30000,
    commercialPrice: 85000,
    isSoldOut: false,
    editionTotal: 150,
    editionRemaining: 132,
    likes: 560,
    createdAt: '2026-03-24',
    aspectRatio: 'square',
    tags: ['sticker', 'capybara', 'chữa lành', 'dễ thương', 'chibi', 'discord emote', 'planner'],
    description: 'Chú chuột lang nước Capybara với vẻ mặt điềm nhiên đội quả quýt, ngâm mình trong bồn nước nóng và uống trà sữa. Bộ sticker mang lại năng lượng vô ưu thanh thản.',
    inspiration: 'Loài vật hòa đồng và điềm tĩnh nhất hành tinh.',
    dimensions: '2500 x 2500 px',
    resolution: '300 DPI Transparent',
    deliverables: ['10 File PNG riêng biệt', '1 Sheet in sticker A5 hoàn chỉnh', 'Giấy phép in quà tặng'],
    colorProfile: 'sRGB',
    hasWatermark: true,
    views: 4100,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },

  // ==========================================
  // NHÓM 2: ÁO THUN & APPAREL (Giá: 95.000đ - 180.000đ)
  // ==========================================
  {
    id: 'art-app-01',
    title: 'Graphic Áo Thun Streetwear: Rồng Cyber 2026 Oversize',
    artistId: 'artist-002',
    artistName: 'Vũ Long (Kev.Z)',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.96,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    category: 'Áo thun & Apparel',
    style: 'Cyberpunk & Neon',
    personalPrice: 180000,
    commercialPrice: 480000, // Quyền thương mại in áo bán lẻ
    isSoldOut: false,
    editionTotal: 40,
    editionRemaining: 27,
    likes: 382,
    createdAt: '2026-03-23',
    aspectRatio: 'portrait',
    tags: ['áo thun', 'apparel', 'streetwear', 'oversize', 'cyberpunk', 'rồng', 'local brand'],
    description: 'Thiết kế tranh in lưng áo thun phom rộng (oversize tee) cực chất với hình tượng rồng phương Đông công nghệ cơ khí vảy neon. Kèm logo ngực áo tối giản.',
    inspiration: 'Hòa quyện giữa thần thú rồng thời Lý và đường nét cơ khí mecha tương lai.',
    dimensions: '4500 x 6000 px (Chuẩn in lụa & DTG)',
    resolution: '300 DPI Tách Màu',
    deliverables: ['.AI Vector Master', '.PSD Tách Lớp In Lụa', 'Mockup Áo Thun Trắng/Đen Chân Thực', 'Chứng nhận bản quyền POD'],
    colorProfile: 'CMYK Euroscale Coated',
    hasWatermark: true,
    views: 3100,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-app-02',
    title: 'Thiết Kế Áo Thun Y2K Butterfly Star Pastel Tee',
    artistId: 'artist-001',
    artistName: 'Hà My (Mèo Cam)',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    category: 'Áo thun & Apparel',
    style: 'Indie & Y2K',
    personalPrice: 150000,
    commercialPrice: 380000,
    isSoldOut: false,
    editionTotal: 50,
    editionRemaining: 39,
    likes: 315,
    createdAt: '2026-03-22',
    aspectRatio: 'square',
    tags: ['áo thun', 'baby tee', 'y2k', 'bướm', 'pastel', 'thời trang nữ', 'pod'],
    description: 'Họa tiết bướm thiên hà ngũ sắc và ngôi sao 4 cánh phong cách Y2K cực kỳ thịnh hành cho các dòng áo baby tee, crop-top nữ tính hoặc túi tote dạo phố.',
    inspiration: 'Trào lưu thẩm mỹ thập niên 2000 tái sinh trong phong cách thời trang của Gen Z.',
    dimensions: '3500 x 3500 px Vector/PNG',
    resolution: '300 DPI Transparent',
    deliverables: ['.AI Vector', '.PNG 300 DPI', 'Mockup Baby Tee thực tế', 'Bản quyền in ấn thương mại'],
    colorProfile: 'sRGB / CMYK',
    hasWatermark: true,
    views: 2450,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-app-03',
    title: 'Túi Canvas Tote Bag Mèo Uống Trà Sữa Thư Giãn',
    artistId: 'artist-003',
    artistName: 'Trúc An (An Nhiên)',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.97,
    imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    category: 'Áo thun & Apparel',
    style: 'Doodle & Nét cọ tay',
    personalPrice: 95000,
    commercialPrice: 250000,
    isSoldOut: false,
    editionTotal: 60,
    editionRemaining: 48,
    likes: 270,
    createdAt: '2026-03-21',
    aspectRatio: 'portrait',
    tags: ['túi vải', 'tote bag', 'mèo', 'trà sữa', 'doodle', 'apparel', 'phụ kiện'],
    description: 'Nét vẽ tay doodle phóng khoáng chú mèo trắng đang ôm ly trà sữa trân châu khổng lồ. Thiết kế tối ưu định dạng in trên vải mộc canvas, túi tote, tạp dề hoặc cốc sứ.',
    inspiration: 'Thú vui uống trà sữa trân châu đường đen sau mỗi giờ tan trường.',
    dimensions: '3000 x 4000 px',
    resolution: '300 DPI Đơn Sắc & Màu',
    deliverables: ['Bản màu Pastel', 'Bản nét đen đơn sắc Line-art', 'Mockup túi vải', 'Giấy phép in'],
    colorProfile: 'CMYK',
    hasWatermark: true,
    views: 1980,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },

  // ==========================================
  // NHÓM 3: LOGO & BRAND IDENTITY (Giá: 190.000đ - 280.000đ)
  // ==========================================
  {
    id: 'art-logo-01',
    title: 'Logo & Mascot Chú Gấu Tiệm Bánh Nhỏ (Bakery Brand)',
    artistId: 'artist-004',
    artistName: 'Minh Đăng (Lemon)',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    category: 'Logo & Brand Identity',
    style: 'Tối giản (Minimalist)',
    personalPrice: 250000,
    commercialPrice: 650000, // Cấp phép độc quyền cho shop
    isSoldOut: false,
    editionTotal: 5,
    editionRemaining: 3,
    likes: 340,
    createdAt: '2026-03-24',
    aspectRatio: 'square',
    tags: ['logo', 'branding', 'tiệm bánh', 'mascot', 'gấu', 'nhận diện thương hiệu', 'shop online'],
    description: 'Bộ nhận diện thương hiệu hoàn chỉnh cho tiệm bánh ngọt, cà phê handmade hoặc shop quà tặng. Bao gồm logo biểu trưng chú gấu đầu bếp dễ thương, font chữ thương hiệu và tem dán hộp bánh.',
    inspiration: 'Hương thơm ngọt ngào của mẻ bánh sừng bò mới ra lò lúc sáng sớm.',
    dimensions: 'Vector Master vô hạn độ phân giải',
    resolution: 'Vector .AI / .SVG / .EPS',
    deliverables: ['File gốc Vector .AI & .SVG', 'Avatar tròn mạng xã hội', 'Mẫu tem tròn dán hộp bánh 5cm', 'Hợp đồng độc quyền thương mại vĩnh viễn'],
    colorProfile: 'CMYK & RGB',
    hasWatermark: true,
    views: 2800,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-logo-02',
    title: 'Bộ Logo & Tem Dán Ly Trà Trái Cây Nhiệt Đới',
    artistId: 'artist-004',
    artistName: 'Minh Đăng (Lemon)',
    artistAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.95,
    imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    category: 'Logo & Brand Identity',
    style: 'Indie & Y2K',
    personalPrice: 280000,
    commercialPrice: 690000,
    isSoldOut: false,
    editionTotal: 6,
    editionRemaining: 4,
    likes: 298,
    createdAt: '2026-03-22',
    aspectRatio: 'portrait',
    tags: ['logo', 'quán trà', 'tem dán ly', 'trái cây', 'branding', 'indie', 'khởi nghiệp'],
    description: 'Thiết kế logo trẻ trung, bắt mắt với bảng màu cam đào và xanh mint tươi mát. Kèm file xuất sẵn tem decal trong dán ly nhựa / ly giấy và menu để bàn.',
    inspiration: 'Những ly trà đào cam sả mát lạnh giữa mùa hè rực rỡ.',
    dimensions: 'Vector .AI & 5000 x 5000 px',
    resolution: 'Vector Infinite',
    deliverables: ['Vector Logo .AI / .EPS', 'File tem dán ly 4.5cm', 'Bản quyền sử dụng kinh doanh toàn diện'],
    colorProfile: 'CMYK FOGRA39',
    hasWatermark: true,
    views: 2310,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },

  // ==========================================
  // NHÓM 4: WASHI TAPE & STATIONERY (Giá: 35.000đ - 60.000đ)
  // ==========================================
  {
    id: 'art-wsh-01',
    title: 'Washi Tape Mèo Cam Ăn Bánh Ngọt (Seamless Pattern 30cm)',
    artistId: 'artist-001',
    artistName: 'Hà My (Mèo Cam)',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    category: 'Washi Tape & Stationery',
    style: 'Anime & Chibi',
    personalPrice: 50000,
    commercialPrice: 140000,
    isSoldOut: false,
    editionTotal: 90,
    editionRemaining: 73,
    likes: 410,
    createdAt: '2026-03-25',
    aspectRatio: 'landscape',
    tags: ['washi tape', 'băng keo giấy', 'stationery', 'bullet journal', 'mèo', 'văn phòng phẩm'],
    description: 'Họa tiết lặp không lộ mối nối (seamless pattern) dài 30cm dành riêng cho in băng keo giấy Washi Tape 20mm hoặc viền trang trí sổ tay, thiệp chúc mừng.',
    inspiration: 'Bộ sưu tập sổ tay bullet journal và niềm vui dán tape mỗi tối.',
    dimensions: '6000 x 600 px (30cm x 3cm chuẩn xưởng in tape)',
    resolution: '600 DPI Ultra Sharp',
    deliverables: ['.AI Vector Seamless File', '.PNG 600 DPI', 'Mockup cuộn washi tape thực tế', 'Giấy phép in thương mại'],
    colorProfile: 'CMYK Japan Color',
    hasWatermark: true,
    views: 3400,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-wsh-02',
    title: 'Bộ Bookmark & Giấy Ghi Chú Memo Pad Trái Cây Mùa Hè',
    artistId: 'artist-003',
    artistName: 'Trúc An (An Nhiên)',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.97,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    category: 'Washi Tape & Stationery',
    style: 'Doodle & Nét cọ tay',
    personalPrice: 35000,
    commercialPrice: 95000,
    isSoldOut: false,
    editionTotal: 120,
    editionRemaining: 104,
    likes: 285,
    createdAt: '2026-03-24',
    aspectRatio: 'portrait',
    tags: ['stationery', 'bookmark', 'memo pad', 'giấy ghi chú', 'văn phòng phẩm', 'trái cây'],
    description: 'Set 4 mẫu kẹp sách (bookmark) và giấy ghi chú memo pad hình lát chanh, dưa hấu, bơ và dâu tây vẽ nét màu nước trong trẻo.',
    inspiration: 'Mùa hè rực rỡ và những trang sách đọc dở dưới bóng cây râm mát.',
    dimensions: '3000 x 4500 px A4 Grid',
    resolution: '300 DPI Print Ready',
    deliverables: ['File in ấn cắt bế 4 Bookmark', 'File thiết kế Memo Pad 8x8cm', 'Bản quyền in ấn'],
    colorProfile: 'CMYK',
    hasWatermark: true,
    views: 1870,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },

  // ==========================================
  // NHÓM 5: PHONE CASE & PHỤ KIỆN (Giá: 55.000đ - 70.000đ)
  // ==========================================
  {
    id: 'art-cse-01',
    title: 'Minh Họa Ốp Lưng Điện Thoại: Hồ Cá Koi Mini Trong Suốt',
    artistId: 'artist-003',
    artistName: 'Trúc An (An Nhiên)',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.97,
    imageUrl: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
    category: 'Phone Case & Phụ kiện',
    style: 'Doodle & Nét cọ tay',
    personalPrice: 65000,
    commercialPrice: 180000,
    isSoldOut: false,
    editionTotal: 75,
    editionRemaining: 58,
    likes: 360,
    createdAt: '2026-03-25',
    aspectRatio: 'portrait',
    tags: ['phone case', 'ốp lưng', 'cá koi', 'trong suốt', 'phụ kiện điện thoại', 'iphone'],
    description: 'Minh họa đàn cá koi đỏ bơi lội quanh tán lá sen tây trong veo. File in được thiết kế tối ưu trên nền ốp lưng trong suốt hoặc ốp lưng màu nguyên bản của máy.',
    inspiration: 'Tiếng nước róc rách bên bể cá sân vườn của quán cà phê yên tĩnh.',
    dimensions: '2500 x 4500 px (Phù hợp iPhone 11 - 16 Pro Max & Android)',
    resolution: '300 DPI Transparent',
    deliverables: ['.PNG trong suốt', '.PSD căn chỉnh camera các dòng máy', 'Giấy phép in thương mại cho xưởng ốp'],
    colorProfile: 'Adobe RGB',
    hasWatermark: true,
    views: 2950,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-cse-02',
    title: 'Ốp Lưng Hologram Ma Trận Neon Game Boy Retro',
    artistId: 'artist-002',
    artistName: 'Vũ Long (Kev.Z)',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.96,
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    category: 'Phone Case & Phụ kiện',
    style: 'Retro & Vintage',
    personalPrice: 70000,
    commercialPrice: 195000,
    isSoldOut: false,
    editionTotal: 65,
    editionRemaining: 51,
    likes: 310,
    createdAt: '2026-03-24',
    aspectRatio: 'portrait',
    tags: ['phone case', 'game boy', 'retro', 'pixel', 'ốp điện thoại', 'y2k'],
    description: 'Thiết kế ốp lưng biến mặt sau chiếc smartphone thành chiếc máy chơi game Game Boy cổ điển thập niên 90 với màn hình xanh pixel hoài niệm.',
    inspiration: 'Ký ức tuổi thơ cùng chiếc máy chơi game điện tử cầm tay 4 nút.',
    dimensions: '2500 x 4800 px',
    resolution: '300 DPI High-Res',
    deliverables: ['.PNG Master', 'Mockup 3D ốp lưng đa góc nhìn', 'Bản quyền in ấn'],
    colorProfile: 'sRGB',
    hasWatermark: true,
    views: 2420,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },

  // ==========================================
  // NHÓM 6: POSTER & DECOR (Giá: 75.000đ - 85.000đ)
  // ==========================================
  {
    id: 'art-pos-01',
    title: 'Poster Trang Trí Góc Học Tập: Tiệm Sách Mưa Chiều Lofi A3',
    artistId: 'artist-003',
    artistName: 'Trúc An (An Nhiên)',
    artistAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.97,
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    category: 'Poster & Decor',
    style: 'Anime & Chibi',
    personalPrice: 75000,
    commercialPrice: 220000,
    isSoldOut: false,
    editionTotal: 100,
    editionRemaining: 82,
    likes: 440,
    createdAt: '2026-03-25',
    aspectRatio: 'landscape',
    tags: ['poster', 'lofi', 'decor phòng trọ', 'tiệm sách', 'chill', 'tranh treo tường'],
    description: 'Bản vẽ minh họa góc tiệm sách cũ dưới cơn mưa rào mùa hạ, ánh đèn vàng ấm áp và những chồng sách chất cao. Rất hợp để in tranh canvas hoặc poster dán tường phòng ngủ.',
    inspiration: 'Giai điệu Lofi Hip-hop êm dịu trong những đêm ngồi học bài khuya.',
    dimensions: '4960 x 3508 px (Khổ A3 in ấn chuẩn nhà in)',
    resolution: '300 DPI Lossless Master',
    deliverables: ['.PDF Print Ready', '.PNG 300 DPI Ultra HD', 'Chứng nhận bản quyền ARTFAIR'],
    colorProfile: 'CMYK Euroscale',
    hasWatermark: true,
    views: 3800,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  },
  {
    id: 'art-pos-02',
    title: 'Tranh Mini Canvas Decor Bàn Học: Hoàng Hôn Biển Xanh',
    artistId: 'artist-001',
    artistName: 'Hà My (Mèo Cam)',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    artistRating: 4.99,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    category: 'Poster & Decor',
    style: 'Tối giản (Minimalist)',
    personalPrice: 85000,
    commercialPrice: 240000,
    isSoldOut: false,
    editionTotal: 80,
    editionRemaining: 68,
    likes: 310,
    createdAt: '2026-03-24',
    aspectRatio: 'square',
    tags: ['poster', 'canvas', 'hoàng hôn', 'decor bàn học', 'tối giản', 'quà tặng'],
    description: 'Bức tranh khổ vuông nhỏ nhắn mô tả mặt trời lặn dần trên ngọn sóng biếc. Tông màu cam ấm và xanh dương êm dịu giúp góc học tập thêm thư thái.',
    inspiration: 'Chuyến cắm trại bên bờ biển Mỹ Khê cùng hội bạn thân.',
    dimensions: '3500 x 3500 px Khổ vuông 20x20cm',
    resolution: '300 DPI Master',
    deliverables: ['.PNG 300 DPI', '.PDF Print', 'Bản quyền in thương mại'],
    colorProfile: 'CMYK',
    hasWatermark: true,
    views: 2150,
    mockupImages: {
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      tshirt: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
      phonecase: 'https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=1200&q=80',
      totebag: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    }
  }
];

// Initial mock owned artworks for buyer
export const INITIAL_OWNED_ARTWORKS: OwnedArtwork[] = [
  {
    orderId: 'ORD-2026-8812',
    artworkId: 'art-stk-01',
    artworkTitle: 'Set 12 Sticker Chibi Mèo Bánh Mì Lười',
    artistName: 'Hà My (Mèo Cam)',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    licenseType: 'commercial',
    pricePaid: 95000,
    purchaseDate: '2026-03-25 14:32',
    certificateHash: '0x7F9B1E4A38C2018DFA76B08401DED1BD683B2B9A',
    deliverables: ['12 File .PNG Tách Nền Trong Suốt', 'File .AI Vector Bế Cắt Sẵn', 'Chứng Nhận Bản Quyền In Ấn Thương Mại']
  },
  {
    orderId: 'ORD-2026-7734',
    artworkId: 'art-app-01',
    artworkTitle: 'Graphic Áo Thun Streetwear: Rồng Cyber 2026 Oversize',
    artistName: 'Vũ Long (Kev.Z)',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    licenseType: 'personal',
    pricePaid: 180000,
    purchaseDate: '2026-03-26 09:15',
    certificateHash: '0x3E84F17A9B2C4D05E612B08401FAF6F2683B2B8C',
    deliverables: ['.AI Vector Master', '.PSD Tách Lớp In Lụa', 'Giấy Chứng Nhận Quyền Sở Hữu Cá Nhân']
  }
];

// Initial mock commission orders with live escrow stepper
export const INITIAL_COMMISSIONS: CommissionOrder[] = [
  {
    id: 'CMS-042',
    title: 'Gói Vẽ Set 10 Sticker Chibi Theo Yêu Cầu',
    buyerName: 'Nguyễn Trần Hải (Bạn)',
    artistName: 'Hà My (Mèo Cam)',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    budget: 95000,
    licenseType: 'commercial',
    currentStep: 'color_refinement',
    createdAt: '2026-03-24',
    deadline: '2026-03-29',
    brief: 'Vẽ set 10 hình chú cún Corgi biểu cảm ăn vặt và học bài để shop in tặng kèm khách mua sổ tay.',
    sketches: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    ],
    finalArtworkUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    escrowStatus: 'locked',
  },
  {
    id: 'CMS-038',
    title: 'Thiết Kế Hình In Áo Thun Streetwear Trưng Bày',
    buyerName: 'Nguyễn Trần Hải (Bạn)',
    artistName: 'Vũ Long (Kev.Z)',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    budget: 250000,
    licenseType: 'commercial',
    currentStep: 'sketch_concept',
    createdAt: '2026-03-26',
    deadline: '2026-04-01',
    brief: 'Thiết kế graphic áo thun phong cách Y2K chủ đề hoa hồng gai và chữ bọc kim loại bóng.',
    sketches: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    ],
    escrowStatus: 'locked',
  }
];
