import Navbar from "@/Components/Navbar";
import Image from "next/image";
import porfolio from "@/Assests/potfolio.webp";

const portfolios = [
  {
    name: "Bunny.design",
    role: "UI/UX Designer",
    image: porfolio,
  },
  {
    name: "Bhaskar Tiwari",
    role: "Graphic Designer",
    image: porfolio,
  },
  {
    name: "Aksara Joshi",
    role: "Graphic Designer",
    image: porfolio,
  },
  {
    name: "Designer 4",
    role: "Graphic Designer",
    image: porfolio,
  },
];

const FindFreelancers: React.FC = () => {
  return (
    <div className="bg-blue-300 h-screen">
      <div>
        <Navbar />
      </div>
      <div>
        <section className="px-4 py-10 ">

          <div className="relative">
            <div className="flex justify-center">
              <div
                // ref={carouselRef}
                className="flex gap-6 md:gap-10 overflow-x-auto w-[1200px] scrollbar-hide scroll-smooth snap-x mx-6 md:mx-20"
              >
                {portfolios.map((portfolio, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-lg overflow-hidden p-4 snap-center min-w-[300px] md:min-w-[400px] flex-shrink-0"
                  >
                    <Image
                      src={portfolio.image}
                      alt={portfolio.name}
                      width={360}
                      height={360}
                      className="w-full rounded-lg object-cover"
                    />
                    <div className="mt-4 text-center flex justify-between mx-4">
                      <div>
                        <h3 className="text-xl font-semibold">{portfolio.name}</h3>
                        <p className="text-gray-500">{portfolio.role}</p>
                      </div>
                      <div className="mt-4">
                        <a href="#" className="text-blue-500 font-semibold">
                          →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default FindFreelancers;
