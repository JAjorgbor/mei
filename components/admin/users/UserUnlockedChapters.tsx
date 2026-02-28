'use client'
import { IChapter } from '@/api-utils/global-interfaces/chapter.interfaces'
import CreateChapterModal from '@/components/admin/chapters/CreateChapterDrawer'
import DeleteChapterModal from '@/components/admin/chapters/DeleteChapterModal'
import InputField from '@/components/elements/InputField'
import useGetAllChapters from '@/hooks/requests/useGetAllChapters'
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
import moment from 'moment'
import React, { useCallback, useMemo, useState } from 'react'

const columnHelper = createColumnHelper<IChapter>()
const UserUnlockedChapters = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'all' },
  ])
  const { allChapters: allChaptersData, allChaptersLoading } =
    useGetAllChapters()
  const allChapters = allChaptersData?.items
  const [selectedChapter, setSelectedChapter] = useState<IChapter>()
  const [showDeleteChapterModal, setShowDeleteChapterModal] = useState(false)

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => `Chapter ${row.number}: ${row.chapterLabel}`,
        {
          id: 'title',
          header: 'Title',
          enableHiding: false, // disable hiding for this column

          cell: ({ row: { original }, getValue }) => (
            <div className='flex flex-col text-cloudburst min-w-max'>
              <p className='text-bold text-small capitalize'>{getValue()}</p>
            </div>
          ),
        },
      ),
      columnHelper.accessor('pageCount', {
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
          <Dropdown className='min-w-max'>
            <DropdownTrigger>
              <button type='button'>
                <MoreVertical size={18} />
              </button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key='view'
                href={`/admin/chapters/${info.row.original.id}`}
              >
                View
              </DropdownItem>
              <DropdownItem
                color='danger'
                key='delete'
                onPress={() => {
                  setShowDeleteChapterModal(true)
                  setSelectedChapter(info.row.original)
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [allChapters],
  )

  const table = useReactTable({
    data: allChapters || [],
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
    <>
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
          base: 'max-w-[100dvw] overflow-x-auto overflow-y-hidden',
          th: 'bg-default-200 text-md capitalize text-foreground font-normal',
          td: 'w-max',
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
                  allowsSorting={['title', 'pageCount', 'dateCreated'].includes(
                    header.id,
                  )}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </TableColumn>
              ))}
            </TableHeader>
          )) as any
        }
        <TableBody
          loadingContent={<Spinner label={'Loading, Please wait...' as any} />}
          isLoading={allChaptersLoading}
          emptyContent={
            allChapters && allChapters?.length > 0
              ? 'No chapters found. Try adjusting your filters.'
              : 'No chapters available at the moment.'
          }
        >
          {!allChaptersLoading &&
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
      <DeleteChapterModal
        isOpen={showDeleteChapterModal}
        setIsOpen={setShowDeleteChapterModal}
        selectedChapter={selectedChapter as IChapter}
      />
    </>
  )
}

export default UserUnlockedChapters

const TopContent = ({
  table,
  setGlobalFilter,
}: {
  table: TableType<IChapter>
  setGlobalFilter: any
}) => {
  const [showCreateChapterModal, setShowCreateChapterModal] = useState(false)

  const { allChapters } = useGetAllChapters()
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-6 flex-wrap justify-between'>
          <h3 className='text-2xl font-semibold'>Unlocked Chapters</h3>
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
      <CreateChapterModal
        isOpen={showCreateChapterModal}
        setIsOpen={setShowCreateChapterModal}
      />
    </>
  )
}

const BottomContent = ({ table }: { table: TableType<IChapter> }) => {
  const { allChapters } = useGetAllChapters()
  return (
    allChapters && (
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
      </div>
    )
  )
}
