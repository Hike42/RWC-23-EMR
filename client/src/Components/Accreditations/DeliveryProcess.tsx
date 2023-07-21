import React, { useState } from "react";
import { Card, Title, Text, Grid, Bold } from "@tremor/react";
import { navigate } from "@reach/router";
import "./Shade.css";

interface IRequest {
  match: {
    country1: string;
    country2: string;
  };
  journalist: {
    firstName: string;
    lastName: string;
  };
  nationality: string;
  daysToMatch: number;
  delivery: {
    service: string;
    id: number;
  };
  status: "Livré" | "En cours" | "Annulé";
}

export default function DeliveryProcess() {
  const [request, setRequest] = useState<IRequest>({
    match: {
      country1: "France",
      country2: "Angleterre",
    },
    journalist: {
      firstName: "John",
      lastName: "Doe",
    },
    nationality: "British",
    daysToMatch: 2,
    delivery: {
      service: "MondialRelay",
      id: 20,
    },
    status: "En cours",
  });

  const handleAccept = () => {
    setRequest({ ...request, status: "Livré" });
  };

  const handleDeny = () => {
    setRequest({ ...request, status: "Annulé" });
  };

  const handleChat = () => {
    window.open("/chat", "_blank");
  };

  return (
    <div className="flex">
      <div className="shade ml-0">
        <img
          src="/src/assets/logowhite.svg"
          alt="Plan du stade"
          className="image"
        />
      </div>
      <div className="ml-12">
        <Title className="ml-4 sticky top-0 mt-28">
          Statut Livraison Accréditation
        </Title>
        <div className="max-w p-4 flex justify-center items-center">
          <Card className="p-2 pr-4 mb-4">
            <Text className="text-xl mb-4">
              Match: {request.match.country1} vs {request.match.country2}
            </Text>
            <Text className="text-xl mb-4">
              Journaliste: {request.journalist.firstName}{" "}
              {request.journalist.lastName}
            </Text>
            <Text className="text-xl mb-4">
              Nationalité: {request.nationality}
            </Text>
            <Text className="text-xl mb-4">
              Nombre de jours avant le match: {request.daysToMatch}
            </Text>
            <Text className="text-xl mb-4">
              Service de livraison et ID : {request.delivery.service} -
              {request.delivery.id}
            </Text>
            <Text className="text-xl mb-4">Statut: {request.status}</Text>

            <div className="mt-4">
              <button
                className="mr-4 p-2 bg-blue-500 text-white"
                onClick={handleChat}
              >
                Chat
              </button>
              <button
                className="mr-4 p-2 bg-green-500 text-white"
                onClick={handleAccept}
              >
                Livré
              </button>
              <button
                className="p-2 bg-red-500 text-white"
                onClick={handleDeny}
              >
                Annulé
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
