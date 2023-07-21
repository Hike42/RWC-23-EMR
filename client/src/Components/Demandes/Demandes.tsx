import { InformationCircleIcon } from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import {
  Card,
  Title,
  BadgeDelta,
  DeltaType,
  Flex,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { navigate } from "@reach/router";
import ReactPaginate from "react-paginate";

export type Demandes = {
  name: string;
  media: string;
  match: string;
  deadline: number;
  nationalite: string;
  status: any;
};

export const requests: Demandes[] = [
  {
    name: "Peter Oui",
    media: "L'Express",
    match: "FID-NZL",
    deadline: 12,
    nationalite: "Français",
    status: "En attente",
  },
  {
    name: "Henri Oui",
    media: "L'Express",
    match: "FID-NZL",
    deadline: 12,
    nationalite: "Français",
    status: "En attente",
  },
  {
    name: "Victor Oui",
    media: "L'Express",
    match: "FID-NZL",
    deadline: 12,
    nationalite: "Français",
    status: "En attente",
  },
  {
    name: "Anna Oui",
    media: "L'Express",
    match: "FID-NZL",
    deadline: 12,
    nationalite: "Français",
    status: "En attente",
  },
  // ...
];

const deltaTypes: { [key: string]: DeltaType } = {
  Accepté: "moderateIncrease",
  Refusé: "moderateDecrease",
  "En attente": "unchanged",
};

export default function DashboardExample() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredItems = requests.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(0); // Réinitialiser la page courante lors d'un changement de filtre ou de recherche
  }, [filteredItems, searchValue]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleRequest = () => {
    window.open("/demandes/:id", "_blank");
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="flex justify-center w-screen overflow-x-hidden">
      <Card className="m-10 relative">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Title className="mr-8 mt-6">
            {filteredItems.length} Demande(s) active(s).
          </Title>
        </div>
        <div>
          <Flex
            className="space-x-0.5 mb-4"
            justifyContent="start"
            alignItems="center"
          >
            <Title>Demandes</Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Liste des dernières demandes actives"
            />
          </Flex>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Rechercher par nom..."
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <Table className="mt-6">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Nom</TableHeaderCell>
              <TableHeaderCell className="text-right">Media</TableHeaderCell>
              <TableHeaderCell className="text-right">Match</TableHeaderCell>
              <TableHeaderCell className="text-right">Deadline</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Nationalité
              </TableHeaderCell>
              <TableHeaderCell className="text-right">Statut</TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentItems.map((item) => (
              <TableRow
                key={item.name}
                onClick={handleRequest}
                className="cursor-pointer"
              >
                <TableCell>{item.name}</TableCell>
                <TableCell className="text-right">{item.media}</TableCell>
                <TableCell className="text-right">{item.match}</TableCell>
                <TableCell className="text-right">
                  {item.deadline} Jour(s)
                </TableCell>
                <TableCell className="text-right">{item.nationalite}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={deltaTypes[item.status]} size="xs">
                    {item.status}
                  </BadgeDelta>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex justify-center">
          <ReactPaginate
            previousLabel={"Précédent"}
            nextLabel={"Suivant"}
            breakLabel={"..."}
            pageCount={pageCount}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination-link"}
            nextLinkClassName={"pagination-link"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
            className="flex justify-center w-full gap-4"
          />
        </div>
      </Card>
    </div>
  );
}
