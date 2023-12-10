import Link from "next/link";
import SampleChart from "@/components/ui/charts/chart";
import AdminSpringTable from "@/components/table/main-page";
import Header from "@/components/header";

import { CreatePost } from "@/app/_components/create-post";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
  const session = await getServerAuthSession();
  const springs = await api.spring.findAllAdminPanel.query();
  
  return (
    <main className="bg-slate-600">
      <Header />
      <SampleChart />
      <AdminSpringTable  data={springs} />
      
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest.query();
  

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
      
    </div>
  );
}
