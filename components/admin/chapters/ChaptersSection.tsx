'use client'
import Link from 'next/link'
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
import React, { useCallback, useState } from 'react'

interface IChapter {
  id: number
  title: string
  status: 'published' | 'draft' | 'review'
  pages: number
  lastUpdated: string
}

const chapters: IChapter[] = [
  {
    id: 1,
    title: 'Chapter 1: The Beginning',
    status: 'published',
    pages: 32,
    lastUpdated: '2023-05-15',
  },
  {
    id: 2,
    title: 'Chapter 2: The Discovery',
    status: 'published',
    pages: 28,
    lastUpdated: '2023-05-12',
  },
  {
    id: 3,
    title: 'Chapter 3: The Journey',
    status: 'published',
    pages: 35,
    lastUpdated: '2023-05-10',
  },
  {
    id: 4,
    title: 'Chapter 4: The Challenge',
    status: 'review',
    pages: 38,
    lastUpdated: '2023-05-08',
  },
  {
    id: 5,
    title: 'Chapter 5: The Revelation',
    status: 'draft',
    pages: 29,
    lastUpdated: '2023-05-05',
  },
  {
    id: 6,
    title: 'Chapter 6: The Confrontation',
    status: 'draft',
    pages: 31,
    lastUpdated: '2023-05-03',
  },
  {
    id: 7,
    title: 'Chapter 7: The Decision',
    status: 'draft',
    pages: 27,
    lastUpdated: '2023-04-30',
  },
  {
    id: 8,
    title: 'Chapter 8: The Sacrifice',
    status: 'draft',
    pages: 34,
    lastUpdated: '2023-04-28',
  },
  {
    id: 9,
    title: 'Chapter 9: The Aftermath',
    status: 'draft',
    pages: 25,
    lastUpdated: '2023-04-25',
  },
  {
    id: 10,
    title: 'Chapter 10: The Resolution',
    status: 'draft',
    pages: 33,
    lastUpdated: '2023-04-22',
  },
  {
    id: 11,
    title: 'Chapter 11: The New Beginning',
    status: 'draft',
    pages: 26,
    lastUpdated: '2023-04-20',
  },
  {
    id: 12,
    title: 'Chapter 12: The Epilogue',
    status: 'draft',
    pages: 18,
    lastUpdated: '2023-04-18',
  },
]

const columnHelper = createColumnHelper<IChapter>()
const ChaptersSection = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [chaptersLoading, setChaptersLoading] = useState(false)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'all' },
  ])

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const columns = [
    columnHelper.accessor(`title`, {
      id: 'title',
      header: 'Title',
      enableHiding: false, // disable hiding for this column

      cell: ({ row: { original }, getValue }) => (
        <div className='flex flex-col text-cloudburst'>
          <p className='text-bold text-small capitalize'>{getValue()}</p>
        </div>
      ),
    }),
    columnHelper.accessor('pages', {
      header: 'Pages',
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
          as={Link}
          href={`/admin/chapters/${info.row.original.id}`}
          className='py-1 px-2'
        >
          Manage Chapter
        </Button>
      ),
    }),
  ]
  // const { allAgencyContacts, allAgencyContactsLoading } =
  //   useGetAllAgencyContacts()

  const table = useReactTable({
    data: chapters || [],
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
    <div className='space-y-6'>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/chapters'>Chapters</BreadcrumbItem>
      </Breadcrumbs>
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
                  allowsSorting={['title', 'pages'].includes(header.id)}
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
          isLoading={chaptersLoading}
          emptyContent={
            chapters && chapters?.length > 0
              ? 'No chapters found. Try adjusting your filters.'
              : 'No chapters available at the moment.'
          }
        >
          {!chaptersLoading &&
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

export default ChaptersSection

const TopContent = ({
  table,
  setGlobalFilter,
}: {
  table: TableType<IChapter>
  setGlobalFilter: any
}) => {
  //   const { allAgencyContacts } = useGetAllAgencyContacts()
  const getStatusCount = useCallback(
    (status: string) => {
      if (chapters) {
        if (status == 'all') return chapters.length
        else
          return chapters.filter(
            (each) => each.status.toLocaleLowerCase() == status
          ).length
      }
    },
    [chapters, table.getColumn('status')?.getFilterValue()]
  )
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-6 flex-wrap justify-between'>
        <div className='flex gap-4 flex-wrap'>
          <Button color='secondary' variant='shadow'>
            Add Chapter
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
          placeholder='Search chapters'
          register={{ onChange: (e: any) => setGlobalFilter(e.target.value) }}
        />
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-default-400 text-small'>
          <span className='capitalize'>
            {String(table.getColumn('status')?.getFilterValue())}
          </span>{' '}
          chapters ({table.getFilteredRowModel().rows.length || 0})
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

const BottomContent = ({ table }: { table: TableType<IChapter> }) => {
  //   const { allAgencyContacts } = useGetAllAgencyContacts()
  return (
    chapters && (
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
