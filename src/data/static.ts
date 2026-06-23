import { Project } from "@/components/project-detail-modal";

export const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind",
    "Vue",
    "Node",
    "Laravel",
    "Inertia",
    "PHP",
    "Java",
    "C++",
    "HTML",
    "CSS",
];

export const profileDetails = [
    { label: "School", value: "Mater Dei College" },
    { label: "Course", value: "Bachelor of Science in Information Technology" },
    { label: "Graduated", value: "April 2026 - Cum Laude" },
    { label: "Location", value: "Bohol, Philippines" },
    { label: "Email", value: "jefbay110@gmail.com" },
    { label: "Availability", value: "Open to internships / junior roles" },
];

export const projects: Project[] = [
    {
        title: "Eventory",
        stack: ["Inertia", "Tailwind", "Vue", "Laravel", "MySQL"],
        githubLink: "https://github.com/iLoveForLoop/final-capstone.git",

        description:
            "A centralized event management system that streamlines event planning, scheduling, and coordination, making it easier to organize and track events.",
        longDescription:
            "Eventory was designed to solve the complexity of large-scale event organization by offering structured scheduling, vendor coordination sheets, and role-based planner permissions in a centralized workspace. It features full reactive client rendering via Vue and a Laravel-powered robust database layer.",
        features: [
            "Custom interactive calendar scheduler with drag-and-drop mechanics.",
            "Real-time vendor tracking and coordination panel.",
            "Role-based access controls for organizers, managers, and assistants.",
            "Dynamic data export capabilities for PDF schedules and Excel vendor sheets."
        ]
    },
    {
        title: "Report Submission System",
        stack: ["Inertia", "Laravel", "React", "Typescript", "MySQL"],
        liveLink: "https://report-submission.dilgbohol.com/",
        githubLink: "https://github.com/iLoveForLoop/report-submission-system.git",

        description:
            "A centralized report management system that streamlines submission, tracking, and approval processes while reducing errors and improving transparency for better decision-making.",
        longDescription:
            "Built specifically for government administrative reporting, this platform automates the pipeline from local field submissions to regional administrative analysis. It features visual compliance dashboards, validation filters, and notifications that prevent late submissions.",
        features: [
            "Interactive compliance map showing submission status across branches.",
            "Excel-like inline report review interface using React spreadsheet features.",
            "Custom automated reminders and late-alert email notification queues.",
            "Highly secure, role-based audit trail tracking all document edits."
        ]
    },
    {
        title: "Puhon",
        stack: ["Mongo DB", "React", "Node", "Typescript", "Express"],
        liveLink: "https://puhonnn.vercel.app/",
        githubLink: "https://github.com/iLoveForLoop/puhon-time-capsule.git",
        description:
            "An encrypted time capsule platform that allows users to preserve personal messages and revisit them at a scheduled moment in the future.",
        longDescription:
            "Puhon translates the concept of physical time capsules into a secure digital environment. Messages, photos, and digital milestones are encrypted and safely stored, locked until the target release timestamp. The UI/UX emphasizes a nostalgic, calming aesthetic with rich custom micro-animations.",
        features: [
            "End-to-end client-side encryption of stored messages before database insertion.",
            "Automated cron-scheduler that unlocks vaults exactly on the target release date.",
            "Polished aesthetic with dark-mode optimizations and micro-animations.",
            "Secure magic-link authorization to retrieve capsules safely."
        ]
    },
    {
        title: "TickIt",
        stack: ["Inertia", "Vue", "Laravel", "Tailwind"],
        githubLink: "https://github.com/iLoveForLoop/inertia-ticket-generator.git",
        description:
            "A modern event ticketing solution featuring QR code generation, real-time scanning, and bulk ticket distribution designed to enhance security and simplify event entry management.",
        longDescription:
            "TickIt provides an all-in-one ticketing flow from checkout to event entrance. It generates cryptographically signed QR codes sent via dynamic emails, which are then scanned by event staff through a responsive scan portal with rapid feedback.",
        features: [
            "Cryptographically signed, tamper-proof QR code generator for attendees.",
            "High-speed mobile web app scanner with real-time ticket validation.",
            "Bulk seat assignment and customizable ticket layout designer.",
            "Comprehensive sales charts and transaction metrics dashboard."
        ]
    },
    {
        title: "Mediqueue",
        stack: ["Vue", "Tailwind", "Inertia", "Laravel"],
        githubLink: "https://github.com/iLoveForLoop/inertia-queue-management.git",

        description:
            "A digital queuing solution for pharmacies that streamlines patient flow, reduces waiting times, and provides real-time notifications for a smoother experience.",
        longDescription:
            "Mediqueue was created to solve crowded waiting areas in clinics and pharmacies. It provides dynamic queue token generation, real-time queue boards visible on lobby screens, and SMS status updates to let patients wait comfortably outside.",
        features: [
            "Dynamic queue status boards with voice synthesis announcements.",
            "Integrated SMS API notifications alerting patients when their turn is near.",
            "Smart triage category queues separating prescriptions and general inquiries.",
            "Analytics engine tracking daily average patient service time."
        ]
    },
    {
        title: "Rants",
        stack: ["Vue", "Node", "Express", "Firebase"],
        githubLink: "https://github.com/iLoveForLoop/vue-blog-platform.git",
        description:
            "A sleek social media interface inspired by Instagram and Threads, showcasing a responsive feed, posts, and modern UI design.",
        longDescription:
            "Rants is a modern social playground focusing on fast interactivity, nested discussion threads, and real-time feed updates. It mimics design choices from top-tier microblogging platforms, utilizing Firebase for lightning-fast database listening.",
        features: [
            "Real-time nested comments and message boards with instant sync.",
            "Double-tap micro-interactions for post liking and saving animations.",
            "Optimistic client rendering ensuring posts are displayed instantly.",
            "Media upload pipeline with responsive layouts for text, image, or links."
        ]
    }
];