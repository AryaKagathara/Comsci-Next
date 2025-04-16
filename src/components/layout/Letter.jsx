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

                        <p>I’m Arya, the founder, way back in 2020 I had a thought to start my own companym I got a name Comsci. I started this journey not because I wanted to wear a suit or sit in some fancy glass office, but because I refused to be just another sheep in a cubicle of giant companies like Google, Microsft, Apple and farm where ideas go to retire and don't get a name. I wanted to be the shepherd, not the sheep. </p>

                        <p>I envisioned a different kind of tech agency – not another cog in a giant machine where ideas get diluted, but a place where creativity thrives and innovation leads. I don’t just design logos, websites, or packaging — we create digital experiences that people actually like (yes, even your most skeptical client). I’m obsessed with crafting designs that connect, building software that solves real problems, and talking to people around the world who share revolutionary ideas about the future of tech.</p>

                        <p>Our big dream? Collaborating with awesome clients in vibrant cities like London, Paris, NYC, Berlin… make things that work, look good, and leave people saying “wow.” I believe great design should travel the world, just like I plan to.</p>

                        <div class="signature">Warmest regards,</div>
                        <div class="greeting">Arya Kagathara, Founder of Comsci Technologies</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Letter;