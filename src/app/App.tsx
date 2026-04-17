import { useState } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Hash, Send, Music, Instagram } from 'lucide-react';
import logoImage from "../imports/image.png";

// Componente de partículas flotantes
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: `radial-gradient(circle, ${i % 2 === 0 ? '#FFD700' : '#FF8C00'}, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Componente de rayos de tormenta
const LightningBolt = ({ delay = 0 }: { delay?: number }) => {
  const startX = Math.random() * 100;
  const segments = 6;

  // Generar puntos del rayo en zigzag
  const generatePath = () => {
    let path = `M ${startX} 0`;
    let currentX = startX;

    for (let i = 1; i <= segments; i++) {
      const y = (100 / segments) * i;
      const offsetX = (Math.random() - 0.5) * 15;
      currentX += offsetX;
      path += ` L ${currentX} ${y}`;
    }

    return path;
  };

  return (
    <motion.svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 1, 0, 0],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 6,
        delay: delay,
        times: [0, 0.1, 0.2, 0.3, 1],
      }}
    >
      <motion.path
        d={generatePath()}
        stroke="url(#lightning-gradient)"
        strokeWidth="0.3"
        fill="none"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: [0, 1, 1, 1, 1],
        }}
        transition={{
          duration: 0.4,
          repeat: Infinity,
          repeatDelay: 4 + Math.random() * 6,
          delay: delay,
          times: [0, 0.15, 0.2, 0.3, 1],
        }}
      />
      <defs>
        <linearGradient id="lightning-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFA500" stopOpacity="1" />
          <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
    </motion.svg>
  );
};

// Componente de flash de luz cuando hay rayos
const LightningFlash = ({ delay = 0 }: { delay?: number }) => {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(ellipse at top, rgba(255, 215, 0, 0.15), transparent 50%)',
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.8, 0.3, 0.9, 0, 0],
      }}
      transition={{
        duration: 0.4,
        repeat: Infinity,
        repeatDelay: 4 + Math.random() * 6,
        delay: delay,
        times: [0, 0.1, 0.15, 0.2, 0.3, 1],
      }}
    />
  );
};

// Componente de botón social
interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color?: string;
}

const SocialButton = ({ icon, label, href, color = '#FFD700' }: SocialButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="relative bg-gradient-to-br from-zinc-900 to-black border-2 rounded-2xl px-8 py-4 overflow-hidden transition-all duration-300"
        style={{
          borderColor: isHovered ? color : 'rgba(255, 215, 0, 0.3)',
          boxShadow: isHovered ? `0 0 30px ${color}40, 0 0 60px ${color}20` : 'none',
        }}
      >
        {/* Efecto de brillo al hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at center, ${color}15, transparent 70%)`,
          }}
        />

        <div className="relative flex items-center gap-4">
          <motion.div
            animate={isHovered ? { rotate: [0, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
            style={{ color }}
          >
            {icon}
          </motion.div>
          <span className="font-rajdhani tracking-wide text-white" style={{ fontWeight: 600, fontSize: '1.1rem' }}>
            {label}
          </span>
        </div>

        {/* Línea de energía animada */}
        {isHovered && (
          <motion.div
            className="absolute bottom-0 left-0 h-0.5"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
    </motion.a>
  );
};

export default function App() {
  // IMPORTANTE: Aquí puedes cambiar los enlaces a tus redes sociales
  const socialLinks = {
 whatsappG1: "https://chat.whatsapp.com/Lp5UmOzkj6z759tEiIov4P",
    whatsappG2: "https://chat.whatsapp.com/FQNEF3ouyGq1dqoLA6tsfC",
    whatsappCanal: "https://whatsapp.com/channel/0029Vb2VBhg47XeC8mnXYg3m",
    discord: "https://discord.gg/Q7m4wuQH",
    tiktok: "https://www.tiktok.com/@amigosdelmundo?_t=zm-8twlldzj4qs&_r=1",
    instagram: "https://www.instagram.com/lukaa_ml/?hl=es-es",
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at top, #1a1a1a 0%, #0a0a0a 100%)',
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      {/* Efectos de tormenta eléctrica */}
      {[...Array(3)].map((_, i) => (
        <LightningBolt key={`bolt-${i}`} delay={i * 2} />
      ))}
      {[...Array(3)].map((_, i) => (
        <LightningFlash key={`flash-${i}`} delay={i * 2} />
      ))}

      {/* Partículas flotantes de fondo */}
      <FloatingParticles />

      {/* Efecto de brillo radial detrás del logo */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: 'radial-gradient(circle, #FFD700, #FF8C00, transparent)',
        }}
      />

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">

        {/* Logo Card Interactiva */}
        <motion.div
          className="relative mb-8 group cursor-pointer"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 1
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Glow exterior */}
          <motion.div
            className="absolute inset-0 rounded-full blur-2xl"
            style={{
              background: 'radial-gradient(circle, rgba(255, 215, 0, 0.4), rgba(255, 140, 0, 0.2), transparent)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Card container */}
          <motion.div
            className="relative rounded-3xl p-8 border-2 backdrop-blur-sm overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(10, 10, 10, 0.9))',
              borderColor: 'rgba(255, 215, 0, 0.3)',
            }}
            whileHover={{
              borderColor: 'rgba(255, 215, 0, 0.8)',
              boxShadow: '0 0 40px rgba(255, 215, 0, 0.4), 0 0 80px rgba(255, 140, 0, 0.2)',
            }}
          >
            {/* Efecto de brillo diagonal animado */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: 'linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%)',
              }}
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            />

            {/* Partículas alrededor del logo */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #FFD700, transparent)',
                  top: '50%',
                  left: '50%',
                }}
                animate={{
                  x: [0, Math.cos(i * 45 * Math.PI / 180) * 60],
                  y: [0, Math.sin(i * 45 * Math.PI / 180) * 60],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeOut",
                }}
              />
            ))}

            <img
              src={logoImage}
              alt="Logo Rayo"
              className="relative w-40 h-40 object-contain drop-shadow-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          className="mb-3 text-center"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          AMIGOS DEL MUNDO
        </motion.h1>

        <motion.div
  className="mb-2 max-w-2xl cursor-pointer rounded-2xl border px-6 py-4 backdrop-blur-md select-none"
  style={{
    background: 'linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(10, 10, 10, 0.8))',
    borderColor: 'rgba(255, 215, 0, 0.2)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 215, 0, 0.1)',
  }}
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.7 }}

  // ✨ Efecto táctil estilo botón
  whileHover={{ scale: 1.02, opacity: 0.95 }}
  whileTap={{ scale: 0.96, opacity: 0.8, transition: { duration: 0.05 } }}

  onClick={() => {
    console.log("Card clickeada");
  }}
>
  <p
    className="text-neutral-300 text-center leading-relaxed"
    style={{
      fontFamily: 'Poppins, sans-serif',
      fontWeight: 400, // ← suave, sin negrita
      textShadow: '0 0 8px rgba(255, 215, 0, 0.18)',
    }}
  >
    El mejor grupo de WhatsApp para amigar, armar joda, robar stickers,
    agregar contactos para ver estados y conocer gente nueva… incluso
    encontrar pareja si se da. Aquí siempre hay movimiento, conversación y buena vibra.

    Contamos con moderadores activos que mantienen el orden y una comunidad
    dinámica donde siempre tendrás con quién hablar. Además, incluimos bot
    #Nekos con funciones interactivas, juegos y dinámicas que hacen la
    experiencia mucho más entretenida.

    No es solo un grupo, es una comunidad en constante crecimiento donde
    conectar, divertirte y ser tú mismo. Únete y sé parte de Amigos del Mundo. 🌍⚡
  </p>
</motion.div>

        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="text-zinc-500" style={{ fontSize: '0.95rem' }}>
            #KoriumCollective (Organización KOR) - 2026
          </span>
        </motion.div>

        {/* Grid de enlaces sociales */}
        <motion.div
          className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 px-4"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <SocialButton
            icon={<MessageCircle size={35} strokeWidth={2.5} />}
            label="WhatsApp - Grupo 1"
            href={socialLinks.whatsappG1}
            color="#25D366"
          />

          <SocialButton
            icon={<MessageCircle size={35} strokeWidth={2.5} />}
            label="WhatsApp - Grupo 2"
            href={socialLinks.whatsappG2}
            color="#25D366"
          />

          <SocialButton
            icon={<Send size={35} strokeWidth={2.5} />}
            label="Canal Oficial"
            href={socialLinks.whatsappCanal}
            color="#FFD700"
          />

          <SocialButton
            icon={<Hash size={35} strokeWidth={2.5} />}
            label="Discord"
            href={socialLinks.discord}
            color="#5865F2"
          />

          <SocialButton
            icon={<Music size={35} strokeWidth={2.5} />}
            label="TikTok - Grupo"
            href={socialLinks.tiktok}
            color="#FF0050"
          />

          <SocialButton
            icon={<Instagram size={35} strokeWidth={2.5} />}
            label="Instagram - Grupo"
            href={socialLinks.instagram}
            color="#E4405F"
          />
        </motion.div>

        {/* Footer con efectos */}
        <motion.div
  className="mt-16 text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 1.2, duration: 0.8 }}
>
  <motion.div
    className="inline-block px-10 py-5 rounded-full border border-zinc-800 bg-black/40 backdrop-blur-sm cursor-pointer select-none"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => {
      console.log("click dev 👀"); // opcional, puedes quitarlo
    }}
  >
    <p
      className="text-zinc-400 font-medium"
      style={{ fontSize: '0.9rem' }}
    >
      Desarrollado por:{" "}
      <span className="text-yellow-400 font-semibold">
        Juan Camilo Mina
      </span>{" "}
      ⚡
    </p>
  </motion.div>
</motion.div>
      </div>

      {/* Líneas decorativas de energía en las esquinas */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-yellow-500/20 rounded-tl-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-orange-500/20 rounded-br-3xl" />
    </div>
  );
}

/*
  CÓMO AÑADIR MÁS BOTONES:

  1. Primero, agrega el nuevo enlace al objeto socialLinks (línea 94):
     nuevoEnlace: "TU_URL_AQUI",

  2. Luego, añade un nuevo componente SocialButton en el grid (después de la línea 198):
     <SocialButton
       icon={<TuIcono size={28} strokeWidth={2.5} />}
       label="Tu Etiqueta"
       href={socialLinks.nuevoEnlace}
       color="#TUCOLOR"
     />

  3. Importa el icono que necesites de lucide-react al inicio del archivo (línea 3)
     Puedes ver todos los iconos disponibles en: https://lucide.dev/icons

  Ejemplo para añadir Telegram:
  - Importar: import { Send } from 'lucide-react';
  - Agregar enlace: telegram: "https://t.me/tugrupo",
  - Agregar botón:
    <SocialButton
      icon={<Send size={28} strokeWidth={2.5} />}
      label="Telegram"
      href={socialLinks.telegram}
      color="#0088cc"
    />
*/
