'use client'
import InputField from '@/components/elements/InputField'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  Pagination,
  Selection,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react'
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  Table as TableType,
  useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useState } from 'react'

interface IPage {
  id: number
  preview: string
  status: 'published' | 'draft' | 'review'
  words: number
  lastUpdated: string
}

const pages: IPage[] = [
  {
    id: 1,
    preview: 'Page 1: The Beginning',
    status: 'published',
    words: 32,
    lastUpdated: '2023-05-15',
  },
  {
    id: 2,
    preview: 'Page 2: The Discovery',
    status: 'published',
    words: 28,
    lastUpdated: '2023-05-12',
  },
  {
    id: 3,
    preview: 'Page 3: The Journey',
    status: 'published',
    words: 35,
    lastUpdated: '2023-05-10',
  },
  {
    id: 4,
    preview: 'Page 4: The Challenge',
    status: 'review',
    words: 38,
    lastUpdated: '2023-05-08',
  },
  {
    id: 5,
    preview: 'Page 5: The Revelation',
    status: 'draft',
    words: 29,
    lastUpdated: '2023-05-05',
  },
  {
    id: 6,
    preview: 'Page 6: The Confrontation',
    status: 'draft',
    words: 31,
    lastUpdated: '2023-05-03',
  },
  {
    id: 7,
    preview: 'Page 7: The Decision',
    status: 'draft',
    words: 27,
    lastUpdated: '2023-04-30',
  },
  {
    id: 8,
    preview: 'Page 8: The Sacrifice',
    status: 'draft',
    words: 34,
    lastUpdated: '2023-04-28',
  },
  {
    id: 9,
    preview: 'Page 9: The Aftermath',
    status: 'draft',
    words: 25,
    lastUpdated: '2023-04-25',
  },
  {
    id: 10,
    preview: 'Page 10: The Resolution',
    status: 'draft',
    words: 33,
    lastUpdated: '2023-04-22',
  },
  {
    id: 11,
    preview: 'Page 11: The New Beginning',
    status: 'draft',
    words: 26,
    lastUpdated: '2023-04-20',
  },
  {
    id: 12,
    preview: 'Page 12: The Epilogue',
    status: 'draft',
    words: 18,
    lastUpdated: '2023-04-18',
  },
  {
    id: 7,
    preview: 'Page 7: The Decision',
    status: 'draft',
    words: 27,
    lastUpdated: '2023-04-30',
  },
  {
    id: 8,
    preview: 'Page 8: The Sacrifice',
    status: 'draft',
    words: 34,
    lastUpdated: '2023-04-28',
  },
  {
    id: 9,
    preview: 'Page 9: The Aftermath',
    status: 'draft',
    words: 25,
    lastUpdated: '2023-04-25',
  },
  {
    id: 10,
    preview: 'Page 10: The Resolution',
    status: 'draft',
    words: 33,
    lastUpdated: '2023-04-22',
  },
  {
    id: 11,
    preview: 'Page 11: The New Beginning',
    status: 'draft',
    words: 26,
    lastUpdated: '2023-04-20',
  },
  {
    id: 12,
    preview: 'Page 12: The Epilogue',
    status: 'draft',
    words: 18,
    lastUpdated: '2023-04-18',
  },
]

const columnHelper = createColumnHelper<IPage>()

const PagesTable = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [pagesLoading, setPagesLoading] = useState(false)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'all' },
  ])

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const columns = [
    columnHelper.accessor(`preview`, {
      id: 'preview',
      header: 'Preview',
      enableHiding: false, // disable hiding for this column

      cell: ({ row: { original }, getValue }) => (
        <div className='flex flex-col text-cloudburst'>
          <p className='text-bold text-small capitalize'>{getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor('words', {
      header: 'Words',
      enableHiding: false, // disable hiding for this column
      cell: (info) => (
        <div className='flex flex-col '>
          <p className='text-bold text-small lowercase'>{info.getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor(`status`, {
      header: 'Status',
      filterFn: 'contactStatusFilter' as any,
      cell: ({ getValue }) => (
        <div className='inline-block'>
          <Chip
            size='sm'
            variant='flat'
            className='capitalize'
            radius='sm'
            color={
              getValue() == 'published'
                ? 'success'
                : getValue() == 'draft'
                ? 'warning'
                : 'danger'
            }
          >
            {getValue()}
          </Chip>
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      enableHiding: false, // disable hiding for this column
      cell: (info) => (
        <Button
          size='sm'
          color='primary'
          variant='ghost'
          href={`/pages/${info.row.original.id}`}
          className='py-1 px-2'
        >
          Manage Page
        </Button>
      ),
    }),
  ]
  // const { allAgencyContacts, allAgencyContactsLoading } =
  //   useGetAllAgencyContacts()

  const table = useReactTable({
    data: pages || [],
    columns,
    state: {
      globalFilter,
      columnFilters,
      sorting,
      pagination,
    },
    initialState: {},
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // needed for client-side global filtering
    getSortedRowModel: getSortedRowModel(), // Enables sorting functionality
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    filterFns: {
      contactStatusFilter: (row, columnId, filterValue) => {
        if (filterValue == 'all') return true
        return row.original.status.toLowerCase() == filterValue
      },
    },
  })

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  return (
    <div className='space-y-6 overflow-x-auto'>
      <Table
        aria-label='Recent Contacts'
        isHeaderSticky
        bottomContent={<BottomContent table={table} />}
        bottomContentPlacement='outside'
        selectedKeys={selectedKeys}
        topContent={
          <TopContent table={table} setGlobalFilter={setGlobalFilter} />
        }
        classNames={{
          th: 'bg-default-200 text-md capitalize text-foreground font-normal',
          thead: '[&>tr]:first:shadow-none',
          tbody: 'divide-y',
          table: 'min-w-max',
          wrapper: 'overflow-x-auto  max-w-[87vw]',
          base: 'overflow-hidden p-1 min-h-min',
        }}
        topContentPlacement='outside'
        onSelectionChange={setSelectedKeys}
      >
        {
          table.getHeaderGroups().map((headerGroup) => (
            <TableHeader
              // columns={headerColumns}
              key={headerGroup.id}
            >
              {headerGroup.headers.map((header) => (
                <TableColumn
                  key={header.id}
                  align={header.id === 'actions' ? 'center' : 'start'}
                  allowsSorting={['preview', 'pages'].includes(header.id)}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableColumn>
              ))}
            </TableHeader>
          )) as any
        }
        <TableBody
          loadingContent={<Spinner label={'Loading, Please wait...' as any} />}
          isLoading={pagesLoading}
          emptyContent={
            pages && pages?.length > 0
              ? 'No pages found. Try adjusting your filters.'
              : 'No pages available at the moment.'
          }
        >
          {!pagesLoading &&
            (table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            )) as any)}
        </TableBody>
      </Table>
    </div>
  )
}

export default PagesTable

const TopContent = ({
  table,
  setGlobalFilter,
}: {
  table: TableType<IPage>
  setGlobalFilter: any
}) => {
  //   const { allAgencyContacts } = useGetAllAgencyContacts()

  const { chapterId } = useParams()
  const getStatusCount = useCallback(
    (status: string) => {
      if (pages) {
        if (status == 'all') return pages.length
        else
          return pages.filter(
            (each) => each.status.toLocaleLowerCase() == status
          ).length
      }
    },
    [pages, table.getColumn('status')?.getFilterValue()]
  )
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-6 flex-wrap justify-between'>
        <div className='flex gap-4 flex-wrap'>
          <Button
            as={Link}
            color='secondary'
            variant='shadow'
            href={`/admin/chapters/${chapterId}/add-page`}
          >
            Add Page
          </Button>
          <InputField
            type='select'
            className='w-36'
            value={table.getColumn('status')?.getFilterValue() as string}
            onChange={(value) => {
              table.getColumn('status')?.setFilterValue(value)
            }}
            options={[
              { value: 'all', label: `All (${getStatusCount('all')})` },
              {
                value: 'published',
                label: `Published (${getStatusCount('published')})`,
              },
              { value: 'draft', label: `Draft (${getStatusCount('draft')})` },
              {
                value: 'review',
                label: `Review (${getStatusCount('review')})`,
              },
            ]}
          />
        </div>
        <InputField
          type='search'
          placeholder='Search pages'
          register={{ onChange: (e: any) => setGlobalFilter(e.target.value) }}
        />
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-default-400 text-small'>
          <span className='capitalize'>
            {String(table.getColumn('status')?.getFilterValue())}
          </span>{' '}
          pages ({table.getFilteredRowModel().rows.length || 0})
        </span>
        <label className='flex items-center text-default-400 text-small'>
          Rows per page:
          <select
            className='bg-transparent outline-none text-default-400 text-small'
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='30'>30</option>
          </select>
        </label>
      </div>
    </div>
  )
}

const BottomContent = ({ table }: { table: TableType<IPage> }) => {
  //   const { allAgencyContacts } = useGetAllAgencyContacts()
  return (
    pages && (
      <div className='py-2 px-2 flex justify-between items-center'>
        <div className='flex-grow flex justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='primary'
            page={table.getState().pagination.pageIndex + 1}
            total={table.getPageCount() || 0}
            onChange={(value) => table.setPageIndex(value - 1)}
            className='text-white'
          />
        </div>
        <div className='hidden sm:flex  justify-end gap-2'>
          <Button
            size='sm'
            color='primary'
            onPress={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size='sm'
            color='primary'
            onPress={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    )
  )
}
