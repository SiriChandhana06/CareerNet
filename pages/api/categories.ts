import { NextApiRequest, NextApiResponse } from 'next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const categories = [
      {
        id: 1,
        title: 'Graphic & Design',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 2,
        title: 'Cartoon Animation',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 3,
        title: 'Illustration',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 4,
        title: 'Flyers & Vouchers',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 5,
        title: 'Logo Design',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 6,
        title: 'Social Graphics',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 7,
        title: 'Article Writing',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
      {
        id: 8,
        title: 'Video Editing',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.DDguoMcPMcXII2Uit1sXsgHaHb&pid=Api&P=0&h=180',
      },
    ];
    res.status(200).json(categories);
  }
  