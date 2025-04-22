// MultiStepLoader.tsx
'use client'
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingState {
  text: string;
}

interface CheckIconProps {
  className?: string;
  level?: 1 | 2 | 3;
}

interface LoaderCoreProps {
  loadingStates: LoadingState[];
  value?: number;
}

interface MultiStepLoaderProps {
  loadingStates: LoadingState[];
  loading: boolean;
  duration?: number;
  loop?: boolean;
}

const CheckIcon = ({ className, level = 1 }: CheckIconProps) => {
  const getColorClass = () => {
    switch (level) {
      case 1: return "text-white";
      case 2: return "text-orange-500";
      case 3: return "text-black";
      default: return "text-white";
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", getColorClass(), className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className, level = 1 }: CheckIconProps) => {
  const getColorClass = () => {
    switch (level) {
      case 1: return "text-white";
      case 2: return "text-orange-500";
      case 3: return "text-black";
      default: return "text-white";
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", getColorClass(), className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

const LoaderCore = ({ loadingStates, value = 0 }: LoaderCoreProps) => {
  const getLevel = (index: number): 1 | 2 | 3 => {
    const totalStates = loadingStates.length;
    if (index < totalStates / 3) return 1;
    if (index < (totalStates / 3) * 2) return 2;
    return 3;
  };

  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col mt-40">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);
        const level = getLevel(index);
        
        return (
          <motion.div
            key={index}
            className={cn("text-left flex gap-2 mb-4")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center">
              {index > value && (
                <CheckIcon level={level} />
              )}
              {index <= value && (
                <CheckFilled level={level} />
              )}
            </div>
            <span
              className={cn(
                level === 1 && "text-white",
                level === 2 && "text-orange-500",
                level === 3 && "text-black",
                value === index && "opacity-100",
                value !== index && "opacity-70"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates = [
    // Level 1 - Initial validation (White)
    { text: "Initializing submission process..." },
    { text: "Validating form data..." },
    // Level 2 - Processing (Orange)
    { text: "Processing company information..." },
    { text: "Updating business registry..." },
    { text: "Generating confirmation details..." },
    // Level 3 - Finalizing (Black)
    { text: "Running final checks..." },
    { text: "Saving to secure database..." },
    { text: "Completing registration..." }
  ],
  loading,
  duration = 2000,
  loop = true
}: MultiStepLoaderProps) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }

    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/30"
        >
          <div className="h-96 relative">
            <LoaderCore value={currentState} loadingStates={loadingStates} />
          </div>
          <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-black/80 h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MultiStepLoader;