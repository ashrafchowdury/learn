import { FormEvent, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Input, Button } from "@/components/ui";
import { Airplay } from "lucide-react";
import { cn } from "@/lib/utils";
import { users } from "@/utils/users";

type CHATS = {
  message: string;
  user: any;
};

const socket = io("http://localhost:5000");
const Home = () => {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<CHATS[]>([]);
  const [currenUser, setCurrenUser] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setCurrenUser(socket.id as string);
    });

    socket.on("chats", (payload: CHATS) => {
      setChats((prev) => [...prev, payload]);
    });
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("message", message);

    setMessage("");
  };
  console.log("currenUser", currenUser);
  return (
    <>
      <aside className="w-[300px] mx-auto h-screen absolute top-0 left-3">
        <nav className="w-full h-[60px] flex items-center border-b">
          <p className="text-lg font-bold">User Board</p>
        </nav>
        <section className="space-y-3">
          {users.map((item) => (
            <div
              className="flex items-center space-x-2 overflow-hidden p-2 border rounded-md cursor-pointer hover:scale-105 duration-150"
              key={item.uid}
            >
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-medium uppercase">
                {item.name.slice(0, 2)}
              </div>
              <div>
                <p className="font-bold">{item.name}</p>
                <p className="text-sm">{item.bio}</p>
              </div>
            </div>
          ))}
        </section>
      </aside>

      <main className="w-[600px] mx-auto h-screen flex flex-col justify-between">
        <nav className="w-full h-[60px] flex items-center border-b">
          <p className="text-lg font-bold">Chat App</p>
        </nav>

        <section className="w-full h-full mt-1 flex flex-col space-y-3 items-start overflow-auto py-5">
          {chats.map((item) => {
            return (
              <div
                className={cn(
                  "py-0.5 px-4 rounded-md border",
                  currenUser == item.user && "bg-black text-white"
                )}
              >
                {item.message}
              </div>
            );
          })}
        </section>

        <form
          className="w-full flex items-center space-x-2 py-2 mb-3"
          onSubmit={onSubmit}
        >
          <Input
            type="text"
            placeholder="Write message..."
            className="w-full"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <Button size="icon" type="submit">
            <Airplay className="w-4 h-4" />
          </Button>
        </form>
      </main>
    </>
  );
};

export default Home;
