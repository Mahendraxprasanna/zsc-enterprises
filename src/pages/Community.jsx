import { motion } from 'framer-motion'
import Footer from '../components/Footer'

// HERO
import hero1 from '../assets/images/community/hero1.jpg'
import hero2 from '../assets/images/community/hero2.jpg'
import hero3 from '../assets/images/community/hero3.jpg'

// SCHOOLS
import school1 from '../assets/images/community/school1.jpg'
import school2 from '../assets/images/community/school2.jpg'
import school3 from '../assets/images/community/school3.jpg'

// FIRST RESPONDERS
import police1 from '../assets/images/community/police1.jpeg'
import police2 from '../assets/images/community/police2.jpeg'
import fire1 from '../assets/images/community/fire1.jpeg'

// HOLIDAY
import santa1 from '../assets/images/community/santa1.jpg'
import santa2 from '../assets/images/community/santa2.jpg'

// CULTURE
import employee1 from '../assets/images/community/employee1.jpg'
import employee2 from '../assets/images/community/employee2.jpg'
import employee3 from '../assets/images/community/employee3.jpg'

// EVENTS
import event1 from '../assets/images/community/event1.jpg'
import event2 from '../assets/images/community/event2.jpg'
import event3 from '../assets/images/community/event3.jpg'

// FOUNDATION
import foundation1 from '../assets/images/community/foundation1.jpg'

function FloatingEmoji({ emoji, top, left, size, delay = 0 }) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        rotate: [0, 10, 0],
      }}
      transition={{
        duration: 5 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        position: 'absolute',
        top,
        left,
        fontSize: size,
        opacity: 0.14,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {emoji}
    </motion.div>
  )
}

function FloatingCard({ img, height = 320, rotate = 0 }) {
  return (
    <motion.div
      whileHover={{
        y: -12,
        scale: 1.03,
        rotate: rotate + 1,
      }}
      transition={{ duration: 0.45 }}
      style={{
        height,
        borderRadius: 30,
        overflow: 'hidden',
        position: 'relative',
        flex: 1,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 30px 80px rgba(0,0,0,0.16)',
        border: '5px solid rgba(255,255,255,0.7)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <img
        src={img}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(0,0,0,0.35), transparent)',
        }}
      />
    </motion.div>
  )
}

function StorySection({
  eyebrow,
  title,
  desc,
  images,
  reverse = false,
  bg,
  glow1,
  glow2,
}) {
  return (
    <section
      style={{
        padding: '9rem 5rem',
        position: 'relative',
        overflow: 'hidden',
        background: bg,
      }}
    >

      {/* GLOWS */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: glow1,
          filter: 'blur(120px)',
          top: '-10%',
          left: '-10%',
          opacity: 0.45,
        }}
      />

      <div
        style={{
          position: 'absolute',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background: glow2,
          filter: 'blur(120px)',
          bottom: '-10%',
          right: '-10%',
          opacity: 0.35,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 5,
        }}
      >

        {/* IMAGES */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? 80 : -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            order: reverse ? 2 : 1,
            position: 'relative',
            height: 650,
          }}
        >

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '65%',
              zIndex: 3,
            }}
          >
            <FloatingCard img={images[0]} height={350} rotate={-6} />
          </div>

          <div
            style={{
              position: 'absolute',
              top: 120,
              right: 0,
              width: '55%',
              zIndex: 2,
            }}
          >
            <FloatingCard img={images[1]} height={280} rotate={5} />
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '18%',
              width: '58%',
              zIndex: 4,
            }}
          >
            <FloatingCard img={images[2]} height={320} rotate={-2} />
          </div>
        </motion.div>

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, x: reverse ? -80 : 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            order: reverse ? 1 : 2,
            position: 'relative',
            zIndex: 10,
          }}
        >

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 42,
                height: 3,
                borderRadius: 999,
                background:
                  'linear-gradient(90deg, #FF671F, #EC4899)',
              }}
            />

            <span
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: '#D4186C',
                fontWeight: 800,
              }}
            >
              {eyebrow}
            </span>
          </div>

          <h2
            className="font-playfair font-black"
            style={{
              fontSize: 'clamp(3rem, 5vw, 5.5rem)',
              lineHeight: 0.94,
              color: '#1A1208',
              marginBottom: '1.6rem',
            }}
          >
            {title}
          </h2>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 2,
              color: 'rgba(42,30,16,0.7)',
              fontWeight: 300,
              maxWidth: 560,
            }}
          >
            {desc}
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function Community() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        background: '#fff',
        overflow: 'hidden',
      }}
    >

      {/* HERO */}
      <section
        style={{
          position: 'relative',
          minHeight: '125vh',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #FFF1E7 0%, #FFE5F1 35%, #FFF8D9 70%, #EAF8FF 100%)',
        }}
      >

        {/* MASSIVE GLOWS */}
        <div
          style={{
            position: 'absolute',
            width: 800,
            height: 800,
            borderRadius: '50%',
            background: 'rgba(255,103,31,0.18)',
            filter: 'blur(120px)',
            top: '-15%',
            left: '-10%',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 700,
            height: 700,
            borderRadius: '50%',
            background: 'rgba(236,72,153,0.18)',
            filter: 'blur(120px)',
            bottom: '-15%',
            right: '-10%',
          }}
        />

        <div
          style={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: 'rgba(255,221,87,0.18)',
            filter: 'blur(120px)',
            top: '20%',
            right: '20%',
          }}
        />

        {/* FLOATING EMOJIS */}
        <FloatingEmoji emoji="🧡" top="10%" left="8%" size="4rem" />
        <FloatingEmoji emoji="🍩" top="18%" left="80%" size="4rem" delay={1} />
        <FloatingEmoji emoji="🚓" top="75%" left="12%" size="4rem" delay={2} />
        <FloatingEmoji emoji="🚒" top="80%" left="82%" size="4rem" delay={3} />
        <FloatingEmoji emoji="🎉" top="8%" left="50%" size="3.8rem" delay={4} />
        <FloatingEmoji emoji="🎈" top="65%" left="48%" size="3rem" delay={5} />
        <FloatingEmoji emoji="✨" top="35%" left="90%" size="3rem" delay={2} />
        <FloatingEmoji emoji="💖" top="55%" left="5%" size="3rem" delay={3} />

        {/* COLLAGE */}
        <div
          style={{
            position: 'relative',
            zIndex: 5,
            padding: '7rem 2rem',
          }}
        >

          <div
            style={{
              display: 'flex',
              gap: 22,
              marginBottom: 24,
              transform: 'rotate(-2deg)',
            }}
          >
            <FloatingCard img={hero1} />
            <FloatingCard img={school1} />
            <FloatingCard img={police1} />
            <FloatingCard img={hero2} />
          </div>

          <div
            style={{
              display: 'flex',
              gap: 22,
              transform: 'rotate(2deg)',
            }}
          >
            <FloatingCard img={event1} />
            <FloatingCard img={employee1} />
            <FloatingCard img={fire1} />
            <FloatingCard img={hero3} />
          </div>
        </div>

        {/* CENTER TEXT */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            padding: '0 2rem',
          }}
        >

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              marginBottom: 22,
              fontSize: '0.78rem',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: '#FF671F',
              fontWeight: 800,
            }}
          >
            ZSC COMMUNITY
          </motion.div>

          <motion.h1
            className="font-playfair font-black"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: 'clamp(4rem, 10vw, 9rem)',
              lineHeight: 0.88,
              marginBottom: '1.5rem',
              color: '#fff',
              textShadow: '0 15px 50px rgba(0,0,0,0.18)',
            }}
          >
            WE SHOW UP<br />

            <span
              style={{
                background:
                  'linear-gradient(135deg, #FF671F 0%, #EC4899 50%, #FFD84D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              FOR PEOPLE.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              maxWidth: 820,
              fontSize: '1.05rem',
              lineHeight: 2,
              color: 'rgba(255,255,255,0.96)',
              fontWeight: 300,
            }}
          >
            Through schools, local events, first responders,
            and charitable initiatives, we are proud to serve
            communities far beyond our storefronts.
          </motion.p>
        </div>
      </section>

      {/* CELEBRATION QUOTE */}
      <section
        style={{
          position: 'relative',
          padding: '9rem 2rem',
          overflow: 'hidden',
          textAlign: 'center',
          background:
            'linear-gradient(135deg, #FFF0E7 0%, #FFEAF6 50%, #FFF8D6 100%)',
        }}
      >

        <FloatingEmoji emoji="🎊" top="15%" left="10%" size="4rem" />
        <FloatingEmoji emoji="🍩" top="20%" left="85%" size="3.5rem" />
        <FloatingEmoji emoji="✨" top="70%" left="18%" size="3rem" />
        <FloatingEmoji emoji="💖" top="65%" left="82%" size="3rem" />

        <motion.h2
          className="font-playfair font-black"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            fontSize: 'clamp(2.7rem, 5vw, 5.5rem)',
            lineHeight: 1.02,
            color: '#1A1208',
            position: 'relative',
            zIndex: 5,
          }}
        >
          “Community isn’t part<br />

          <span
            style={{
              background:
                'linear-gradient(135deg, #FF671F, #EC4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            of our business.
          </span>

          <br />

          It’s the reason we exist.”
        </motion.h2>
      </section>

      {/* STORY */}
      <StorySection
        eyebrow="Schools & Students"
        title="Fueling Students, Teachers & Families."
        desc="From Teacher Appreciation Week to marching band support and Back-2-School events, we love showing up for students, teachers, and families across every community we serve."
        images={[school1, school2, school3]}
        bg="linear-gradient(135deg, #FFF6EA 0%, #FFF0F8 100%)"
        glow1="rgba(255,103,31,0.25)"
        glow2="rgba(236,72,153,0.2)"
      />

      <StorySection
        eyebrow="First Responders"
        title="Serving Those Who Serve Everyone Else."
        desc="Whether it's police departments, firefighters, or local frontline heroes, we are proud to support the people who keep our communities safe every single day."
        images={[police1, police2, fire1]}
        reverse={true}
        bg="linear-gradient(135deg, #FFF2F5 0%, #FFF9E7 100%)"
        glow1="rgba(236,72,153,0.22)"
        glow2="rgba(255,221,87,0.2)"
      />

      <StorySection
        eyebrow="Events & Celebrations"
        title="Moments That Bring Communities Together."
        desc="From Taste of Henry to holiday events and Dunkin’ refreshment pop-ups, we love creating experiences that bring smiles, laughter, joy, and connection."
        images={[event1, event2, santa1]}
        bg="linear-gradient(135deg, #FFF7E8 0%, #EAF7FF 100%)"
        glow1="rgba(255,103,31,0.22)"
        glow2="rgba(59,130,246,0.15)"
      />

      {/* IMPACT */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '9rem 5rem',
          background:
            'linear-gradient(135deg, #FF671F 0%, #EC4899 45%, #FFD84D 100%)',
          color: '#fff',
        }}
      >

        <FloatingEmoji emoji="🧡" top="12%" left="12%" size="3rem" />
        <FloatingEmoji emoji="🎉" top="20%" left="82%" size="3.5rem" />
        <FloatingEmoji emoji="✨" top="70%" left="15%" size="3rem" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '3rem',
            position: 'relative',
            zIndex: 5,
          }}
        >

          {[
            ['400+', 'Refreshers Served'],
            ['$9K', 'Donated to Operation Lunchbox'],
            ['100+', 'Families Supported'],
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              style={{
                padding: '3rem',
                borderRadius: 32,
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <div
                className="font-playfair font-black"
                style={{
                  fontSize: '5rem',
                  lineHeight: 1,
                  marginBottom: 14,
                }}
              >
                {s[0]}
              </div>

              <div
                style={{
                  fontSize: '0.72rem',
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  opacity: 0.92,
                }}
              >
                {s[1]}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CELEBRATION */}
      <section
        style={{
          position: 'relative',
          padding: '9rem 3rem',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #FFF5EB 0%, #FFEAF4 50%, #FFF8DA 100%)',
        }}
      >

        <FloatingEmoji emoji="🎈" top="10%" left="10%" size="3rem" />
        <FloatingEmoji emoji="🍩" top="12%" left="85%" size="3rem" />
        <FloatingEmoji emoji="💖" top="75%" left="8%" size="3rem" />
        <FloatingEmoji emoji="✨" top="80%" left="85%" size="3rem" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 20,
            marginBottom: '6rem',
          }}
        >
          {[
            employee1,
            employee2,
            employee3,
            santa2,
            foundation1,
            event3,
            school2,
            hero3,
          ].map((img, i) => (
            <FloatingCard
              key={i}
              img={img}
              height={260 + (i % 2) * 70}
              rotate={i % 2 === 0 ? -2 : 2}
            />
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 5,
            textAlign: 'center',
            padding: '5rem 3rem',
            borderRadius: 40,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.45))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.5)',
            boxShadow: '0 30px 80px rgba(0,0,0,0.08)',
          }}
        >
          <h2
            className="font-playfair font-black"
            style={{
              fontSize: 'clamp(3rem, 6vw, 6.5rem)',
              lineHeight: 0.94,
              color: '#1A1208',
              marginBottom: '1.5rem',
            }}
          >
            Together, we make<br />

            <span
              style={{
                background:
                  'linear-gradient(135deg, #FF671F, #EC4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              a difference.
            </span>
          </h2>

          <p
            style={{
              maxWidth: 780,
              margin: '0 auto',
              fontSize: '1rem',
              lineHeight: 2,
              color: 'rgba(42,30,16,0.72)',
              fontWeight: 300,
            }}
          >
            Every event, every donation, every classroom,
            and every smile is part of a bigger story —
            one built through people, partnerships, and community.
          </p>
        </div>
      </section>

      <Footer />
    </motion.div>
  )
}