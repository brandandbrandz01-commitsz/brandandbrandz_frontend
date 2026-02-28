import JobDetailsClient from "@/components/job-details-client";

// Mock Data - In a real app, fetch based on ID or slug
const jobData: Record<string, any> = {
    "1": {
        title: "Digital Marketing Specialist",
        location: "Remote, India",
        type: "Internship",
        salary: "Performance based",
        description: "We're looking for a Digital Marketing Specialist who can plan and execute SEO, ads, and content campaigns to grow brand visibility and drive measurable results.",
        lookingFor: [
            "Pursuing or recently completed an MBA, PGDM, or related field in Marketing/Business/PR.",
            "Strong communication, presentation, and stakeholder management skills.",
            "Passion for creativity in campaigns and content.",
            "Basic knowledge of social media, SEO, Google Analytics, LinkedIn & CRM tools is a plus.",
            "Strategic thinker with problem-solving abilities and a growth mindset."
        ],
        responsibilities: [
            "Assist in planning and executing digital and social media marketing campaigns.",
            "Support in preparing marketing collateral, proposals, and case studies.",
            "Conduct market and competitor research to identify new opportunities.",
            "Coordinate with the sales team for lead generation initiatives.",
            "Track performance metrics and help optimize campaigns."
        ]
    },
    "2": {
        title: "Business Development Intern",
        location: "Remote, India",
        type: "Internship",
        salary: "Performance based",
        description: "We're looking for a Business Development Intern who is motivated to learn how companies grow by building strategic client relationships.",
        lookingFor: [
            "Pursuing or recently completed an MBA, PGDM, or related field in Marketing/Business/PR.",
            "Strong communication, presentation, and stakeholder management skills.",
            "Passion for creativity in campaigns and content.",
            "Basic knowledge of social media, SEO, Google Analytics, LinkedIn & CRM tools is a plus.",
            "Strategic thinker with problem-solving abilities and a growth mindset."
        ],
        responsibilities: [
            "Assist in planning and executing digital and social media marketing campaigns.",
            "Support in preparing marketing collateral, proposals, and case studies.",
            "Conduct market and competitor research to identify new opportunities.",
            "Coordinate with the sales team for lead generation initiatives.",
            "Track performance metrics and help optimize campaigns."
        ]
    },
    "3": {
        title: "Graphic Design Intern",
        location: "Remote, India",
        type: "Internship",
        salary: "Performance based",
        description: "Create high-impact visual content and brand assets that capture attention and communicate our core message across all digital platforms.",
        lookingFor: [
            "Proficient in Adobe Creative Suite (Photoshop, Illustrator) or Figma/Canva.",
            "Strong eye for typography, color theory, and layout composition.",
            "Ability to translate creative briefs into engaging visual stories."
        ],
        responsibilities: [
            "Design social media graphics, email templates, and marketing banners.",
            "Develop branding assets and presentation decks for client proposals.",
            "Collaborate with the marketing team to ensure visual brand consistency."
        ]
    },
    "4": {
        title: "UI/UX Design Intern",
        location: "Remote, India",
        type: "Internship",
        salary: "Performance based",
        description: "Craft seamless user journeys and intuitive interfaces by blending aesthetic excellence with user-centric research and wireframing.",
        lookingFor: [
            "Strong understanding of user-centered design principles and wireframing.",
            "Experience with Figma, Adobe XD, or Sketch.",
            "A portfolio demonstrating problem-solving through design."
        ],
        responsibilities: [
            "Create low and high-fidelity wireframes, prototypes, and user flows.",
            "Conduct user research and usability testing to improve existing products.",
            "Work closely with developers to ensure design feasibility and pixel-perfect implementation."
        ]
    },
    "5": {
        title: "Full Stack Development Intern",
        location: "Remote, India",
        type: "Internship",
        salary: "Performance based",
        description: "Build and maintain scalable web applications by working across the front-end and back-end to deliver robust, high-performance features.",
        lookingFor: [
            "Knowledge of HTML, CSS, and JavaScript.",
            "Familiarity with frameworks like React, Node.js, or similar stacks.",
            "Basic understanding of databases (SQL/NoSQL) and version control (Git)."
        ],
        responsibilities: [
            "Assist in developing responsive front-end components and back-end APIs.",
            "Debug and troubleshoot issues across the entire application stack.",
            "Write clean, maintainable code and document technical specifications."
        ]
    },
    "6": {
        title: "AI/ML Intern",
        location: "Remote, India",
        type: "Internship",
        salary: "Performance based",
        description: "Leverage data-driven insights and machine learning models to build intelligent solutions and automate complex business processes.",
        lookingFor: [
            "Strong foundation in Python and libraries like Pandas, NumPy, or Scikit-Learn.",
            "Basic understanding of neural networks and data preprocessing techniques.",
            "Curiosity for Large Language Models (LLMs) and prompt engineering."
        ],
        responsibilities: [
            "Assist in training, testing, and fine-tuning machine learning models.",
            "Analyze large datasets to extract actionable insights for business growth.",
            "Research and implement AI-driven features to automate internal workflows."
        ]
    },
    "7": {
        title: "Senior Business Development Manager",
        location: "Onsite",
        type: "Full-Time",
        salary: "Highly Competitive + Rewards",
        description: "We are looking for a results-driven Business Development Professional who understands growth, revenue, and market expansion — not just follow-ups and calls. This role is not just sales. You will be directly involved in marketing strategy, partnerships, revenue planning, and brand positioning.",
        lookingFor: [
            "4–5+ years of proven experience in Business Development.",
            "Strong understanding of marketing + sales alignment.",
            "Track record of achieving revenue targets.",
            "Excellent communication & negotiation skills.",
            "Ability to take ownership and deliver results.",
            "Why Join Us? Direct involvement in strategic decisions, Growth-focused environment, Opportunity to shape business expansion, Performance-driven rewards."
        ],
        responsibilities: [
            "Lead revenue growth and client acquisition.",
            "Identify new business opportunities and partnerships.",
            "Work closely with the marketing team on campaigns and positioning.",
            "Develop strategic growth plans.",
            "Handle high-value negotiations and closures.",
            "Build and manage long-term client relationships."
        ]
    }
};

export function generateStaticParams() {
    return Object.keys(jobData).map((id) => ({ id }));
}

export default async function JobDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const job = jobData[resolvedParams.id];
    return <JobDetailsClient job={job} />;
}
