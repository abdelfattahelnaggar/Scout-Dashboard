export default function CurvedLines() {
    return (
      <svg
        className="absolute bottom-0 w-full opacity-60 pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-slate-900 dark:text-gray-300"
          d="M -150 25 C 102 500 350 1 2100 400"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
          className="text-slate-900 dark:text-gray-400"
          d="M0,80 C300,390 1200,300 1500,200"
        />
      </svg>
    );
  }
  