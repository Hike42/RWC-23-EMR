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
  seating: {
    stand: number;
    row: number;
  };
  status: "accepted" | "pending" | "denied";
}

export default function AccessRequestPage() {
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
    seating: {
      stand: 1,
      row: 20,
    },
    status: "pending",
  });

  const handleAccept = () => {
    setRequest({ ...request, status: "accepted" });
  };

  const handleDeny = () => {
    setRequest({ ...request, status: "denied" });
  };

  const handleChat = () => {
    window.open("/chat", "_blank");
  };

  return (
    <div className="flex">
      <div className="ml-20">
        <Title className="ml-4 sticky top-0 mt-28">Demande d'accès</Title>
        <div className="max-w p-4 flex justify-center items-center">
          <Card className="p-2 pr-2 mb-4">
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
              Placement: Tribune {request.seating.stand}, Rangée{" "}
              {request.seating.row}
            </Text>
            <Text className="text-xl mb-4">
              Statut de la demande: {request.status}
            </Text>

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
                Accepter
              </button>
              <button
                className="p-2 bg-red-500 text-white"
                onClick={handleDeny}
              >
                Refuser
              </button>
            </div>
          </Card>
        </div>
      </div>
      <div className="shade ml-40">
        <img
          src="/src/assets/logowhite.svg"
          alt="Plan du stade"
          className="image"
        />
      </div>
    </div>
  );
}
