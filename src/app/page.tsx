// "use client";
import SpringDetails from "@/components/SpringDetails";
// import Link from "next/link";

// import { CreatePost } from "@/app/_components/create-post";
// import { getServerAuthSession } from "@/server/auth";
// import { api } from "@/trpc/server";
// import SocketTest from "@/components/SocketTest";
import dynamic from "next/dynamic";

const MapComp = dynamic(() => import("@/components/MapComponent"), { ssr: false });

// imports

export default function Home() {
  // const hello = await api.post.hello.query({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  return (
    <div className="p-8">
      <div className="my-4">
        <p className="text-4xl font-bold text-primary">
          Azhagar Hill SpringShed
        </p>
      </div>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <MapComp />
        </div>
        <div className="w-1/2">
          <SpringDetails />
        </div>
      </div>
    </div>
  );
}
