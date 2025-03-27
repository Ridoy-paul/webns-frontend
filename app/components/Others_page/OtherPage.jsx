'use client';
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function OthersPage({page}) {
   
    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="about__content">
                    <span className="about__content--subtitle text__secondary mb-20">
                    Why Choose us
                    </span>
                    <h2 className="about__content--maintitle mb-25">
                    We do not buy from the open market &amp; traders.
                    </h2>
                    <p className="about__content--desc mb-20">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
                    illo, est repellendus are quia voluptate neque reiciendis ea
                    placeat labore maiores cum, hic ducimus ad a dolorem soluta
                    consectetur adipisci. Perspiciatis quas ab quibusdam is.
                    </p>
                    <p className="about__content--desc mb-25">
                    Itaque accusantium eveniet a laboriosam dolorem? Magni suscipit
                    est corrupti explicabo non perspiciatis, excepturi ut asperiores
                    assumenda rerum? Provident ab corrupti sequi, voluptates
                    repudiandae eius odit aut.
                    </p>
                </div>
            </div>
        </div>
    );
  }
  