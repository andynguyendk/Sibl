export const languages = {
  vi: 'Tiếng Việt',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'vi';

export const translations = {
  vi: {
    nav: {
      features: 'Tính năng',
      safety: 'An toàn',
      how: 'Hoạt động',
      pricing: 'Giá',
      faq: 'FAQ',
      cta: 'Đăng ký sớm',
    },
    hero: {
      badge: 'AI an toàn cho trẻ em',
      title: 'Người anh chị AI\ncủa bé yêu',
      subtitle: 'Trợ lý học tập, người bạn tâm sự, luôn đồng hành cùng con.\nBa mẹ hoàn toàn yên tâm.',
      cta: 'Đăng ký dùng thử miễn phí',
      secondary: 'Xem cách hoạt động',
    },
    channels: {
      title: 'Nơi con hay dùng, nơi Sibl có mặt',
      subtitle: 'Không cần tải app mới — kết nối ngay qua ứng dụng nhắn tin quen thuộc',
    },
    features: {
      title: 'Hơn cả một trợ lý',
      subtitle: 'Sibl được thiết kế như một người anh chị lớn — hiểu biết, kiên nhẫn, luôn sẵn sàng',
      tutor: {
        title: 'Gia sư thân thiện',
        desc: 'Giải bài tập, giải thích khái niệm, giúp con hiểu bài chứ không chỉ cho đáp án. Thích ứng theo độ tuổi và môn học.',
      },
      companion: {
        title: 'Người bạn tâm sự',
        desc: 'Con muốn kể chuyện, hỏi những câu "tại sao", hay đơn giản là nói chuyện vui — Sibl luôn lắng nghe.',
      },
      voice: {
        title: 'Nhắn tin & gọi thoại',
        desc: 'Hỗ trợ cả văn bản và giọng nói. Con có thể gửi tin nhắn, ghi âm, hay gọi thoại thoải mái.',
      },
      weekly: {
        title: 'Báo cáo hàng tuần',
        desc: 'Mỗi tuần ba mẹ nhận bản tóm tắt: con đã học gì, hỏi gì, những chủ đề nào được quan tâm.',
      },
    },
    safety: {
      title: 'An toàn là ưu tiên số 1',
      subtitle: 'Nhiều lớp bảo vệ để ba mẹ hoàn toàn yên tâm',
      boundaries: {
        title: 'Giới hạn nội dung',
        desc: 'Tất cả câu hỏi ngoài phạm vi được từ chối khéo léo và ghi nhận vào báo cáo cho ba mẹ.',
      },
      flagged: {
        title: 'Cảnh báo tức thì',
        desc: 'Nội dung nhạy cảm được phát hiện ngay lập tức, ba mẹ nhận thông báo trong vòng vài phút.',
      },
      encrypted: {
        title: 'Mã hóa đầu cuối',
        desc: 'Mọi cuộc hội thoại được mã hóa. Không quảng cáo, không bán dữ liệu, không theo dõi.',
      },
      transparent: {
        title: 'Minh bạch hoàn toàn',
        desc: 'Ba mẹ có thể xem lại toàn bộ lịch sử trò chuyện bất cứ lúc nào.',
      },
    },
    how: {
      title: '3 bước bắt đầu',
      subtitle: 'Đơn giản như 1-2-3',
      step1: {
        title: 'Đăng ký & tạo hồ sơ',
        desc: 'Nhập thông tin con: tên, độ tuổi, sở thích. Sibl sẽ tự điều chỉnh phù hợp.',
      },
      step2: {
        title: 'Chọn kênh liên lạc',
        desc: 'Kết nối qua Telegram, WhatsApp hoặc Zalo — nơi con hay dùng nhất.',
      },
      step3: {
        title: 'Con bắt đầu trò chuyện',
        desc: 'Con nhắn tin hoặc gọi thoại với Sibl. Ba mẹ nhận báo cáo hàng tuần.',
      },
    },
    pricing: {
      title: 'Giá cả phải chăng',
      subtitle: 'Dùng thử miễn phí 14 ngày, không cần thẻ tín dụng',
      free: {
        name: 'Dùng thử',
        price: '0đ',
        period: '/tháng',
        desc: 'Trải nghiệm đầy đủ tính năng',
        features: ['1 bé', '3 cuộc trò chuyện/ngày', 'Báo cáo tuần cơ bản', 'Văn bản'],
        cta: 'Bắt đầu miễn phí',
      },
      pro: {
        name: 'Pro',
        price: '99.000đ',
        period: '/tháng',
        desc: 'Dành cho gia đình',
        badge: 'Phổ biến nhất',
        features: ['3 bé', 'Trò chuyện không giới hạn', 'Báo cáo tuần chi tiết', 'Văn bản + Giọng nói', 'Cảnh báo tức thì', 'Hỗ trợ ưu tiên'],
        cta: 'Đăng ký Pro',
      },
    },
    faq: {
      title: 'Câu hỏi thường gặp',
      q1: {
        q: 'Sibl phù hợp với độ tuổi nào?',
        a: 'Sibl được thiết kế cho trẻ em từ 6-15 tuổi. AI sẽ tự động điều chỉnh cách nói chuyện, độ khó và nội dung theo độ tuổi của bé.',
      },
      q2: {
        q: 'Dữ liệu của con có an toàn không?',
        a: 'Hoàn toàn. Mọi dữ liệu được mã hóa đầu cuối, không bán cho bên thứ ba, không quảng cáo. Ba mẹ có thể yêu cầu xóa dữ liệu bất cứ lúc nào.',
      },
      q3: {
        q: 'Sibl có thay thế ba mẹ được không?',
        a: 'Không. Sibl là công cụ hỗ trợ học tập và giải trí, không thay thế sự giáo dục của gia đình. Ba mẹ luôn là người giám sát và nhận báo cáo đầy đủ.',
      },
      q4: {
        q: 'Nếu con hỏi những câu không phù hợp thì sao?',
        a: 'Sibl được thiết lập giới hạn nội dung nghiêm ngặt. Câu hỏi ngoài phạm vi sẽ được từ chối khéo léo và được ghi nhận vào báo cáo cho ba mẹ.',
      },
      q5: {
        q: 'Con có thể dùng trên điện thoại không?',
        a: 'Có! Sibl hoạt động qua Telegram, WhatsApp và Zalo — các ứng dụng con đã quen thuộc. Không cần tải thêm app nào.',
      },
    },
    cta: {
      title: 'Sẵn sàng đồng hành cùng con?',
      subtitle: 'Dùng thử miễn phí 14 ngày — không cần thẻ tín dụng',
      button: 'Bắt đầu ngay',
    },
    footer: {
      tagline: 'AI an toàn, thông minh, luôn đồng hành cùng trẻ em.',
      product: 'Sản phẩm',
      features: 'Tính năng',
      safety: 'An toàn',
      pricing: 'Giá',
      faq: 'FAQ',
      company: 'Công ty',
      about: 'Về chúng tôi',
      contact: 'Liên hệ',
      privacy: 'Chính sách bảo mật',
      terms: 'Điều khoản sử dụng',
      rights: '© 2026 Sibl. Mọi quyền được bảo lưu.',
    },
  },
  en: {
    nav: {
      features: 'Features',
      safety: 'Safety',
      how: 'How it works',
      pricing: 'Pricing',
      faq: 'FAQ',
      cta: 'Sign up',
    },
    hero: {
      badge: 'Safe AI for kids',
      title: "Your child's\nAI older sibling",
      subtitle: 'A tutor, a companion, always there.\nComplete peace of mind for parents.',
      cta: 'Start free trial',
      secondary: 'See how it works',
    },
    channels: {
      title: 'Where kids chat, Sibl is there',
      subtitle: 'No new app to install — connect via the messaging apps they already use',
    },
    features: {
      title: 'More than an assistant',
      subtitle: 'Designed like a real older sibling — knowledgeable, patient, always ready',
      tutor: {
        title: 'Friendly tutor',
        desc: 'Explains concepts, walks through problems, helps kids understand — not just gives answers. Adapts to age and subject.',
      },
      companion: {
        title: 'Thoughtful companion',
        desc: 'Whether your child wants to tell stories, ask "why" questions, or just chat — Sibl is always there to listen.',
      },
      voice: {
        title: 'Text & voice',
        desc: 'Full support for text and voice messages. Kids can type, send voice notes, or make voice calls.',
      },
      weekly: {
        title: 'Weekly reports',
        desc: 'Parents receive a weekly digest: what kids learned, asked about, and topics they explored.',
      },
    },
    safety: {
      title: 'Safety comes first',
      subtitle: 'Multiple layers of protection for complete parent peace of mind',
      boundaries: {
        title: 'Content boundaries',
        desc: 'All out-of-scope questions are politely declined and logged in the parent report.',
      },
      flagged: {
        title: 'Instant alerts',
        desc: 'Sensitive content is detected immediately — parents are notified within minutes.',
      },
      encrypted: {
        title: 'End-to-end encryption',
        desc: 'All conversations are encrypted. No ads, no data selling, no tracking.',
      },
      transparent: {
        title: 'Full transparency',
        desc: 'Parents can review the entire conversation history at any time.',
      },
    },
    how: {
      title: '3 steps to get started',
      subtitle: 'Simple as 1-2-3',
      step1: {
        title: 'Sign up & create profile',
        desc: "Enter your child's info: name, age, interests. Sibl adapts automatically.",
      },
      step2: {
        title: 'Choose a channel',
        desc: 'Connect via Telegram, WhatsApp, or Zalo — wherever your child is most comfortable.',
      },
      step3: {
        title: 'Start chatting',
        desc: 'Your child messages or calls Sibl. You receive weekly reports.',
      },
    },
    pricing: {
      title: 'Affordable pricing',
      subtitle: '14-day free trial, no credit card required',
      free: {
        name: 'Free trial',
        price: 'Free',
        period: '',
        desc: 'Try all features',
        features: ['1 child', '3 conversations/day', 'Basic weekly report', 'Text only'],
        cta: 'Start free',
      },
      pro: {
        name: 'Pro',
        price: '$3.99',
        period: '/month',
        desc: 'For families',
        badge: 'Most popular',
        features: ['3 children', 'Unlimited conversations', 'Detailed weekly report', 'Text + Voice', 'Instant alerts', 'Priority support'],
        cta: 'Sign up for Pro',
      },
    },
    faq: {
      title: 'Frequently asked questions',
      q1: {
        q: 'What age range is Sibl for?',
        a: 'Sibl is designed for children aged 6-15. The AI automatically adjusts its tone, difficulty, and content based on the child\'s age.',
      },
      q2: {
        q: 'Is my child\'s data safe?',
        a: 'Absolutely. All data is end-to-end encrypted, never sold to third parties, and ad-free. Parents can request data deletion at any time.',
      },
      q3: {
        q: 'Can Sibl replace parents?',
        a: 'No. Sibl is a learning and entertainment support tool — it does not replace family education. Parents always supervise and receive full reports.',
      },
      q4: {
        q: 'What if my child asks inappropriate questions?',
        a: 'Sibl has strict content boundaries. Out-of-scope questions are politely declined and logged in the parent report.',
      },
      q5: {
        q: 'Can my child use it on their phone?',
        a: 'Yes! Sibl works via Telegram, WhatsApp, and Zolo — apps your child already knows. No extra app to download.',
      },
    },
    cta: {
      title: "Ready to support your child's journey?",
      subtitle: '14-day free trial — no credit card required',
      button: 'Get started',
    },
    footer: {
      tagline: 'Safe, smart AI companion for every child.',
      product: 'Product',
      features: 'Features',
      safety: 'Safety',
      pricing: 'Pricing',
      faq: 'FAQ',
      company: 'Company',
      about: 'About',
      contact: 'Contact',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      rights: '© 2026 Sibl. All rights reserved.',
    },
  },
} as const;

export type Translations = (typeof translations)[Lang];
