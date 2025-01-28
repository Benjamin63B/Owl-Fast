import React, { ReactNode, useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./styles.css";
import { FaTiktok, FaTwitch, FaInstagram, FaYoutube, FaDiscord, FaDownload, FaCopy, FaInfo, FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface ComponentProps {
  children: ReactNode;
  className?: string;
}

interface Slide {
  image: string;
  message: string | JSX.Element; // Permet d'accepter une chaîne ou un élément JSX
}

const Carousel = ({ slides }: { slides: Slide[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel">
      <div className="carousel-image">
        <img src={slides[currentIndex].image} alt={`Slide ${currentIndex + 1}`} style={{ width: "100%", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", filter: "none" }} />
      </div>
      <div className="carousel-caption">
        <p>{slides[currentIndex].message}</p>
      </div>

      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-button">
          <FaChevronLeft className="icon" />
        </button>
        <button onClick={handleNext} className="carousel-button">
          <FaChevronRight className="icon" />
        </button>
      </div>
    </div>
  );
};

const Button = ({
  children,
  className,
  ...props
}: ComponentProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={`button ${className}`} {...props}>
    {children}
  </button>
);

const Navbar = ({ children, className }: ComponentProps) => (
  <nav className={`navbar ${className}`} style={{ transition: "background-color 0.3s, opacity 0.3s" }}>
    {children}
  </nav>
);

const NavbarBrand = ({ children }: ComponentProps) => (
  <div className="navbar-brand">
    <img src="./src/assets/OwlFast-Community.jpg" alt="Logo" className="navbar-logo" />
    {children}
  </div>
);

const NavbarContent = ({ children }: ComponentProps) => (
  <div className="navbar-right">{children}</div>
);

const NavbarItem = ({ children }: ComponentProps) => (
  <a className="navbar-item">{children}</a>
);

const Modal = ({ onClose }: { onClose: () => void }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2 className="text-center text-3xl font-bold mb-4">
        <FaInfo className="inline-block mr-2" /> Informations sur le Convoi
      </h2>
      <div className="mb-6">
        <p className="mb-4 text-yellow-500 flex items-center">
          Nom du Convoi : <strong className="ml-2">OwlFast Transport</strong>
          <button
            className="copy-button flex items-center ml-4"
            onClick={() => navigator.clipboard.writeText('OwlFast Transport')}
          >
            <FaCopy className="ml-2" />
          </button>
        </p>
        <p className="text-yellow-500 flex items-center">
          Mot de passe : <strong className="ml-2">13579</strong>
          <button
            className="copy-button flex items-center ml-4"
            onClick={() => navigator.clipboard.writeText('13579')}
          >
            <FaCopy className="ml-2" />
          </button>
        </p>
        <Button className="mt-4 mb-4">
          <a href="./src/download/steam_links.txt" download className="social-link">
            <FaDownload className="mr-2" /> Télécharger la liste des liens Steam
          </a>
        </Button>
      </div>
      <Button className="mt-4" onClick={onClose}>Fermer</Button>
    </div>
  </div>
);


const App = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);

  const [isLive, setIsLive] = useState(false);

  const slides: Slide[] = [
    { image: "./src/assets/installation/1.webp", message: "" },
    { image: "./src/assets/installation/2.webp", message: "" },
    { image: "./src/assets/installation/3.webp", message: "" },
    {
      image: "./src/assets/installation/4.webp",
      message: (
        <p className="font-bold">
          ATTENTION : Le mod compatibility <span className="text-red-500">Patch with Eugene</span> a été supprimer, il ne fonctionne plus.
        </p>
      ),
    },
    { image: "./src/assets/installation/5.webp", message: "" },
    { image: "./src/assets/installation/6.webp", message: "" },
    { image: "./src/assets/installation/7.webp", message: "" },
    { image: "./src/assets/installation/8.webp", message: "" },
    {
      image: "./src/assets/installation/9.webp",
      message: (
        <p className="font-bold">
          ATTENTION : Le mod compatibility <span className="text-red-500">50K ADDON</span> a été supprimer, ne pas l'inclure dans la liste.
        </p>
      ),
    },
    { image: "./src/assets/installation/10.webp", message: "" },
    {
      image: "./src/assets/installation/11.webp",
      message: (
        <p>
          Une fois terminer, vous devez avoir <span className="text-green-500 font-bold">94 mods</span> actifs sur votre session.
        </p>
      ),
    },
    {
      image: "./src/assets/owlfast_2.webp",
      message: (
        <p>
          <span className="text-red-500 font-bold">ATTENTION :</span> Vous ne pourrez pas acheter de camion au début. Il
          vous faut gagner de l'argent. Le plus rapide est de mettre un mod d'XP + argent tel que celui-ci.
        </p>
      ),
    },
    {
      image: "./src/assets/installation/12.webp",
      message: (
        <p>
          Une fois quelques millions sur votre compte, vous devrez retirer ce mod pour nous rejoindre.
        </p>
      ),
    },
    {
      image: "./src/assets/ETS2.png",
      message: (
        <p>
          Vous devez <span className="text-red-500 font-bold">IMPERATIVEMENT</span> modifier la ligne :<br />
          Dans le fichier <span className="text-red-500 font-bold">config.cfg</span> :<br />
          <span className="text-yellow-500 font-bold">Documents\ETS2\config.cfg</span> <br />
          <span className="text-green-500 font-bold">"buffer_page_size"</span> : <br />
          <span className="text-yellow-500 font-bold">"10"</span> <br />
          par <br />
          <span className="text-yellow-500 font-bold">"50"</span> <br />
          Sauvegarder le fichier !
        </p>
      ),
    },
    {
      image: "./src/assets/ETS2.png",
      message: (
        <p>
          Vous devez aussi modifier la ligne <br />
          <span className="text-red-500 font-bold">uset g_max_convoy_size</span> : <br />
          <span className="text-yellow-500 font-bold">"8"</span> <br />
          par <br />
          <span className="text-yellow-500 font-bold">"128"</span>, <br />
          Sauvegarder le fichier !
        </p>
      ),
    },
    {
      image: "./src/assets/ETS2.png",
      message: (
        <p>
          Vous devez aussi modifier la ligne <br />
          <span className="text-red-500 font-bold">g_max_convoy_size </span> : <br />
          <span className="text-yellow-500 font-bold">"8"</span> <br />
          par <br />
          <span className="text-yellow-500 font-bold">"128"</span>, <br />
          Sauvegarder le fichier !
        </p>
      ),
    },
    
  ];
  

  useEffect(() => {
    const checkTwitchStatus = async () => {
      try {
        const response = await fetch("https://api.twitch.tv/helix/streams?user_login=owlgametv", {
          headers: {
            "Client-ID": "YOUR_CLIENT_ID",
            Authorization: "Bearer YOUR_ACCESS_TOKEN",
          },
        });

        const data = await response.json();
        setIsLive(data.data && data.data.length > 0);
      } catch (error) {
        console.error("Error fetching Twitch status:", error);
      }
    };

    checkTwitchStatus();
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navbar */}
      <Navbar className={isScrolled ? "scrolled-navbar" : ""}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
          <NavbarBrand>
            <span style={{ fontSize: "1.5rem", textAlign: "center" }}><a href="/" style={{ fontSize: "1rem" }}>Team OwlFast - Transport</a></span>
          </NavbarBrand>
          <NavbarContent>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
              <NavbarItem>
                <a href="#about" style={{ fontSize: "1rem" }}>Qui je suis ?</a>
              </NavbarItem>
              <NavbarItem>
                <a href="#twith" style={{ fontSize: "1rem" }}>Live Twitch</a>
              </NavbarItem>
              <NavbarItem>
                <a href="#join" style={{ fontSize: "1rem" }}>OwlFast - Transport</a>
              </NavbarItem>
              <NavbarItem>
                <a href="#contact-pro" style={{ fontSize: "1rem" }}>Contact</a>
              </NavbarItem>
            </div>
          </NavbarContent>
        </div>
      </Navbar>

      {/* Popup */}
      {showPopup && <Modal onClose={() => setShowPopup(false)} />}

      {/* Hero Section */}
      <motion.div
        className="hero"
        style={{
          backgroundImage: "url('./src/assets/owlfast.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(80%)",
          opacity: 1,
        }}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1>Bienvenue chez Team OwlFast - Transport</h1>
        <p>
          Découvrez notre équipe, nos exploits et rejoignez-nous pour des aventures inoubliables dans Euro Truck
          Simulator 2 !
        </p>
      </motion.div>

      {/* Team Section */}
      <motion.div
        id="about"
        className="container py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-4xl font-bold mb-10">Qui je suis ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "OwlGameTV",
              role: "Fondateur & Leader",
              socials: {
                tiktok: "https://www.tiktok.com/@owlgametv",
                twitch: "https://m.twitch.tv/owlgametv",
                insta: "https://www.instagram.com/owlgametv/",
                youtube: "https://www.youtube.com/@owlgametv",
                discord: "https://discord.com/invite/8CMHVU2G63?utm_medium=graphext&utm_source=instabio&utm_campaign=%20DISCORD%20OWL%E2%80%99FAST%20COMMUNITY",
              },
            },
          ].map((member, index) => (
            <div key={index} className="card text-center">
              <img src="./src/assets/OwlFast-Profil.jpg" alt="Member" style={{ width: "200px", borderRadius: "8px", margin: "0 auto" }} />
              <h3 className="card-header">{member.name}</h3>
              <p>Passionne de simulation sans prise de tête ! <br></br>
                🚀 Viens tester des jeux, piloter, ou juste passer un bon moment. Ici, on rigole, on explore, et on chill.
                <br></br> 🔔 Abonne-toi si le cœur t’en dit… ou juste profite, c’est comme tu veux ! 👌🏻</p>
              <p></p>
              <div className="card-content">
                <p className="mb-2">{member.role}</p>
                <button className="social-button tiktok">
                  <a href={member.socials.tiktok} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaTiktok className="inline-block mr-2" /> TikTok
                  </a>
                </button>
                <button className="social-button twitch">
                  <a href={member.socials.twitch} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaTwitch className="inline-block mr-2" /> Twitch
                  </a>
                </button>
                <button className="social-button instagram">
                  <a href={member.socials.insta} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaInstagram className="inline-block mr-2" /> Instagram
                  </a>
                </button>
                <button className="social-button youtube">
                  <a href={member.socials.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaYoutube className="inline-block mr-2" /> Youtube
                  </a>
                </button>
                <button className="social-button discord">
                  <a href={member.socials.discord} target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaDiscord className="inline-block mr-2" /> Discord
                  </a>
                </button>
              </div>
            </div>
          ))}

        </div>
      </motion.div>

      <motion.div
        id="contact-pro"
        className="container py-20 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-4xl font-bold mb-10">Collaboration pro</h2>
        <div className="text-center">
          <p className="text-lg mb-4">
            Pour toutes demandes de collaboration ou partenariats professionnels :
          </p>
          <a
            href="mailto:owlgametvpro@gmail.com"
            className="text-xl text-blue-400 font-bold underline"
          >
            owlgametvpro@gmail.com
          </a>
        </div>
      </motion.div>

      {/* Twitch Section */}
      <motion.div
        id="twith"
        className="twitch-live-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-3xl font-bold mb-4"><FaTwitch className="inline-block mr-2" /> Live Twitch</h2>
        <div className="twitch-status flex justify-center items-center mb-4">
          <span
            className={`inline-block w-4 h-4 rounded-full mr-2 ${isLive ? "bg-red-500" : "bg-green-500"
              }`}
          ></span>
          <span>{isLive ? "En direct" : "Hors ligne"}</span>
        </div>
        <div className="twitch-frame">
          <iframe
            src="https://player.twitch.tv/?channel=YOUR_TWITCH_USERNAME&parent=localhost"
            height="400"
            width="720"
            allowFullScreen={true}
            frameBorder="0"
          ></iframe>
        </div>
      </motion.div>

      {/* Join Us Section */}
      <motion.div
        id="join"
        className="container py-20 bg-gray-800"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Button className="mx-auto block mt-8 text-4xl font-bold" onClick={() => setShowPopup(true)}>
          Rejoindre OwlFast - Transport
        </Button>

        <p className="text-center mb-6 max-w-3xl mx-auto">
          Suivez nos instructions pour rejoindre notre serveur et commencer votre aventure avec la Team OwlFast -
          Transport !
        </p>
        <Button className="mx-auto block mt-8">
          <a href="https://drive.google.com/file/d/1ig0E8Xqcw800GYmR3VTpj_7Fu0HBUdpz/view" target="_blank" className="social-link">
            <FaDownload /> Télécharger le pack de mods et voir les instructions
          </a>
        </Button>
      </motion.div>

      {/* Carousel Section */}
      <motion.div
        id="installation-guide"
        className="container py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-center text-4xl font-bold mb-10">Guide d'Installation</h2>
        <Carousel slides={slides} />
      </motion.div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="container mx-auto">
          <p className="mb-2">&copy; 2025 OwlGame</p>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com/owlgametv/" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaInstagram className="text-xl" />
            </a>
            <a href="https://m.twitch.tv/owlgametv" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitch className="text-xl" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;