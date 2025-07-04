import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import {Chip} from "@heroui/chip";

import { getPaginatedReservationsByUser } from "../services/reservations.service";
import type { Reservation, Timestamp } from "../types";
import type { SortDescriptor } from "@heroui/table";
import type { QueryDocumentSnapshot } from "firebase/firestore";
import { useActiveReservations } from "../hooks/useActiveReservations";

export default function ReservationsTable({
  studentCode,
  externalReservations,
}: {
  studentCode: string;
  externalReservations?: Reservation[] | null;
}) {
  // Estados y hooks de paginación solo si no está filtrado
  const { activeReservations } = useActiveReservations(studentCode);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "createdAt",
    direction: "descending",
  });
  const cursors = useRef<Record<number, QueryDocumentSnapshot | undefined>>({});

  // Si hay externalReservations (filtro), las usamos directo
  useEffect(() => {
    if (externalReservations) {
      setReservations(externalReservations);
      setLoading(false);
      return;
    }

    // Solo cargar desde Firestore si no hay filtro
    const fetchData = async () => {
      setLoading(true);
      try {
        const cursor = page === 1 ? undefined : cursors.current[page - 1];

        const result = await getPaginatedReservationsByUser(
          studentCode,
          rowsPerPage,
          cursor,
          sortDescriptor.direction === "descending" ? "desc" : "asc"
        );

        setReservations(result.reservations);
        cursors.current[page] = result.lastVisible;
        setHasMore(result.reservations.length === rowsPerPage);
      } catch (err) {
        console.error("Error loading reservations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentCode, rowsPerPage, page, sortDescriptor, externalReservations, activeReservations]);

  /*const displayedItems = useMemo(() => {
    if (page !== 1) {
      return reservations;
      console.log(reservations)
    }
  
    const itemsCopy = [...reservations];
    for (let i = 0; i < activeReservations.length && i < 2; i++) {
      itemsCopy[i] = activeReservations[i];
    }
  
    console.log(itemsCopy)
    return itemsCopy;
  }, [page, reservations, activeReservations]);*/

  const sortedItems = useMemo(() => {
    const sorted = [...reservations].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof Reservation];
      const second = b[sortDescriptor.column as keyof Reservation];
  
      if (first === undefined || second === undefined) return 0;
  
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  
    return sorted;
  }, [reservations, sortDescriptor]);

  const stateColorMap: Record<string, [color: "warning" | "danger" | "success" | "default", label: string]> = {
    waiting: ["warning", "ESPERANDO"],
    cancelled: ["danger", "CANCELADA"],
    completed: ["success", "COMPLETADA"],
  };

  const renderCell = useCallback((reservation: Reservation, columnKey: React.Key) => {
    const cellValue = reservation[columnKey as keyof Reservation];

    switch (columnKey) {
      case "washerId":
        return <span className="font-medium">{cellValue as string}</span>;
      case "createdAt":
        return (
          <span>
            {(cellValue as Timestamp).toDate().toLocaleString("es-CO")}
          </span>
        );
      case "state":
        const state = cellValue as string;
        const color = stateColorMap[state]?.[0] || "default";
        const label = stateColorMap[state]?.[1] || "INVALIDO";
        return (
          <Chip color={color} variant="flat">
            {label}
          </Chip>
        );
      default:
        return String(cellValue);
    }
  }, []);

  const headerColumns = [
    { name: "ID DE LA LAVADORA", uid: "washerId", sortable: true },
    { name: "FECHA", uid: "createdAt", sortable: true },
    {name: "ESTADO", uid: "state", sortable: false },
  ];

  const onRowsPerPageChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
    cursors.current = {}; // Reset cursors
  }, []);

  const onSortChange = useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
    setPage(1);
    cursors.current = {}; 
  }, []);

  return (
    <div className="space-y-4 border p-4 rounded-lg bg-card shadow-lg">
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">
          Página {page}
        </span>
        <label className="text-sm text-gray-500">
          Rows:
          <select className="ml-2" value={rowsPerPage} onChange={onRowsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>

      <Table
        isHeaderSticky
        aria-label="Reservations Table"
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              allowsSorting={column.sortable}
              align="start"
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No hay reservas"}
          items={sortedItems}
          isLoading={loading}
          loadingContent={<Spinner label="Consultando" variant="default" color="primary" />}
        >
          {(item) => (
            <TableRow key={`${item.id}`}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="py-2 px-2 flex justify-between items-center">
        <Button isDisabled={page === 1} size="sm" variant="flat" onPress={() => setPage(p => p - 1)}>
          Previous
        </Button>
        <span className="text-sm text-gray-500">Página {page}</span>
        <Button isDisabled={!hasMore} size="sm" variant="flat" onPress={() => setPage(p => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}
