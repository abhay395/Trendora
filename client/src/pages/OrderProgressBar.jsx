
import { User, Flag, UserPlus, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function OrderProgressBar() {
  const steps = [
    { title: "Your details", desc: "Name and email", icon: <User className="z-99" />, status: "completed" },
    { title: "Company details", desc: "Website and location", icon: <Flag />, status: "current" },
    { title: "Invite your team", desc: "Start collaborating", icon: <UserPlus />, status: "upcoming" },
    { title: "Add your socials", desc: "Automatic sharing", icon: <Sparkles />, status: "upcoming" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between relative bg-transparent">
        {/* Line connecting steps */}
        <div className="absolute top-5 left-0 right-0 h-[2px] -z-10 bg-gray-200 " />
        <div className="absolute top-5 left-0 h-[2px] bg-black -z-10 " style={{ width: "40%" }} />
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center z-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div
              className={`p-2 rounded-md border-2   ${step.status === "current" || step.status === "completed"
                ? "border-black text-black"
                : "border-gray-200 text-gray-400"
                }`}
            >
              {step.icon}
            </div>
            <h3
              className={`mt-3 font-semibold text-sm  ${step.status === "current" || step.status === "completed"
                ? "text-black"
                : "text-gray-400"
                }`}
            >
              {step.title}
            </h3>
            <p className="text-xs text-gray-400">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
