import Link from "next/link";
import Image from "next/image";
import Owner from "@/../public/images/owner.webp";

const Letter = () => {
    return (
        <>
            <div class="container letterhead" data-scroll data-scroll-speed=".2">
                <div class="airmail-letter">
                    <div class="letter-header">
                        <div class="stamp">
                            <Image src={Owner} alt="" width="100px" />
                        </div>
                    </div>

                    <div class="letter-content">
                        <div class="date">Nov 11, 2022</div>

                        <div class="greeting">A Note From Our Founder</div>

                        <p>I’m Arya, the founder of Comsci. Back in 2020, I had this spark of an idea to kick off my own company. I wanted to create something special, so I named it Comsci. My journey didn’t start because I dreamed of wearing a suit or working in a sleek glass office. No, I wanted to break free from being just another face in the crowd at massive companies like Google, Microsoft, or Apple places where ideas go to fade away without recognition. I aimed to be the shepherd, not just one of the sheep.</p>

                        <p>I imagined a tech agency that was different—one that didn’t just churn out work as part of a big machine, but instead fostered creativity and innovation. We don’t just whip up logos, websites, or packaging; we craft digital experiences that resonate with people (yes, even those tough clients!). I’m passionate about creating designs that connect, developing software that tackles real issues, and engaging with people worldwide who have groundbreaking ideas about the future of technology.</p>

                        <p>What’s our big dream? Teaming up with amazing clients in vibrant cities like London, Paris, NYC, and Berlin to create things that not only work well but also look fantastic and leave people saying “wow.” I truly believe that great design should have a global reach, just like I aspire to.</p>

                        <div class="signature">Warmest regards,</div>
                        <div class="greeting">Arya Kagathara, Founder of Comsci Technologies</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Letter;