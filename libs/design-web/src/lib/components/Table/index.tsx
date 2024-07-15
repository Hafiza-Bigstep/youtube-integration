import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';

type ColomnProps = {
  key: string;
  title: string;
  textAlign?: 'left' | 'center' | 'right';
  sortable?: boolean;
};

export type TableProps = {
  data: any[];
  coloums: ColomnProps[];
};

export const Table: React.FC<TableProps> = ({ data, coloums }) => {
  const dataColoumn = coloums.map(coloum => {
    return {
      accessor: coloum.key,
      title: coloum.title,
      textAlign: coloum.textAlign || 'left',
      sortable: coloum.sortable || false,
    };
  });
  const rowData = data.map((record, index) => {
    return {
      id: index,
      ...record,
    };
  });

  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
  const [recordsData, setRecordsData] = useState(initialRecords);

  const [selectedRecords, setSelectedRecords] = useState<any>([]);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'id',
    direction: 'asc',
  });

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecordsData([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return rowData.filter(item => {
        return (
          item.id.toString().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    const data = sortBy(initialRecords, sortStatus.columnAccessor);
    setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortStatus]);

  return (
    <div className="panel mt-6">
      <div className="flex md:items-center md:flex-row flex-col mb-5 gap-5">
        <h5 className="font-semibold text-lg dark:text-white-light">Search</h5>
        <div className="ltr:ml-auto rtl:mr-auto">
          <input
            type="text"
            className="form-input w-auto"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="datatables">
        <DataTable
          className="whitespace-nowrap table-hover"
          highlightOnHover={true}
          withColumnBorders={true}
          withTableBorder={true}
          totalRecords={initialRecords.length}
          recordsPerPage={pageSize}
          page={page}
          onPageChange={p => setPage(p)}
          recordsPerPageOptions={PAGE_SIZES}
          onRecordsPerPageChange={setPageSize}
          sortStatus={sortStatus}
          onSortStatusChange={setSortStatus}
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          minHeight={200}
          paginationText={({ from, to, totalRecords }) =>
            `Showing  ${from} to ${to} of ${totalRecords} entries`
          }
          columns={dataColoumn}
          records={recordsData}
        />
      </div>
    </div>
  );
};

export default Table;
