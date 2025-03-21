'use client';

import { useRouter } from "next/navigation";
import { ConversationType } from "@/app/inbox/page";

interface ConversationProps {
    conversation: ConversationType;
    userId: string;
}

const Conversation: React.FC<ConversationProps> = ({
    conversation,
    userId
}) => {
    const router = useRouter();
    const otherUser = conversation.users.find((user) => user.id !== userId);

    return (
        <div className="px-6 py-4 cursor-pointer border border-gray-300 rounded-xl">
            <div className="flex items-center space-x-4">
                {otherUser && (
                    <>
                        <img src={otherUser.avatar_url} alt={otherUser.name} className="w-10 h-10 rounded-full" />
                        <p className="text-xl">{otherUser.name}</p>
                    </>
                )}
            </div>
            <p 
                onClick={() => router.push(`/inbox/${conversation.id}`)}
                className="text-airbnb-dark mt-4"
            >
                Go to conversation
            </p>
        </div>
    )
}

export default Conversation;
