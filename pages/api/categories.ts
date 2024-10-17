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
        title: 'Graphic & Design',
        image: graphic,
      },
      {
        id: 2,
        title: 'Cartoon Animation',
        image: cartoon,
      },
      {
        id: 3,
        title: 'Illustration',
        image: illustration,
      },
      {
        id: 4,
        title: 'Flyers & Vouchers',
        image: flyers,
      },
      {
        id: 5,
        title: 'Logo Design',
        image: logodesign,
      },
      {
        id: 6,
        title: 'Social Graphics',
        image: social,
      },
      {
        id: 7,
        title: 'Article Writing',
        image: article,
      },
      {
        id: 8,
        title: 'Video Editing',
        image: video,
      },
    ];
    res.status(200).json(categories);
  }
  