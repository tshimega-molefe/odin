import { FC } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";

interface SocialsProps {}

const Socials: FC<SocialsProps> = ({}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Link
        href="https://github.com/tshimega-molefe"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <Github size={17} absoluteStrokeWidth={false} />
      </Link>
      <Link
        href="https://www.instagram.com/tshimegamolefe"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <Instagram size={17} absoluteStrokeWidth={false} />
      </Link>
      <Link
        href="https://www.linkedin.com/in/tshimega-molefe/"
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
      >
        <Linkedin size={17} absoluteStrokeWidth={false} />
      </Link>
    </div>
  );
};

export default Socials;
