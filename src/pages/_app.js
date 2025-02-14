import 'bootstrap/dist/css/bootstrap.min.css';
import 'video-react/dist/video-react.css';
import '@/styles/globals.css';
import '@/styles/responsive.css';
import '@/styles/fonts.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }) {

  const router = useRouter();

  // const [mouseX, setMouseX] = useState(0);
  // const [mouseY, setMouseY] = useState(0);

  const is404Page = router.isFallback || router.pathname == '/404';
  
  useEffect( () => {
    ( async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
    })()
      gsap.set(".fadeInUp", {y: "30%", opacity: 0,});
      ScrollTrigger.batch(".fadeInUp", {
        onEnter: batch => gsap.to(batch, {  opacity: 1, duration: .8, delay:0.5, stagger: 0.2, y:0}),
      });

      // gsap.set('.cursor_cursor__WX5Wi', {
      //   css: {
      //     left: mouseX,
      //     top: mouseY,
      //   },
      // });
  
      // window.addEventListener('mouseenter', (e) => {
      //   setMouseX(e.clientX);
      //   setMouseY(e.clientY);
      // });
  
      // return () => {
      //   window.removeEventListener('mouseenter', (e) => {
      //     setMouseX(e.clientX);
      //     setMouseY(e.clientY);
      //   });
      // };
  }, [])

  // useEffect(() => {

  //   gsap.set('.cursor_cursor__WX5Wi', {
  //     css: {
  //       left: mouseX,
  //       top: mouseY,
  //     },
  //   });

  //   window.addEventListener('mousemove', (e) => {
  //     setMouseX(e.clientX);
  //     setMouseY(e.clientY);
  //   });

  //   return () => {
  //     window.removeEventListener('mousemove', (e) => {
  //       setMouseX(e.clientX);
  //       setMouseY(e.clientY);
  //     });
  //   };
  // }, [mouseX, mouseY]);

  return (
    <>
      <AnimatePresence mode='wait'>
        <motion.dev key={router.pathname}>
      <main>
      {/* <div className='cursor_cursor__WX5Wi'>
              <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2032_259)">
                  <path d="M34.5 0.5H38.5V30.5H34.5V0.5ZM42.5 38.5V34.5H72.5V38.5H42.5ZM0.5 38.5V34.5H30.5V38.5H0.5ZM34.5 42.5H38.5V72.5H34.5V42.5Z" fill="white" stroke="black" />
                </g>
                <defs>
                  <clipPath id="clip0_2032_259">
                    <rect width="73" height="73" fill="white" />
                  </clipPath>
                </defs>
              </svg>

            </div> */}
        {!is404Page && <Header />}
        <Component {...pageProps} />
        {!is404Page && <Footer />}
      </main> 
      <motion.div className='slide-in' initial={{scaleY:0}} animate={{scaleY:0}} exit={{scaleY:1 }} transition={{duration:1, ease:[0.22,1,0.36,1]}}></motion.div>
        <motion.div className='slide-out' initial={{scaleY:1}} animate={{scaleY:0}} exit={{scaleY:0 }} transition={{duration:1, ease:[0.22,1,0.36,1]}}></motion.div>
      </motion.dev>
      </AnimatePresence>
    </>
  )
}
