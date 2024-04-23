import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Input, Button } from "@/components/ui";
import { Airplay } from "lucide-react";

const socket = io("http://localhost:5000");
const Home = () => {
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([])

  useEffect(() => {
    socket.on("connect", () => {
      console.log("client id", socket.id); // x8WIv7-mJelg7on_ALbx
    });

    socket.on("event", (payload) => {
      console.log(payload);
    });
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <main className="w-[600px] mx-auto h-screen flex flex-col justify-between">
      <nav className="w-full h-[60px] flex items-center border-b">
        <p className="text-lg font-bold">Chat App</p>
      </nav>

      <section className="w-full h-full mt-1">
        
      </section>

      <form className="w-full flex items-center space-x-2 py-2 mb-3" onSubmit={onSubmit}>
        <Input type="text" placeholder="Write message..." className="w-full" />
        <Button size="icon" type="submit">
          <Airplay className="w-4 h-4" />
        </Button>
      </form>
    </main>
  );
};

export default Home;
