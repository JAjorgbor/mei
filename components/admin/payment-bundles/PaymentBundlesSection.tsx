'use client'
import { IPaymentBundle } from '@/api-utils/global-interfaces/payment-bundle.interfaces'
import CreatePaymetBundleModal from '@/components/admin/payment-bundles/CreatePaymentBundleModal'
import InputField from '@/components/elements/InputField'
import useGetAllPaymentBundles from '@/hooks/requests/useGetAllPaymentBundles'
import { currencyFormatter } from '@/utils/currencyFormatter'
import truncateText from '@/utils/truncateText'
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
import React, { useCallback, useMemo, useState } from 'react'

const columnHelper = createColumnHelper<IPaymentBundle>()

const PaymentBundlesSection = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'bundleType', value: 'all' },
  ])

  const [selectedChapter, setSelectedChapter] = useState<IPaymentBundle>()
  const [showDeleteChapterModal, setShowDeleteChapterModal] = useState(false)

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const { allPaymentBundles, allPaymentBundlesLoading } =
    useGetAllPaymentBundles()

  const columns = useMemo(
    () => [
      columnHelper.accessor('amount', {
        header: 'Amount',
        enableHiding: false, // disable hiding for this column
        cell: (info) => (
          <div className='flex flex-col '>
            <p className='text-bold text-small lowercase'>
              {currencyFormatter(info.getValue())}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor(`bundleType`, {
        header: 'Bundle Type',
        filterFn: 'bundleTypeFilter' as any,
        cell: ({ getValue }) => {
          const bundleTypeColors: Record<
            IPaymentBundle['bundleType'],
            | 'primary'
            | 'secondary'
            | 'success'
            | 'warning'
            | 'danger'
            | 'default'
          > = {
            cash: 'primary',
            purchaseOfBooks: 'success',
            transferringStarsToOtherUsers: 'default',
            cashPromo: 'warning',
            bookPromo: 'secondary',
          }
          return (
            <div className='inline-block'>
              <Chip
                size='sm'
                variant='flat'
                className='capitalize'
                radius='sm'
                color={bundleTypeColors[getValue()]}
              >
                {getValue()}
              </Chip>
            </div>
          )
        },
      }),
      columnHelper.accessor(`description`, {
        header: 'Description',
        cell: ({ getValue }) => (
          <div className='inline-block'>{truncateText(getValue(), 30)}</div>
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
                  //   setSelectedChapter(info.row.original)
                }}
              >
                Delete
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ),
      }),
    ],
    [allPaymentBundles]
  )

  const table = useReactTable({
    data: allPaymentBundles || [],
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
      bundleTypeFilter: (row, columnId, filterValue) => {
        if (filterValue == 'all') return true
        return row.original.bundleType.toLowerCase() == filterValue
      },
    },
  })

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  return (
    <div className='space-y-6'>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/payment-bundles'>
          Payment Bundles
        </BreadcrumbItem>
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
                    header.id
                  )}
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
          isLoading={allPaymentBundlesLoading}
          emptyContent={
            allPaymentBundles && allPaymentBundles?.length > 0
              ? 'No payment bundles found. Try adjusting your filters.'
              : 'No payment bundles available at the moment.'
          }
        >
          {2 < 4 &&
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

export default PaymentBundlesSection

const TopContent = ({
  table,
  setGlobalFilter,
}: {
  table: TableType<IPaymentBundle>
  setGlobalFilter: any
}) => {
  const [showCreatePaymetBundleModal, setShowCreatePaymetBundleModal] =
    useState(false)
  const { allPaymentBundles } = useGetAllPaymentBundles()

  const getCount = useCallback(
    (bundleType: string) => {
      if (allPaymentBundles) {
        if (bundleType == 'all') return allPaymentBundles.length
        else
          return allPaymentBundles.filter(
            (each) => each.bundleType.toLocaleLowerCase() == bundleType
          ).length
      }
      return '-'
    },
    [allPaymentBundles, table.getColumn('bundleType')?.getFilterValue()]
  )

  const bundleTypeOptions = [
    { value: 'cash', label: `Cash (${getCount('cash')})` },
    {
      value: 'purchaseOfBooks',
      label: `purchaseOfBooks (${getCount('purchaseOfBooks')})`,
    },
    {
      value: 'Transferring Stars To Other Users',
      label: `Transferring Stars To Other Users (${getCount(
        'Transferring Stars To Other Users'
      )})`,
    },
    {
      value: 'Cash Promo',
      label: `Cash Promo (${getCount('Cash Promo')})`,
    },
    {
      value: 'bookPromo',
      label: `bookPromo (${getCount('bookPromo')})`,
    },
  ]

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-6 flex-wrap justify-between w-full'>
          <div className='flex gap-4 flex-wrap'>
            <Button
              color='primary'
              variant='shadow'
              onPress={() => setShowCreatePaymetBundleModal(true)}
            >
              Add Bundle
            </Button>
            <InputField
              type='select'
              className='w-36'
              value={table.getColumn('bundleType')?.getFilterValue() as string}
              onChange={(value) => {
                table.getColumn('bundleType')?.setFilterValue(value)
              }}
              options={[
                { value: 'all', label: `All (${getCount('all')})` },
                ...bundleTypeOptions,
              ]}
            />
          </div>
          <InputField
            type='search'
            placeholder='Search payment bundles'
            register={{ onChange: (e: any) => setGlobalFilter(e.target.value) }}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            <span className='capitalize'>
              {String(table.getColumn('bundleType')?.getFilterValue())}
            </span>{' '}
            payment bundles ({table.getFilteredRowModel().rows.length || 0})
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
      <CreatePaymetBundleModal
        isOpen={showCreatePaymetBundleModal}
        setIsOpen={setShowCreatePaymetBundleModal}
      />
    </>
  )
}

const BottomContent = ({ table }: { table: TableType<IPaymentBundle> }) => {
  const { allPaymentBundles } = useGetAllPaymentBundles()
  return (
    allPaymentBundles && (
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
