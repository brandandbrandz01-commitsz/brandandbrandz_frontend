"use client";

import { Raleway } from "next/font/google";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { User, Briefcase, CheckCircle, Clock, FileText, ExternalLink, Filter, Search, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const raleway = Raleway({
    weight: ["400", "500", "600", "700", "800"],
    subsets: ["latin"],
});

export default function AdminDashboard() {
    const [applications, setApplications] = useState<any[]>([]);
    const [filteredApps, setFilteredApps] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [roleFilter, setRoleFilter] = useState("All Roles");
    const [searchQuery, setSearchQuery] = useState("");

    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    useEffect(() => {
        let result = applications;

        // Filter by Role
        if (roleFilter !== "All Roles") {
            result = result.filter(app => app.jobTitle === roleFilter);
        }

        // Search by Name or Email
        if (searchQuery) {
            result = result.filter(app =>
                `${app.firstName} ${app.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.email.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredApps(result);
    }, [roleFilter, searchQuery, applications]);

    const fetchApplications = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/applications");
            const data = await response.json();
            if (Array.isArray(data)) {
                setApplications(data);
                setFilteredApps(data);
            } else {
                console.error("API did not return an array:", data);
                setApplications([]);
                setFilteredApps([]);
            }
        } catch (error) {
            console.error("Failed to fetch applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const uniqueRoles = ["All Roles", ...new Set(applications.map(app => app.jobTitle))];

    const stats = [
        {
            title: "Total Applications",
            value: applications.length,
            icon: User,
            color: "text-blue-400",
            bg: "bg-blue-400/10"
        },
        {
            title: "Recently Applied",
            value: applications.filter((a: any) => {
                const oneDayAgo = new Date();
                oneDayAgo.setDate(oneDayAgo.getDate() - 1);
                return new Date(a.createdAt) > oneDayAgo;
            }).length,
            icon: Clock,
            color: "text-amber-400",
            bg: "bg-amber-400/10"
        },
        {
            title: "Reviewed",
            value: applications.filter((a: any) => a.status === 'reviewed').length,
            icon: CheckCircle,
            color: "text-emerald-400",
            bg: "bg-emerald-400/10"
        }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-xl animate-pulse">Loading Admin Panel...</div>
            </div>
        );
    }

    return (
        <div className={cn("min-h-screen bg-[#050505] text-white p-4 sm:p-8 lg:p-12", raleway.className)}>
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold tracking-widest uppercase">
                            <span className="w-8 h-[1px] bg-blue-400"></span>
                            Admin Portal
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                            Brand & Brandz <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 font-light">Applications</span>
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-sky-400 flex items-center justify-center font-bold text-black italic">
                            BB
                        </div>
                        <div>
                            <div className="text-sm font-semibold">Brand Admin</div>
                            <div className="text-xs text-white/40 italic">Secure Access Only</div>
                        </div>
                    </div>
                </header>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="bg-white/5 border-white/10 text-white backdrop-blur-xl hover:border-white/20 transition-all duration-300 group overflow-hidden relative">
                                <div className={cn("absolute top-0 right-0 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40", stat.bg)} />
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-sm font-medium text-white/60 tracking-wider uppercase">{stat.title}</CardTitle>
                                    <div className={cn("p-2.5 rounded-xl border border-white/5", stat.bg)}>
                                        <stat.icon className={cn("w-5 h-5", stat.color)} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-4xl font-bold tracking-tighter">{stat.value}</div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Filters & Search */}
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-end lg:items-center bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="flex flex-wrap gap-4 items-center w-full lg:w-auto">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Filter className="w-4 h-4 text-white/40 shrink-0" />
                            <select
                                className="bg-black/40 border border-white/10 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all cursor-pointer w-full sm:w-auto"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                            >
                                {uniqueRoles.map(role => (
                                    <option key={role} value={role} className="bg-neutral-900">{role}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applications Table */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="p-6 font-semibold text-xs text-white/40 uppercase tracking-widest text-center w-16">#</th>
                                    <th className="p-6 font-semibold text-xs text-white/40 uppercase tracking-widest">Applicant Details</th>
                                    <th className="p-6 font-semibold text-xs text-white/40 uppercase tracking-widest text-center">Resume & Files</th>
                                    <th className="p-6 font-semibold text-xs text-white/40 uppercase tracking-widest">Applied Role</th>
                                    <th className="p-6 font-semibold text-xs text-white/40 uppercase tracking-widest text-center w-32">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <AnimatePresence mode="popLayout">
                                    {filteredApps.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="p-20 text-center text-white/20 italic text-lg">
                                                No matching applications found.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredApps.map((app: any, index: number) => (
                                            <motion.tr
                                                layout
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                key={app.id}
                                                onClick={() => {
                                                    setSelectedApp(app);
                                                    setIsDetailsOpen(true);
                                                }}
                                                className="hover:bg-white/[0.03] transition-colors group cursor-pointer"
                                            >
                                                <td className="p-6 text-center text-white/20 font-mono text-sm">
                                                    {String(index + 1).padStart(2, '0')}
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-white group-hover:text-blue-400 transition-colors text-lg">
                                                            {app.firstName} {app.lastName}
                                                        </span>
                                                        <span className="text-sm text-white/40">{app.email}</span>
                                                        <span className="text-xs text-white/30 mt-1 italic">
                                                            Applied {format(new Date(app.createdAt), "MMM dd, hh:mm a")}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-col gap-2 items-center">
                                                        {app.resumeUrl ? (
                                                            <a
                                                                href={`http://localhost:5000/uploads/${app.resumeUrl}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-blue-600/10 to-blue-500/5 border border-blue-500/20 rounded-xl text-blue-400 text-sm hover:from-blue-600/20 hover:border-blue-500/40 transition-all w-full justify-center"
                                                            >
                                                                <FileText className="w-4 h-4" />
                                                                <span className="font-semibold">View Resume</span>
                                                                <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        ) : (
                                                            <span className="text-xs text-white/20">No Resume</span>
                                                        )}

                                                        {app.otherDocsUrl && (
                                                            <a
                                                                href={`http://localhost:5000/uploads/${app.otherDocsUrl}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs hover:bg-white/10 transition-all w-full justify-center"
                                                            >
                                                                <Download className="w-3 h-3" />
                                                                <span>Other Docs</span>
                                                            </a>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="flex items-center gap-2 text-white/90">
                                                            <Briefcase className="w-4 h-4 text-blue-400" />
                                                            <span className="font-semibold">{app.jobTitle}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className={cn(
                                                                "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                                                                app.jobType === 'Internship' ? "bg-purple-500/10 text-purple-400 border border-purple-500/20" : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                                                            )}>
                                                                {app.jobType}
                                                            </span>
                                                            <span className="text-xs text-white/30 truncate max-w-[150px]">
                                                                Experience: {app.experience || 'Fresher'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-6">
                                                    <div className="flex justify-center">
                                                        <span className={cn(
                                                            "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-lg",
                                                            app.status === 'pending' ? "bg-amber-500/5 text-amber-500 border-amber-500/20 shadow-amber-500/5" :
                                                                app.status === 'reviewed' ? "bg-blue-500/5 text-blue-500 border-blue-500/20 shadow-blue-500/5" :
                                                                    "bg-emerald-500/5 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5"
                                                        )}>
                                                            {app.status}
                                                        </span>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>

            {/* Details Modal */}
            <AnimatePresence>
                {isDetailsOpen && selectedApp && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl relative"
                        >
                            <div className="p-8 space-y-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-3xl font-bold text-white tracking-tight">{selectedApp.firstName} {selectedApp.lastName}</h2>
                                        <div className="flex items-center gap-3 mt-2">
                                            <span className="text-blue-400 font-semibold">{selectedApp.jobTitle}</span>
                                            <span className="w-1 h-1 rounded-full bg-white/20"></span>
                                            <span className="text-white/40">{selectedApp.jobType}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsDetailsOpen(false)}
                                        className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
                                    >
                                        <ExternalLink className="w-6 h-6 rotate-45" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Contact Info</p>
                                            <p className="text-white text-base font-medium">{selectedApp.email}</p>
                                            <p className="text-white/60">{selectedApp.phone}</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Experience</p>
                                            <p className="text-white text-base font-medium">{selectedApp.experience || 'Not specified'} Years</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Current/Previous Company</p>
                                            <p className="text-white text-base font-medium">{selectedApp.currentCompany || 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div className="space-y-1.5">
                                            <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Preferred Interview</p>
                                            <div className="flex items-center gap-2 text-white text-base font-medium">
                                                <Clock className="w-4 h-4 text-blue-400" />
                                                <span>
                                                    {selectedApp.interviewDate ? format(new Date(selectedApp.interviewDate), "MMM dd, yyyy") : 'N/A'}
                                                </span>
                                            </div>
                                            <p className="text-white/60 ml-6">{selectedApp.interviewTime || 'N/A'}</p>
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">LinkedIn Profile</p>
                                            {selectedApp.linkedinUrl ? (
                                                <a href={selectedApp.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors group/link">
                                                    <span>View Profile</span>
                                                    <ExternalLink className="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                                </a>
                                            ) : (
                                                <p className="text-white/20">Not provided</p>
                                            )}
                                        </div>
                                        <div className="space-y-1.5">
                                            <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Applied On</p>
                                            <p className="text-white/60">{format(new Date(selectedApp.createdAt), "MMMM dd, yyyy • hh:mm a")}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-white/30 uppercase tracking-[0.2em] text-[10px] font-black">Cover Letter</p>
                                    <div className="bg-white/[0.03] border border-white/10 p-5 rounded-2xl text-white/70 leading-relaxed text-sm italic shadow-inner">
                                        {selectedApp.coverLetter || "No cover letter provided."}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-6">
                                    {selectedApp.resumeUrl && (
                                        <a
                                            href={`http://localhost:5000/uploads/${selectedApp.resumeUrl}`}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                                        >
                                            <Download className="w-5 h-5" />
                                            Download Resume
                                        </a>
                                    )}
                                    {selectedApp.otherDocsUrl && (
                                        <a
                                            href={`http://localhost:5000/uploads/${selectedApp.otherDocsUrl}`}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all active:scale-[0.98]"
                                        >
                                            <Download className="w-5 h-5" />
                                            Other Docs
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
