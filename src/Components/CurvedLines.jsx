export default function CurvedLines() {
    return (
      <svg
        className="absolute bottom-0 w-full opacity-60"
        viewBox="0 0 1440 320"
      >
        <path
          fill="none"
          stroke="white"
          strokeWidth="2"
          d="M0,256 C480,320 960,160 1440,256"
        />
        <path
          fill="none"
          stroke="white"
          strokeWidth="1"
          opacity="0.5"
          d="M0,280 C480,340 960,180 1440,280"
        />
      </svg>
    );
  }
  