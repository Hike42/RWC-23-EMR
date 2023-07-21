"use client";

import React from "react";

import {
  BadgeDelta,
  Card,
  Grid,
  DeltaType,
  Flex,
  Metric,
  CategoryBar,
  Text,
  Title,
  AreaChart,
  DonutChart,
  Icon,
} from "@tremor/react";

import { InformationCircleIcon } from "@heroicons/react/solid";

const chartdata = [
  {
    date: "Jul 12",
    Demandes: 2890,
  },
  {
    date: "Jul 13",
    Demandes: 2756,
  },
  {
    date: "Jul 14",
    Demandes: 3322,
  },
  {
    date: "Jul 15",
    Demandes: 3470,
  },
  {
    date: "Jul 16",
    Demandes: 3475,
  },
  {
    date: "Jul 17",
    Demandes: 3129,
  },
];

const cities = [
  {
    name: "En transit 🚚",
    sales: 1908,
  },
  {
    name: "Non expédiées 🏭",
    sales: 1398,
  },
  {
    name: "Livrées ✅",
    sales: 3700,
  },
];

type Kpi = {
  title: string;
  metric: string;
  progress: number;
  target: string;
  delta: string;
  deltaType: DeltaType;
};

const kpiData: Kpi[] = [
  {
    title: "FRA - NZL",
    metric: "470 places réservées",
    progress: 21,
    target: "2 200",
    delta: "21,3%",
    deltaType: "moderateIncrease",
  },
];

const dataFormatter = (number: number) => {
  return "" + Intl.NumberFormat("us").format(number).toString();
};

const valueFormatter = (number: number) =>
  ` ${Intl.NumberFormat("us").format(number).toString()}`;

export default function Statistics() {
  return (
    <>
      <Grid numItemsLg={2} className="mt-6 gap-6">
        {kpiData.map((item) => (
          <Card key={item.title}>
            <Flex alignItems="start">
              <div className="truncate">
                <div className="flex items-center">
                  <Text>{item.title}</Text>
                  <Icon
                    icon={InformationCircleIcon}
                    variant="simple"
                    tooltip="Match à venir. Cliquez pour en savoir plus."
                  />
                </div>
                <Metric className="truncate">{item.metric}</Metric>
              </div>
              <BadgeDelta deltaType={item.deltaType}>{item.delta}</BadgeDelta>
            </Flex>
            <Flex className="mt-4 space-x-2">
              <Text className="truncate">{`${item.progress}% (${item.metric})`}</Text>
              <Text>{item.target}</Text>
            </Flex>
            <CategoryBar
              values={[40, 30, 20, 10]}
              colors={["emerald", "yellow", "orange", "rose"]}
              markerValue={item.progress}
              className="mt-3"
            />
          </Card>
        ))}
        <Card>
          <div className="flex items-center">
            <Title>Accréditations</Title>
            <Icon
              icon={InformationCircleIcon}
              variant="simple"
              tooltip="Sur le total des accréditations attribuées. Cliquez pour en savoir plus"
            />
          </div>
          <Text className="">Statistiques uniquement</Text>
          <DonutChart
            className="mt-6"
            data={cities}
            category="sales"
            index="name"
            valueFormatter={valueFormatter}
            colors={["orange", "red", "green"]}
          />
        </Card>
      </Grid>
      <Card className="mt-4">
        <Title>Demandes en attente à 12h UTC</Title>
        <AreaChart
          className="h-72 mt-4"
          data={chartdata}
          index="date"
          categories={["Demandes"]}
          colors={["red"]}
          valueFormatter={dataFormatter}
        />
      </Card>
    </>
  );
}
