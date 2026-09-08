import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // =========================
      // NAVBAR
      // =========================
      nav: {
        home: "Home",
        about: "About",
        courses: "Courses",
        paths: "Learning Paths",
        contact: "Contact",
        login: "Login",
        startLearning: "Start Learning",
        account: "Account",
      },

      // =========================
      // HERO
      // =========================
      hero: {
        badge: "Learn • Build • Grow",
        titleLine1: "Learn skills",
        titleLine2: "that create",
        titleLine3: "opportunities.",
        description:
          "Practical courses, real projects, and guided learning paths designed to help you grow your career with confidence.",
        exploreCourses: "Explore Courses",
        learningPaths: "View Learning Paths",
        students: "Students",
        courses: "Courses",
        completion: "Completion",
        imageAlt: "Learning",
      },

      // =========================
      // ABOUT / WHY LEARN
      // =========================
      about: {
        badge: "A better way to learn",
        title: "Learning that moves",
        titleHighlight: "you forward.",
        description:
          "Everything you need to build meaningful skills, stay consistent, and prepare for real opportunities.",

        features: {
          practical: {
            title: "Practical Learning",
            description:
              "Learn through practical lessons and projects that help you turn knowledge into real skills.",
          },

          structured: {
            title: "Structured Paths",
            description:
              "Follow clear learning paths designed to take you from the fundamentals to job-ready skills.",
          },

          guidance: {
            title: "Learn With Guidance",
            description:
              "Get guidance from experienced instructors and stay focused throughout your learning journey.",
          },
        },
      },

      // =========================
      // COURSES
      // =========================
      courses: {
        eyebrow: "Featured Courses",
        titleLine1: "Learn something",
        titleLine2: "worth building.",
        description:
          "Explore practical courses designed to help you build real skills, work on meaningful projects, and move closer to your goals.",
        viewAll: "View all courses",
        viewCourse: "View course",
        previous: "Previous courses",
        next: "Next courses",

        frontend: {
          category: "Development",
          title: "Modern Frontend Development",
          description:
            "Build responsive and interactive websites using modern frontend technologies.",
          duration: "8 Weeks",
          level: "Beginner",
        },

        backend: {
          category: "Development",
          title: "Backend Development with Node.js",
          description:
            "Build powerful APIs, work with databases, and create scalable backend applications.",
          duration: "10 Weeks",
          level: "Intermediate",
        },

        data: {
          category: "Data & AI",
          title: "Data Science Fundamentals",
          description:
            "Learn data analysis, visualization, and the fundamentals of machine learning.",
          duration: "9 Weeks",
          level: "Intermediate",
        },

        uiux: {
          category: "Design",
          title: "UI/UX Design Essentials",
          description:
            "Learn how to design intuitive digital experiences from research to final interface.",
          duration: "6 Weeks",
          level: "Beginner",
        },
      },

      // =========================
      // LEARNING PATHS
      // =========================
      paths: {
        eyebrow: "Learning Paths",
        title: "Know where you're going. We'll help you get there.",
        description:
          "Follow a structured path instead of guessing what to learn next. Each path combines carefully selected courses and practical skills around a specific goal.",
        viewAll: "Explore all paths",

        start: "Start",
        courses: "Courses",

        journey: "Your learning journey",
        nextDestination: "Choose your next destination",
        keepGoing: "Keep going",

        chooseDestination: "Choose your destination",

        frontend: {
          title: "Frontend Development",
          description:
            "Build modern interfaces and become confident creating responsive web experiences.",
          level: "Beginner",
          skills: "HTML & CSS|JavaScript|React",
        },

        backend: {
          title: "Backend Development",
          description:
            "Learn how applications work behind the scenes and build powerful APIs.",
          level: "Intermediate",
          skills: "Node.js|Express|MongoDB",
        },

        dataAi: {
          title: "Data & AI",
          description:
            "Explore data, machine learning, and the tools used to turn information into insights.",
          level: "Intermediate",
          skills: "Python|Data Analysis|ML",
        },
      },

      // =========================
      // PROJECTS
      // =========================
      projects: {
        eyebrow: "Choose your destination",
        label: "Projects",
        title: "Learn by building. Make it yours.",
        description:
          "Put your skills into practice through projects that feel like real products. Build, experiment, solve problems, and create something you can be proud of.",
        viewAll: "Explore all projects",
        fullStack: "Full Stack",
        dataAi: "Data & AI",
        design: "Design",
        backend: "Backend",

        ecommerce: {
          category: "Web Development",
          title: "E-Commerce Platform",
          description:
            "Build a complete online store with authentication, product management, shopping cart, and a smooth checkout experience.",
          technologies: "React|Node.js|MongoDB",
        },

        analytics: {
          category: "Data & AI",
          title: "AI Analytics Dashboard",
          description:
            "Turn real-world data into meaningful insights through interactive visualizations and intelligent analysis.",
          technologies: "Python|Data|Machine Learning",
        },

        mobile: {
          category: "Product Design",
          title: "Mobile Experience",
          description:
            "Design a complete digital product from user research and wireframes to a polished responsive interface.",
          technologies: "Figma|UI Design|UX",
        },

        api: {
          category: "Backend Development",
          title: "REST API Service",
          description:
            "Create a scalable backend service with authentication, validation, database integration, and structured APIs.",
          technologies: "Node.js|Express|REST API",
        },

        bottomMessage: "Build something meaningful",
      },

      // =========================
      // INSTRUCTORS
      // =========================
      instructors: {
        eyebrow: "Build something meaningful",
        label: "Instructors",

        titleLine1: "Learn from people",
        titleLine2: "who build.",

        title: "Learn from people who build.",

        description:
          "Learn directly from experienced professionals who bring real-world knowledge, practical experience, and a passion for helping others grow.",

        instructor: "Instructor",
        experience: "Years Experience",

        previous: "Previous instructors",
        next: "Next instructors",

        bottomMessage: "Learn from experience",

        sarah: {
          name: "Sarah Ahmed",
          role: "Senior Frontend Engineer",
          specialty: "Web Development",
          experience: "8+ Years Experience",
        },

        mohamed: {
          name: "Mohamed Ali",
          role: "Backend & Systems Engineer",
          specialty: "Backend Development",
          experience: "10+ Years Experience",
        },

        nour: {
          name: "Nour Hassan",
          role: "AI & Machine Learning Engineer",
          specialty: "Artificial Intelligence",
          experience: "7+ Years Experience",
        },

        omar: {
          name: "Omar Khaled",
          role: "Product & UX Designer",
          specialty: "Product Design",
          experience: "9+ Years Experience",
        },
      },

      // =========================
      // CTA
      // =========================
      cta: {
        eyebrow: "Start your journey",
        titleLine1: "Ready to start",
        titleLine2: "learning?",
        description:
          "Build practical skills, work on meaningful projects, and learn from people who have real experience in the industry.",
        button: "Start Learning",
        supportingText: "Learn · Practice · Build · Grow",
      },

      // =========================
      // FOOTER
      // =========================
      footer: {
        description:
          "A practical learning platform designed to help you build real skills, work on meaningful projects, and grow with confidence.",
        platform: "Platform",
        courses: "Courses",
        learningPaths: "Learning Paths",
        company: "Company",
        about: "About",
        contact: "Contact",
        resources: "Resources",
        startLearning: "Start Learning",
        copyright: "© 2026 LMS Platform. All rights reserved.",
        tagline: "Learn · Practice · Build · Grow",
      },

      // =========================
      // CONTACT
      // =========================
      contact: {
        hero: {
          badge: "Contact Us",
          title: "Let's build your",
          titleHighlight: "next opportunity.",
          description:
            "Have a question, an idea, or need help getting started? Reach out to our team and we'll be happy to help.",
          button: "Send an Inquiry",
          trust: "We're here to help you move forward.",
        },

        form: {
          badge: "Get In Touch",
          title: "Send Us a Message",
          description:
            "Have a question or need more information? Fill out the form and our team will get back to you soon.",

          name: "Name",
          namePlaceholder: "Enter your name",

          email: "Email",
          emailPlaceholder: "Enter your email",

          subject: "Subject",
          subjectPlaceholder: "What is this about?",

          message: "Message",
          messagePlaceholder: "Write your message...",

          maxCharacters: "Max 1000 characters",

          send: "Send Message",
          sending: "Sending...",

          success: "Your message was sent successfully.",
          error: "Something went wrong. Please try again.",
        },

        validation: {
          nameRequired: "Name is required",
          nameMin: "Name must be at least 2 characters",
          nameMax: "Name cannot exceed 50 characters",
          nameInvalid:
            "Name can only contain letters, spaces, apostrophes, and hyphens",

          emailRequired: "Email is required",
          emailInvalid: "Please enter a valid email address",
          emailMax: "Email cannot exceed 254 characters",

          subjectRequired: "Subject is required",
          subjectMin: "Subject must be at least 3 characters",
          subjectMax: "Subject cannot exceed 100 characters",

          messageRequired: "Message is required",
          messageMin: "Message must be at least 10 characters",
          messageMax: "Message cannot exceed 1000 characters",
        },
      },
    },
  },

  // =====================================================
  // ARABIC
  // =====================================================

  ar: {
    translation: {
      // =========================
      // NAVBAR
      // =========================
      nav: {
        home: "الرئيسية",
        about: "من نحن",
        courses: "الدورات",
        paths: "المسارات التعليمية",
        contact: "تواصل معنا",
        login: "تسجيل الدخول",
        startLearning: "ابدأ التعلم",
        account: "الحساب",
      },

      // =========================
      // HERO
      // =========================
      hero: {
        badge: "تعلّم • ابنِ • تطوّر",
        titleLine1: "تعلّم مهارات",
        titleLine2: "تصنع",
        titleLine3: "الفرص.",
        description:
          "دورات عملية، ومشاريع حقيقية، ومسارات تعليمية موجهة تساعدك على تطوير مسيرتك المهنية بثقة.",
        exploreCourses: "استكشف الدورات",
        learningPaths: "استكشف المسارات التعليمية",
        students: "متعلم",
        courses: "دورة",
        completion: "نسبة الإكمال",
        imageAlt: "التعلّم",
      },

      // =========================
      // ABOUT / WHY LEARN
      // =========================
      about: {
        badge: "طريقة أفضل للتعلم",
        title: "تعلّم يدفعك",
        titleHighlight: "إلى الأمام.",
        description:
          "كل ما تحتاجه لبناء مهارات حقيقية، والاستمرار في التعلم، والاستعداد للفرص المهنية.",

        features: {
          practical: {
            title: "تعلم عملي",
            description:
              "تعلّم من خلال دروس ومشاريع عملية تساعدك على تحويل المعرفة إلى مهارات حقيقية.",
          },

          structured: {
            title: "مسارات منظمة",
            description:
              "اتبع مسارات تعليمية واضحة تنقلك من الأساسيات إلى مستوى يؤهلك لسوق العمل.",
          },

          guidance: {
            title: "تعلّم مع التوجيه",
            description:
              "احصل على التوجيه من مدربين ذوي خبرة وحافظ على تركيزك طوال رحلتك التعليمية.",
          },
        },
      },

      // =========================
      // COURSES
      // =========================
      courses: {
        eyebrow: "الدورات المميزة",
        titleLine1: "تعلّم شيئًا",
        titleLine2: "يستحق أن تبنيه.",
        description:
          "استكشف دورات عملية تساعدك على بناء مهارات حقيقية، والعمل على مشاريع ذات قيمة، والاقتراب أكثر من أهدافك.",
        viewAll: "استكشف جميع الدورات",
        viewCourse: "عرض الدورة",
        previous: "الدورات السابقة",
        next: "الدورات التالية",

        frontend: {
          category: "التطوير",
          title: "تطوير الواجهات الأمامية الحديثة",
          description:
            "ابنِ مواقع متجاوبة وتفاعلية باستخدام تقنيات الواجهات الأمامية الحديثة.",
          duration: "8 أسابيع",
          level: "مبتدئ",
        },

        backend: {
          category: "التطوير",
          title: "تطوير Backend باستخدام Node.js",
          description:
            "ابنِ واجهات API قوية، وتعلم التعامل مع قواعد البيانات وإنشاء تطبيقات Backend قابلة للتوسع.",
          duration: "10 أسابيع",
          level: "متوسط",
        },

        data: {
          category: "البيانات والذكاء الاصطناعي",
          title: "أساسيات علم البيانات",
          description: "تعلّم تحليل البيانات وتصورها وأساسيات تعلم الآلة.",
          duration: "9 أسابيع",
          level: "متوسط",
        },

        uiux: {
          category: "التصميم",
          title: "أساسيات تصميم UI/UX",
          description:
            "تعلّم تصميم تجارب رقمية سهلة وبديهية بدايةً من البحث وحتى الواجهة النهائية.",
          duration: "6 أسابيع",
          level: "مبتدئ",
        },
      },

      // =========================
      // LEARNING PATHS
      // =========================
      paths: {
        eyebrow: "المسارات التعليمية",
        title: "اعرف إلى أين تتجه، وسنساعدك على الوصول.",
        description:
          "اتبع مسارًا تعليميًا منظمًا بدلًا من التخمين فيما يجب أن تتعلمه بعد ذلك. كل مسار يجمع بين دورات ومهارات عملية حول هدف محدد.",
        viewAll: "استكشف جميع المسارات",

        start: "ابدأ",
        courses: "دورات",

        journey: "رحلتك التعليمية",
        nextDestination: "اختر وجهتك التالية",
        keepGoing: "واصل التقدم",

        chooseDestination: "اختر وجهتك",

        frontend: {
          title: "تطوير الواجهات الأمامية",
          description:
            "ابنِ واجهات حديثة واكتسب الثقة في إنشاء تجارب ويب متجاوبة.",
          level: "مبتدئ",
          skills: "HTML و CSS|JavaScript|React",
        },

        backend: {
          title: "تطوير Backend",
          description:
            "تعلّم كيف تعمل التطبيقات من الخلف وابنِ واجهات API قوية.",
          level: "متوسط",
          skills: "Node.js|Express|MongoDB",
        },

        dataAi: {
          title: "البيانات والذكاء الاصطناعي",
          description:
            "استكشف البيانات وتعلم الآلة والأدوات المستخدمة لتحويل المعلومات إلى رؤى.",
          level: "متوسط",
          skills: "Python|تحليل البيانات|ML",
        },
      },

      // =========================
      // PROJECTS
      // =========================
      projects: {
        eyebrow: "اختر وجهتك",
        label: "المشاريع",
        title: "تعلّم من خلال البناء. اصنع شيئًا خاصًا بك.",
        description:
          "طبّق مهاراتك من خلال مشاريع تشبه المنتجات الحقيقية. ابنِ، جرّب، حل المشكلات، وأنشئ شيئًا تفتخر به.",
        viewAll: "استكشف جميع المشاريع",
        fullStack: "Full Stack",
        dataAi: "البيانات والذكاء الاصطناعي",
        design: "التصميم",
        backend: "Backend",

        ecommerce: {
          category: "تطوير الويب",
          title: "منصة تجارة إلكترونية",
          description:
            "ابنِ متجرًا إلكترونيًا متكاملًا مع تسجيل الدخول وإدارة المنتجات وسلة التسوق وتجربة دفع سلسة.",
          technologies: "React|Node.js|MongoDB",
        },

        analytics: {
          category: "البيانات والذكاء الاصطناعي",
          title: "لوحة تحليلات بالذكاء الاصطناعي",
          description:
            "حوّل البيانات الواقعية إلى رؤى مفيدة من خلال التصورات التفاعلية والتحليل الذكي.",
          technologies: "Python|البيانات|تعلم الآلة",
        },

        mobile: {
          category: "تصميم المنتجات",
          title: "تجربة تطبيقات الهاتف",
          description:
            "صمّم منتجًا رقميًا متكاملًا بدايةً من بحث المستخدم وحتى واجهة متجاوبة ومتكاملة.",
          technologies: "Figma|UI Design|UX",
        },

        api: {
          category: "تطوير Backend",
          title: "خدمة REST API",
          description:
            "أنشئ خدمة Backend قابلة للتوسع مع المصادقة والتحقق وقاعدة البيانات وواجهات API منظمة.",
          technologies: "Node.js|Express|REST API",
        },

        bottomMessage: "ابنِ شيئًا ذا قيمة",
      },

      // =========================
      // INSTRUCTORS
      // =========================
      instructors: {
        eyebrow: "ابنِ شيئًا ذا قيمة",
        label: "المدربون",

        titleLine1: "تعلّم من أشخاص",
        titleLine2: "يصنعون الفرق.",

        title: "تعلّم من أشخاص يصنعون الفرق.",

        description:
          "تعلّم مباشرة من محترفين ذوي خبرة يقدمون معرفة واقعية وخبرة عملية وشغفًا بمساعدة الآخرين على التطور.",

        instructor: "مدرب",
        experience: "سنوات من الخبرة",

        previous: "المدربون السابقون",
        next: "المدربون التاليون",

        bottomMessage: "تعلّم من الخبرة",

        sarah: {
          name: "سارة أحمد",
          role: "مهندسة Frontend أولى",
          specialty: "تطوير الويب",
          experience: "أكثر من 8 سنوات من الخبرة",
        },

        mohamed: {
          name: "محمد علي",
          role: "مهندس Backend وأنظمة",
          specialty: "تطوير Backend",
          experience: "أكثر من 10 سنوات من الخبرة",
        },

        nour: {
          name: "نور حسن",
          role: "مهندسة ذكاء اصطناعي وتعلم آلي",
          specialty: "الذكاء الاصطناعي",
          experience: "أكثر من 7 سنوات من الخبرة",
        },

        omar: {
          name: "عمر خالد",
          role: "مصمم منتجات وتجربة مستخدم",
          specialty: "تصميم المنتجات",
          experience: "أكثر من 9 سنوات من الخبرة",
        },
      },

      // =========================
      // CTA
      // =========================
      cta: {
        eyebrow: "ابدأ رحلتك",
        titleLine1: "هل أنت مستعد لبدء",
        titleLine2: "التعلّم؟",
        description:
          "طوّر مهارات عملية، واعمل على مشاريع ذات قيمة، وتعلّم من أشخاص يمتلكون خبرة حقيقية في المجال.",
        button: "ابدأ التعلّم",
        supportingText: "تعلّم · طبّق · ابنِ · تطوّر",
      },

      // =========================
      // FOOTER
      // =========================
      footer: {
        description:
          "منصة تعليمية عملية تساعدك على بناء مهارات حقيقية والعمل على مشاريع مفيدة والتطور بثقة.",
        platform: "المنصة",
        courses: "الدورات",
        learningPaths: "المسارات التعليمية",
        company: "الشركة",
        about: "من نحن",
        contact: "تواصل معنا",
        resources: "المصادر",
        startLearning: "ابدأ التعلم",
        copyright: "© 2026 منصة LMS. جميع الحقوق محفوظة.",
        tagline: "تعلّم · طبّق · ابنِ · تطوّر",
      },
      // =========================
      // CONTACT
      // =========================
      contact: {
        hero: {
          badge: "تواصل معنا",
          title: "لنَبْنِ فرصتك",
          titleHighlight: "القادمة معًا.",
          description:
            "لديك سؤال، فكرة، أو تحتاج إلى المساعدة للبدء؟ تواصل مع فريقنا وسنسعد بمساعدتك.",
          button: "إرسال استفسار",
          trust: "نحن هنا لمساعدتك على المضي قدمًا.",
        },

        form: {
          badge: "تواصل معنا",
          title: "أرسل لنا رسالة",
          description:
            "لديك سؤال أو تحتاج إلى مزيد من المعلومات؟ املأ النموذج وسيتواصل معك فريقنا قريبًا.",

          name: "الاسم",
          namePlaceholder: "أدخل اسمك",

          email: "البريد الإلكتروني",
          emailPlaceholder: "أدخل بريدك الإلكتروني",

          subject: "الموضوع",
          subjectPlaceholder: "ما موضوع رسالتك؟",

          message: "الرسالة",
          messagePlaceholder: "اكتب رسالتك...",

          maxCharacters: "الحد الأقصى 1000 حرف",

          send: "إرسال الرسالة",
          sending: "جاري الإرسال...",

          success: "تم إرسال رسالتك بنجاح.",
          error: "حدث خطأ ما. يرجى المحاولة مرة أخرى.",
        },

        validation: {
          nameRequired: "الاسم مطلوب",
          nameMin: "يجب أن يكون الاسم حرفين على الأقل",
          nameMax: "لا يمكن أن يزيد الاسم عن 50 حرفًا",
          nameInvalid:
            "يمكن أن يحتوي الاسم على حروف ومسافات وعلامات اقتباس وشرطات فقط",

          emailRequired: "البريد الإلكتروني مطلوب",
          emailInvalid: "يرجى إدخال بريد إلكتروني صحيح",
          emailMax: "لا يمكن أن يزيد البريد الإلكتروني عن 254 حرفًا",

          subjectRequired: "الموضوع مطلوب",
          subjectMin: "يجب أن يكون الموضوع 3 أحرف على الأقل",
          subjectMax: "لا يمكن أن يزيد الموضوع عن 100 حرف",

          messageRequired: "الرسالة مطلوبة",
          messageMin: "يجب أن تكون الرسالة 10 أحرف على الأقل",
          messageMax: "لا يمكن أن تزيد الرسالة عن 1000 حرف",
        },
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("language") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
