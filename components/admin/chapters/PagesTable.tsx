'use client'
import { IPage } from '@/api-utils/admin/interfaces/page.interface'
import DeletePageModal from '@/components/admin/chapters/DeletePageModal'
import InputField from '@/components/elements/InputField'
import useGetPagesForChapter from '@/hooks/requests/useGetPagesForChapter'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
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
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useMemo, useState } from 'react'

const columnHelper = createColumnHelper<IPage>()

const PagesTable = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'all' },
  ])

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const { chapterId } = useParams()
  const [showDeletePageModal, setShowDeletePageModal] = useState(false)
  const [selectedPage, setSelectedPage] = useState<IPage>()
  const { pages, pagesLoading } = useGetPagesForChapter(chapterId as string)
  const columns = useMemo(
    () => [
      columnHelper.accessor(`textContent`, {
        id: 'textContent',
        header: 'Preview',
        enableHiding: false, // disable hiding for this column

        cell: ({ row: { original }, getValue }) => {
          const parser = new DOMParser()
          const doc = parser.parseFromString(getValue(), 'text/html')

          // Step 2: Extract raw text (no tags)
          const rawText = doc.body.textContent

          return (
            <div className='flex flex-col text-cloudburst'>
              <p className='text-bold text-small capitalize'>
                {rawText?.slice(0, 40)}
              </p>
            </div>
          )
        },
      }),
      columnHelper.accessor('textCount', {
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
        filterFn: 'statusFilter' as any,
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
          <Dropdown className='min-w-max'>
            <DropdownTrigger>
              <button type='button'>
                <MoreVertical />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key='manage'
                href={`/admin/chapters/${chapterId}/pages/${info.row.original.id}`}
              >
                Manage
              </DropdownItem>
              <DropdownItem
                key='delete'
                color='danger'
                onPress={() => {
                  setShowDeletePageModal(true)
                  setSelectedPage(info.row.original)
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [pages]
  )
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
      statusFilter: (row, columnId, filterValue) => {
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
          wrapper: 'overflow-x-auto',
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
      <DeletePageModal
        selectedPage={selectedPage!}
        isOpen={showDeletePageModal}
        setIsOpen={setShowDeletePageModal}
      />
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
  const { chapterId } = useParams()
  const { pages } = useGetPagesForChapter(chapterId as string)

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
  const { chapterId } = useParams()
  const { pages } = useGetPagesForChapter(chapterId as string)

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
