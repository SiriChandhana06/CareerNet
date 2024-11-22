import { NextApiRequest, NextApiResponse } from 'next';
import graphic from "@/Assests/graphics.png";
import cartoon from "@/Assests/cartoon.png";
import illustration from "@/Assests/illustartion.png";
import flyers from "@/Assests/flyers.png";
import logodesign from "@/Assests/logo design.png";
import social from "@/Assests/social.png";
import article from "@/Assests/article.png";
import video from "@/Assests/video.png";


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const categories = [
      {
        id: 1,
        title: 'Graphic Design',
        cimage: graphic,
      },
      {
        id: 2,
        title: 'Cartoon Animation',
        cimage: cartoon,
      },
      {
        id: 3,
        title: 'Illustration',
        cimage: illustration,
      },
      {
        id: 4,
        title: 'Web Development',
        cimage: flyers,
      },
      {
        id: 5,
        title: 'Logo Design',
        cimage: logodesign,
      },
      {
        id: 6,
        title: 'Social Graphics',
        cimage: social,
      },
      {
        id: 7,
        title: 'Article Writing',
        cimage: article,
      },
      {
        id: 8,
        title: 'Video Editing',
        cimage: video,
      },
    ];
    res.status(200).json(categories);
  }
  