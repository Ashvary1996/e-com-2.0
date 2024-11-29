"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";

export const HoverEffect = ({ items, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-green-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <Card>
            <Link href="/">
              <CardImage>{item.imageUrl}</CardImage>
            </Link>
            <div className="flex flex-col flex-grow">
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <h3 className="text-2xl text-center font-medium font-sans">
                ₹ {item.price}
              </h3>
              <CardRating>{item.totalRating}</CardRating>
            </div>
            <AddToCardButton>Add To Cart</AddToCardButton>
          </Card>
        </div>
      ))}
    </div>
  );
};
export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-transparent border-transparent dark:border-white/[0.2] group-hover:border-transparent   relative z-20 flex flex-col justify-between border-2 border-orange-500 p-2  group   transition-border duration-1000",
        className
      )}
    >
      {children}
    </div>
  );
};
export const CardImage = ({ className, children }) => {
  const imageUrl =
    children ||
    "https://images.pexels.com/photos/39501/lamborghini-brno-racing-car-automobiles-39501.jpeg";
  return (
    <Image
      className="rounded-md"
      src={imageUrl}
      alt="My Image"
      width={800}
      height={500}
    />
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4
      className={cn(
        "text-black text-center font-bold tracking-wide mt-2",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  const [trimmedDescription, setTrimmedDescription] = useState("");

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let maxLength;

      if (screenWidth < 640) maxLength = 50; // Mobile
      else if (screenWidth < 1024) maxLength = 100; // Tablet
      else maxLength = 150; // Desktop

      setTrimmedDescription(
        children.length > maxLength
          ? `${children.slice(0, maxLength)}...`
          : children
      );
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [children]);

  return (
    <p
      className={cn(
        "mt-2 text-black-400 text-center font-serif tracking-wide leading-relaxed text-sm",
        className,
        "h-16 overflow-hidden" // Add fixed height for consistency
      )}
    >
      {trimmedDescription}
    </p>
  );
};

export const AddToCardButton = ({ className, children }) => {
  return (
    <button
      className={cn(
        "w-fit m-auto bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-lg font-medium text-sm tracking-wide cursor-pointer mt-4",
        className
      )}
    >
      {children}
    </button>
  );
};

export const CardRating = ({ className, children }) => {
  const rating = parseFloat(children);

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <IoStar
          key={`full-${i}`}
          className="text-yellow-400 shadow-black shadow-xl"
        />
      );
    }

    if (halfStar) {
      stars.push(
        <IoStarHalf
          key="half"
          className="text-yellow-400 shadow-black shadow-xl"
        />
      );
    }

    return stars;
  };

  return (
    <div
      className={cn(
        "flex justify-center p-1 items-center space-x-1",
        className
      )}
    >
      {renderStars()}
    </div>
  );
};
