'use client'
import InputField from '@/components/elements/InputField'
import {
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
import React, { useCallback, useState } from 'react'

interface IUser {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive' | 'pending'
  plan: 'Basic' | 'Pro'
  paymentMethod: 'Credit Card' | 'PayPal' | 'Bank Transfer'
  lastPayment: string
  amount: string
  avatar: string
}

const columnHelper = createColumnHelper<IUser>()

const users: IUser[] = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'Credit Card',
    lastPayment: '2023-05-12',
    amount: '$19.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user1',
  },
  {
    id: 2,
    name: 'James Rodriguez',
    email: 'james@example.com',
    status: 'active',
    plan: 'Basic',
    paymentMethod: 'PayPal',
    lastPayment: '2023-05-10',
    amount: '$9.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user2',
  },
  {
    id: 3,
    name: 'Olivia Martinez',
    email: 'olivia@example.com',
    status: 'inactive',
    plan: 'Pro',
    paymentMethod: 'Credit Card',
    lastPayment: '2023-04-28',
    amount: '$19.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user3',
  },
  {
    id: 4,
    name: 'William Chen',
    email: 'william@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'Bank Transfer',
    lastPayment: '2023-05-15',
    amount: '$19.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user4',
  },
  {
    id: 5,
    name: 'Sophia Kim',
    email: 'sophia@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'Credit Card',
    lastPayment: '2023-05-14',
    amount: '$29.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user5',
  },
  {
    id: 6,
    name: 'Ethan Brown',
    email: 'ethan@example.com',
    status: 'pending',
    plan: 'Basic',
    paymentMethod: 'PayPal',
    lastPayment: '2023-05-08',
    amount: '$9.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user6',
  },
  {
    id: 7,
    name: 'Isabella Garcia',
    email: 'isabella@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'Credit Card',
    lastPayment: '2023-05-11',
    amount: '$19.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user7',
  },
  {
    id: 8,
    name: 'Mason Taylor',
    email: 'mason@example.com',
    status: 'inactive',
    plan: 'Basic',
    paymentMethod: 'Bank Transfer',
    lastPayment: '2023-04-25',
    amount: '$9.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user8',
  },
  {
    id: 9,
    name: 'Ava Johnson',
    email: 'ava@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'Credit Card',
    lastPayment: '2023-05-13',
    amount: '$29.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user9',
  },
  {
    id: 10,
    name: 'Noah Williams',
    email: 'noah@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'PayPal',
    lastPayment: '2023-05-09',
    amount: '$19.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user10',
  },
  {
    id: 11,
    name: 'Mia Davis',
    email: 'mia@example.com',
    status: 'pending',
    plan: 'Basic',
    paymentMethod: 'Credit Card',
    lastPayment: '2023-05-07',
    amount: '$9.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user11',
  },
  {
    id: 12,
    name: 'Liam Miller',
    email: 'liam@example.com',
    status: 'active',
    plan: 'Pro',
    paymentMethod: 'Bank Transfer',
    lastPayment: '2023-05-16',
    amount: '$29.99',
    avatar: 'https://img.heroui.chat/image/avatar?w=40&h=40&u=user12',
  },
]
const UsersSection = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')
  const [usersLoading, setUsersLoading] = useState(false)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([
    { id: 'status', value: 'all' },
    { id: 'plan', value: 'all' },
  ])

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  })

  const [sorting, setSorting] = useState<SortingState>([])
  const columns = [
    columnHelper.accessor((row) => `${row.name} ${row.email}`, {
      id: 'name',
      header: 'User',
      enableHiding: false, // disable hiding for this column

      cell: ({ row: { original }, getValue }) => (
        <div className='flex flex-col text-cloudburst'>
          <p className='text-bold capitalize'>{original.name}</p>
          <p className='text-foreground-400 text-xs'>{original.email}</p>
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
    columnHelper.accessor(`plan`, {
      header: 'Plan',
      filterFn: 'planFilter' as any,
      cell: ({ getValue }) => (
        <div className='inline-block'>
          <Chip
            size='sm'
            variant='flat'
            className='capitalize'
            radius='sm'
            color={getValue() == 'Basic' ? 'warning' : 'success'}
          >
            {getValue()}
          </Chip>
        </div>
      ),
    }),
    columnHelper.accessor('lastPayment', {
      header: 'Last Payment',
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
          color='primary'
          variant='ghost'
          href={`/users/${info.row.original.id}`}
          className='py-1 px-2'
        >
          Manage User
        </Button>
      ),
    }),
  ]
  // const { allAgencyContacts, allAgencyContactsLoading } =
  //   useGetAllAgencyContacts()

  const table = useReactTable({
    data: users || [],
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
      planFilter: (row, columnId, filterValue) => {
        if (filterValue == 'all') return true
        return row.original.plan.toLowerCase() == filterValue
      },
    },
  })

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]))

  return (
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
        isLoading={usersLoading}
        emptyContent={
          users && users?.length > 0
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
  //   const { allAgencyContacts } = useGetAllAgencyContacts()
  const getFieldCount = useCallback(
    (status: string, key: string) => {
      if (users) {
        if (status == 'all') return users.length
        else
          return users.filter(
            (each: any) => each?.[key]?.toLocaleLowerCase() == status
          ).length
      }
    },
    [users, table.getColumn('status')?.getFilterValue()]
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
          <InputField
            type='select'
            className='w-36'
            value={table.getColumn('plan')?.getFilterValue() as string}
            onChange={(value) => {
              table.getColumn('plan')?.setFilterValue(value)
            }}
            options={[
              {
                value: 'all',
                label: `All Plans (${getFieldCount('all', 'plan')})`,
              },
              {
                value: 'basic',
                label: `Basic (${getFieldCount('basic', 'plan')})`,
              },
              {
                value: 'pro',
                label: `Pro (${getFieldCount('pro', 'plan')})`,
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
  //   const { allAgencyContacts } = useGetAllAgencyContacts()
  return (
    users && (
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
