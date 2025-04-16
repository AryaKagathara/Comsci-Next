import PrimaryBtn from "@/components/layout/PrimaryBtn";
import books from "@/../public/images/extras/books.webp";
import Image from "next/image";
import Link from "next/link";

export default function Books() {
  const contactData = require('../../files/contact.json');
  return (
    <>
      <div data-wpr-lazyrender="1" className="book-outer">
        <div className="container">
          <div className="book-block">
            <div className="book-left" data-scroll data-scroll-speed=".1" >
              <div className="book-img">
              <Image src={books} alt="Stack of Comsci eBooks on design and development best practices" width={1000} height={1000} quality={100} className="quiz-logo" />

              </div>
            </div>
            <div className="book-right">
              <div className="book-right-inner desktop-show">
                <h4>Download Free Expert Guides & eBooks</h4>
                <div className="text desktop-show">
                  <p className="p1">
                    <i>Unlock the world of design and development with Comsci Technologies. Our expert-crafted eBooks provide insights into logo, colours, typography, branding, web design, and product packaging, helping businesses create impactful digital experiences.</i>
                  </p>
                </div>
              </div>
              <div className="learn_btn_3">
              <Link href={contactData.download_book_form} target="_blank"><span>Download Now</span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}