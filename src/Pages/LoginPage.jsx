import FloatingLogos from "../Components/FloatingLogos";
import CurvedLines from "../Components/CurvedLines";

export default function LoginPage() {
  return (
    <div>
      <div className="relative w-full h-screen bg-black text-white flex items-center justify-center overflow-hidden">
        <FloatingLogos />
        <CurvedLines />

        <h1 className="text-4xl font-bold z-10">Welcome to My App 🚀</h1>
      </div>
    </div>
  );
}
