import { cn } from "@/lib/utils";
import { holligate } from "@/lib/fonts";
import { EvervaultCard } from "../ui/evervault-card";


export function Features() {
  return (
    <div className="mt-20">
      <h2
        className={cn(
          "text-center font-bold text-5xl py-6 tracking-wider",
        )}
      >
        Features
      </h2>
      <section className="bg-transparent">
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {items.map((item, index) => (
              <div
                key={index}
                className="border p-5 rounded-lg hover:border-white duration-500 relative"
              >
                <h3 className="mb-2 text-xl font-bold text-white z-30">
                  {item.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
                <EvervaultCard className="absolute" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "The Dawn of Innovation",
    description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <Skeleton />,
  },
  {
    title: "The Digital Revolution",
    description: "Dive into the transformative power of technology.",
    header: <Skeleton />,
  },
  {
    title: "The Art of Design",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <Skeleton />,
  },
  {
    title: "The Power of Communication",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <Skeleton />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
  },
];
