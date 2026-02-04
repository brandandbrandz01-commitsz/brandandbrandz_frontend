import { OPEN_POSITIONS } from "../data";
import { CareerDetails } from "@/components/career-details";

export function generateStaticParams() {
    return OPEN_POSITIONS.map((job) => ({
        id: job.id,
    }));
}

export default async function CareerDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const jobData = OPEN_POSITIONS.find((job) => job.id === id);
    if (!jobData) {
        return <div>Job not found</div>;
    }

    return (
        <CareerDetails jobData={jobData} />
    );
}
