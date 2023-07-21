"use client";

import {
  InformationCircleIcon,
  StatusOnlineIcon,
  ExclamationIcon,
} from "@heroicons/react/solid";

import React from "react";

import Statistics from "./Overview";

import {
  Card,
  Grid,
  Title,
  Text,
  BadgeDelta,
  DeltaType,
  Flex,
  Badge,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Callout,
} from "@tremor/react";

export type Demandes = {
  name: string;
  media: string;
  match: string;
  deadline: number;
  nationalite: string;
  status: any;
};

export const data = [
  {
    chat: 24,
    waitingchat: 3,
    accreds: 7006,
  },
];

export const requests: Demandes[] = [
  {
    name: "Peter Doe",
    media: "L'Express",
    match: "FID-NZL",
    deadline: 12,
    nationalite: "Français",
    status: "En attente",
  },
  {
    name: "Peter Doe",
    media: "L'Express",
    match: "FRA-NED",
    deadline: 12,
    nationalite: "low",
    status: "Accepté",
  },
  {
    name: "Peter Doe",
    media: "L'Express",
    match: "1,000,000",
    deadline: 12,
    nationalite: "low",
    status: "Refusé",
  },
  {
    name: "Peter Doe",
    media: "L'Express",
    match: "1,000,000",
    deadline: 12,
    nationalite: "low",
    status: "Accepté",
  },
  {
    name: "Peter Doe",
    media: "L'Express",
    match: "1,000,000",
    deadline: 12,
    nationalite: "low",
    status: "En attente",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  Accepté: "moderateIncrease",
  Refusé: "moderateDecrease",
  "En attente": "unchanged",
};

export default function DashboardExample() {
  const chat = data[0].chat;
  const waitingchat = data[0].waitingchat;
  const accreds = data[0].accreds;

  return (
    <main className="px-12 py-12">
      <Title>Dashboard</Title>
      <Text>Cliquez sur un élément pour en savoir plus.</Text>
      <Grid numItemsLg={3} className="mt-6 gap-6">
        <a href="/chat" className="text-blue-600 flex h-full">
          <Card className="">
            <div className="flex items-center mb-10">
              <Title className="mr-2">Chat 24/7</Title>
              <Icon
                icon={InformationCircleIcon}
                variant="simple"
                tooltip="Cliquez pour en savoir plus."
              />
            </div>
            <div className="flex space-x-2 items-center">
              <Badge icon={StatusOnlineIcon}>live</Badge>
              <Text>
                {chat} Chat(s) en direct, {waitingchat} en attente.
              </Text>
            </div>
          </Card>
        </a>
        <a href="/rapports" className="text-blue-600 flex h-full">
          <Card>
            <div className="flex items-center">
              <Title className="mr-2">Rapports</Title>
              <Icon
                icon={InformationCircleIcon}
                variant="simple"
                tooltip="Cliquez pour en savoir plus."
              />
            </div>
            <div className="flex space-x-2 items-center">
              <Callout
                className="mt-4"
                title="N'oubliez pas de faire valider vos communiqués par des
                responsables RP !"
                icon={ExclamationIcon}
                color="rose"
              ></Callout>
            </div>
          </Card>
        </a>
        <a href="/accreditations" className="text-blue-600 flex h-full">
          <Card>
            <div className="flex items-center">
              <Title>Accréditations</Title>
              <Icon
                icon={InformationCircleIcon}
                variant="simple"
                tooltip="Cliquez pour en savoir plus"
              />
            </div>
            <Text className="mt-4">
              {accreds} accréditations attribuées. <br /> Gérez les
              accréditations non livrées jusque là
            </Text>
          </Card>
        </a>
      </Grid>
      <div className="mt-6">
        <a href="/demandes" className="text-blue-600">
          <Card>
            <>
              <div>
                <Flex
                  className="space-x-0.5"
                  justifyContent="start"
                  alignItems="center"
                >
                  <Title>Dernières demandes</Title>
                  <Icon
                    icon={InformationCircleIcon}
                    variant="simple"
                    tooltip="Liste des dernières demandes actives"
                  />
                </Flex>
              </div>
              <div className="flex space-x-2"></div>
              <Table className="mt-6">
                <TableHead>
                  <TableRow>
                    <TableHeaderCell>Nom</TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Media
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Match
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Deadline
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Nationalité
                    </TableHeaderCell>
                    <TableHeaderCell className="text-right">
                      Statut
                    </TableHeaderCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {requests.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="text-right">{item.media}</TableCell>
                      <TableCell className="text-right">{item.match}</TableCell>
                      <TableCell className="text-right">
                        {item.deadline} Jour(s)
                      </TableCell>
                      <TableCell className="text-right">
                        {item.nationalite}
                      </TableCell>
                      <TableCell className="text-right">
                        <BadgeDelta
                          deltaType={deltaTypes[item.status]}
                          size="xs"
                        >
                          {item.status}
                        </BadgeDelta>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          </Card>
        </a>
      </div>
      <div className="mt-6">
        <a href="/statistiques" className="text-blue-600">
          <Card>
            <div className="flex items-center">
              <Title className="mr-2">Statistiques</Title>{" "}
              <Icon
                icon={InformationCircleIcon}
                variant="simple"
                tooltip="Cliquez pour en savoir plus."
              />
              <Text className="ml-2">(7 derniers jours)</Text>
            </div>
            <Statistics />
          </Card>
        </a>
      </div>
    </main>
  );
}
