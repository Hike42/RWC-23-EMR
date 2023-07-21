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
  Metric,
} from "@tremor/react";
import ReactPaginate from "react-paginate";
import { navigate } from "@reach/router";

export type Accreditations = {
  nom: string;
  media: string;
  matche: string;
  statut: any;
  nationalite: string;
};

export const accreditations: Accreditations[] = [
  {
    nom: "Anna Oui",
    media: "L'Express",
    matche: "FID-NZL",
    statut: "En attente",
    nationalite: "Français",
  },
  {
    nom: "Anna Oui",
    media: "L'Express",
    matche: "FID-NZL",
    statut: "En attente",
    nationalite: "Français",
  },
  {
    nom: "Anna Oui",
    media: "L'Express",
    matche: "FID-NZL",
    statut: "En attente",
    nationalite: "Français",
  },
];

const deltaTypes: { [key: string]: DeltaType } = {
  Accepté: "moderateIncrease",
  Refusé: "moderateDecrease",
  "En attente": "unchanged",
};

export default function AccreditationsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const filteredItems = accreditations.filter((item) =>
    item.nom.toLowerCase().includes(searchValue.toLowerCase())
  );

  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(0);
  }, [filteredItems, searchValue]);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleRequest = () => {
    window.open("/accreditations/:id", "_blank");
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  return (
    <div className="flex justify-center w-screen overflow-x-hidden">
      <Card className="m-10 relative">
        <div className="absolute top-0 right-0 mt-2 mr-2">
          <Title className="mr-8 mt-6">
            {filteredItems.length} Accréditation(s) active(s).
          </Title>
        </div>
        <div>
          <Flex
            className="space-x-0.5 mb-4"
            justifyContent="start"
            alignItems="center"
          >
            <Title>Accréditations</Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Liste des dernières accréditations actives"
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
              <TableHeaderCell className="text-right">Statut</TableHeaderCell>
              <TableHeaderCell className="text-right">
                Nationalité
              </TableHeaderCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currentItems.map((item) => (
              <TableRow
                key={item.nom}
                onClick={handleRequest}
                className="cursor-pointer"
              >
                <TableCell>{item.nom}</TableCell>
                <TableCell className="text-right">{item.media}</TableCell>
                <TableCell className="text-right">{item.matche}</TableCell>
                <TableCell className="text-right">
                  <BadgeDelta deltaType={deltaTypes[item.statut]} size="xs">
                    {item.statut}
                  </BadgeDelta>
                </TableCell>
                <TableCell className="text-right">{item.nationalite}</TableCell>
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
