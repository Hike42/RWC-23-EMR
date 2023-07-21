import React, { useState } from "react";
import { Grid, Col, Card, Text, Icon } from "@tremor/react";
import { ArrowRightIcon } from "@heroicons/react/outline";

const ChatPage = () => {
  const [conversations, setConversations] = useState(
    Array.from({ length: 10 }).map((_, index) => ({
      id: index,
      messages: [],
    }))
  );
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Nouvel état pour la recherche
  const nonUserMessageWidth = "80%"; // Ajustez cette valeur selon vos besoins
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setConversations((prevConversations) => {
        const updatedConversations = [...prevConversations];
        updatedConversations[selectedConversation].messages.unshift({
          text: newMessage,
          sentByUser: true,
        });
        return updatedConversations;
      });
      setNewMessage("");
    }
  };

  const handleConversationSelect = (index) => {
    setSelectedConversation(index);
  };

  const handleExitConversation = () => {
    setSelectedConversation(null);
  };

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filtrer les conversations en fonction de la recherche
  const filteredConversations = conversations.filter((conversation) =>
    conversation.id.toString().includes(searchQuery)
  );

  // Récupère la conversation actuellement sélectionnée
  const currentConversation =
    selectedConversation !== null ? (
      <Card className="h-full flex flex-col">
        <Text className="text-lg font-bold mb-4">Chat</Text>
        {/* Affichage des messages */}
        <div
          className="h-full overflow-y-auto p-4 flex flex-col-reverse"
          style={{ scrollBehavior: "smooth" }}
        >
          {conversations[selectedConversation].messages.map(
            (message, index) => (
              <div
                key={index}
                className={`${
                  message.sentByUser ? "text-blue-500" : "text-gray-600"
                } rounded p-2 mb-2 ${
                  message.sentByUser
                    ? "text-right ml-auto"
                    : "text-left mr-auto"
                } bg-white shadow-lg rounded-10 transition-all`}
                style={{
                  maxWidth: nonUserMessageWidth,
                  wordBreak: "break-word",
                }}
              >
                {message.text}
              </div>
            )
          )}
        </div>
        {/* Saisie du message */}
        <div className="flex-shrink-0 p-4 flex">
          <input
            type="text"
            className="flex-grow border rounded p-2 mr-4"
            placeholder="Entrez votre message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white rounded px-4 py-2"
            onClick={handleSendMessage}
          >
            Envoyer
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white rounded px-4 py-2 ml-2"
            onClick={handleExitConversation}
          >
            Quitter
          </button>
        </div>
      </Card>
    ) : (
      <Card className="h-full flex items-center justify-center">
        <Text className="text-gray-500">Sélectionnez une discussion</Text>
      </Card>
    );

  return (
    <div className="h-screen w-screen flex">
      <Grid numItemsLg={3} className="flex-grow mt-10 ml-20 mr-20">
        <Col numColSpan={1} className="bg-white max-h-[calc(100vh-150px)]">
          <Card className="h-full overflow-y-hidden">
            <Text className="text-lg font-bold mb-4">Discussions</Text>
            {/* Barre de recherche */}
            <div className="px-4 mb-4">
              <input
                type="text"
                className="border rounded p-2 w-full"
                placeholder="Rechercher une discussion..."
                value={searchQuery}
                onChange={handleSearchQueryChange}
              />
            </div>
            {/* Liste des discussions filtrées */}
            <div className="h-full overflow-y-auto">
              <ul className="space-y-6">
                {filteredConversations.map((conversation) => {
                  const lastMessage =
                    conversation.messages.length > 0
                      ? conversation.messages[conversation.messages.length - 1]
                      : null;

                  return (
                    <li
                      key={conversation.id}
                      className={`flex items-start space-x-4 cursor-pointer ${
                        selectedConversation === conversation.id
                          ? "bg-gray-200"
                          : ""
                      }`}
                      onClick={() => handleConversationSelect(conversation.id)}
                    >
                      <Icon
                        icon={ArrowRightIcon}
                        className="w-5 h-5 mt-2 mr-2"
                      />
                      <div>
                        <Text className="font-bold mb-1">
                          Personne {conversation.id}
                        </Text>
                        {lastMessage ? (
                          <Text className="text-gray-500 text-sm">
                            {lastMessage.text}
                          </Text>
                        ) : (
                          <Text className="text-gray-500 text-sm">
                            Cliquez pour échanger
                          </Text>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Card>
        </Col>
        <Col
          numColSpan={2}
          className="bg-white ml-20 flex flex-col"
          style={{ maxHeight: "calc(100vh - 150px)" }}
        >
          {currentConversation}
        </Col>
      </Grid>
    </div>
  );
};

export default ChatPage;
