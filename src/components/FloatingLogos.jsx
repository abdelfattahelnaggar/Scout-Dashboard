// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import logo from "../assets/logo.webp";

export default function FloatingLogos() {
  const logos = Array.from({ length: 6 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {logos.map((_, i) => {
        const top = Math.random() * 75 + "%";
        const left = Math.random() * 100 + "%";
        
        const delay = Math.random() * 5;
        
        const size = 60 + Math.random() * 50; 
        
        const baseOpacity = 0.15 + Math.random() * 0.9; 
        
        const yMovement = 30 + Math.random() * 50; 
        const xMovement = -20 + Math.random() * 40; 
        const zMovement = -10 + Math.random() * 20;
        const duration = 8 + Math.random() * 6; 
        const rotateAmount = Math.random() > 0.5 ? 360 : -360;

        return (
          <motion.img
            key={i}
            src={logo}
            alt="app-logo"
            className="absolute blur-[0.5px]"
            style={{ 
              top, 
              left,
              width: `${size}px`,
              height: `${size}px`,
            }}
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              y: [0, -yMovement, 0],
              x: [0, xMovement, 0],
              z: [0, zMovement, 0],
              rotate: [0, rotateAmount],
              opacity: [baseOpacity, baseOpacity * 1.5, baseOpacity],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}
