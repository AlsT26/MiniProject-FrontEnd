import Image from "next/image";
import Link from "next/link";

interface ICardEvent {
  title: string;
  thumbnail: string;
  avatar: string;
  promotor: string;
  slug: string;
  category: string;
  location: string;
  dateTime: string;
}

export default function Card({ title, thumbnail, avatar, promotor, slug, category, location }: ICardEvent) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow w-full sm:w-[15rem] md:w-[11rem]">
      <div className="rounded-t-lg h-[9rem] w-full relative overflow-hidden">
        <Image className="object-fill rounded-t-lg" src={thumbnail} alt={title} fill priority />
        <span className="absolute bg-gray-600 text-white px-2 m-2 right-0 text-xs rounded-sm">{category}</span>
      </div>
      <div className="p-4">
        <h5 className="mb-2 text-md font-bold line-clamp-2 tracking-tight text-gray-900">{title}</h5>
        <div className="flex items-center my-5">
          <div className="w-10 h-10 relative">
            <Image className="rounded-full object-cover" src={avatar || "https://res.cloudinary.com/dn6uglajh/image/upload/v1733990935/blank-image_yfczs3.jpg"} alt={promotor} fill priority />
          </div>
          <div className="flex-1 min-w-0 ms-4">
            <p className="text-sm font-medium text-gray-900 truncate ">{promotor}</p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400">{location}</p>
          </div>
        </div>
        <Link
          href={`/${slug}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-teal-700 rounded-lg hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
        >
          More Info
        </Link>
      </div>
    </div>
  );
}
