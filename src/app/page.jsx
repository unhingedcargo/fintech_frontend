import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <Sidebar />

    <div className="absolute left-1/8 mx-8 my-5 overflow-hidden text-justify">
      <h1>Home Page </h1>
    </div>
    </>
  );
}
