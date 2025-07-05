'use client'
import { IUser } from '@/api-utils/admin/interfaces/user.interfaces'
import InputField from '@/components/elements/InputField'
import useGetAllUsers from '@/hooks/requests/useGetAllUsers'
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
import moment from 'moment'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'

const columnHelper = createColumnHelper<IUser>()

const UsersSection = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [usersLoading, setUsersLoading] = useState(false)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'all' },
  ])

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })
  const { allUsers, allUsersLoading } = useGetAllUsers()
  const [sorting, setSorting] = useState<SortingState>([])
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (row) => `${row.firstName} ${row.lastName} ${row.email}`,
        {
          id: 'name',
          header: 'User',
          enableHiding: false, // disable hiding for this column

          cell: ({ row: { original }, getValue }) => (
            <div className='flex flex-col text-cloudburst'>
              <p className='text-bold capitalize'>
                {original.firstName} {original.lastName}
              </p>
              <p className='text-foreground-400 text-xs'>{original.email}</p>
            </div>
          ),
        }
      ),
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
                getValue() == 'active'
                  ? 'success'
                  : getValue() == 'inactive'
                  ? 'warning'
                  : 'danger'
              }
            >
              {getValue()}
            </Chip>
          </div>
        ),
      }),
      columnHelper.accessor('unlockedChapters', {
        header: 'Unlocked Chapters',
        enableHiding: false, // disable hiding for this column
        cell: (info) => (
          <div className='flex flex-col '>
            <p className='text-bold text-small '>{info.getValue().length}</p>
          </div>
        ),
      }),
      columnHelper.accessor('dateCreated', {
        header: 'Date Joined',
        enableHiding: false, // disable hiding for this column
        cell: (info) => (
          <div className='flex flex-col '>
            <p className='text-bold text-small '>
              {moment(info.getValue()).format('MMMM Do, YYYY')}
            </p>
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
            as={Link}
            color='primary'
            variant='ghost'
            href={`/admin/users/${info.row.original.userId}`}
            className='py-1 px-2'
          >
            Manage User
          </Button>
        ),
      }),
    ],
    []
  )
  // const { allAgencyContacts, allAgencyContactsLoading } =
  //   useGetAllAgencyContacts()

  const table = useReactTable({
    data: allUsers || [],
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
        return row.original?.status?.toLowerCase() == filterValue
      },
    },
  })

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  return (
    <>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/users'>Users</BreadcrumbItem>
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
                  allowsSorting={['unlockedChapters', 'dateCreated'].includes(
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
          isLoading={allUsersLoading}
          emptyContent={
            allUsers && allUsers?.length > 0
              ? 'No users found. Try adjusting your filters.'
              : 'No users available at the moment.'
          }
        >
          {!usersLoading &&
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
    </>
  )
}

export default UsersSection

const TopContent = ({
  table,
  setGlobalFilter,
}: {
  table: TableType<IUser>
  setGlobalFilter: any
}) => {
  const { allUsers } = useGetAllUsers()
  const getFieldCount = useCallback(
    (status: string, key: string) => {
      if (allUsers) {
        if (status == 'all') return allUsers.length
        else
          return allUsers.filter(
            (each: any) => each?.[key]?.toLocaleLowerCase() == status
          ).length
      }
      return '-'
    },
    [allUsers, table.getColumn('status')?.getFilterValue()]
  )
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-6 flex-wrap justify-between'>
        <div className='flex gap-4 flex-wrap'>
          <InputField
            type='select'
            className='w-40'
            value={table.getColumn('status')?.getFilterValue() as string}
            onChange={(value) => {
              table.getColumn('status')?.setFilterValue(value)
            }}
            options={[
              {
                value: 'all',
                label: `All Statuses (${getFieldCount('all', 'status')})`,
              },
              {
                value: 'active',
                label: `Active (${getFieldCount('active', 'status')})`,
              },
              {
                value: 'inactive',
                label: `Inactive (${getFieldCount('inactive', 'status')})`,
              },
            ]}
          />
        </div>
        <InputField
          type='search'
          placeholder='Search users'
          register={{ onChange: (e: any) => setGlobalFilter(e.target.value) }}
        />
      </div>
      <div className='flex justify-between items-center'>
        <span className='text-default-400 text-small capitalize'>
          {String(table.getColumn('status')?.getFilterValue())} users (
          {table.getFilteredRowModel().rows.length || 0})
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

const BottomContent = ({ table }: { table: TableType<IUser> }) => {
  const { allUsers } = useGetAllUsers()
  return (
    allUsers && (
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
