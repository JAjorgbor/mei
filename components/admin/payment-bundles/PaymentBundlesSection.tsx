'use client'
import { IPaymentBundle } from '@/api-utils/global-interfaces/payment-bundle.interfaces'
import { capitalCase } from 'change-case'
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
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Pagination,
  Spinner,
  addToast,
} from '@heroui/react'
import UpdatePaymentBundleModal from '@/components/admin/payment-bundles/UpdatePaymentBundleModal'
import { deletePaymentBundle } from '@/api-utils/admin/requests/payment-bundle.requests'
import {
  MoreVertical,
  Layers,
  CreditCard,
  Info,
  Pencil,
  Trash2,
} from 'lucide-react'
import React, { useMemo, useState } from 'react'

const PaymentBundlesSection = () => {
  const [globalFilter, setGlobalFilter] = useState<any>('')

  const [selectedBundle, setSelectedBundle] = useState<IPaymentBundle>()
  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  const {
    allPaymentBundles: allPaymentBundlesData,
    allPaymentBundlesLoading,
    mutateAllPaymentBundles,
  } = useGetAllPaymentBundles(rowsPerPage, page)

  const allPaymentBundles = allPaymentBundlesData?.items || []

  const filteredItems = useMemo(() => {
    if (!globalFilter) return allPaymentBundles
    return allPaymentBundles.filter(
      (bundle) =>
        bundle.description.toLowerCase().includes(globalFilter.toLowerCase()) ||
        bundle.bundleType.toLowerCase().includes(globalFilter.toLowerCase()),
    )
  }, [allPaymentBundles, globalFilter])

  const pages =
    Math.ceil((allPaymentBundlesData?.meta?.total || 0) / rowsPerPage) || 1

  const items = filteredItems

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this payment bundle?')) {
      try {
        await deletePaymentBundle(id)
        addToast({
          title: 'Payment bundle deleted successfully',
          color: 'success',
        })
        mutateAllPaymentBundles()
      } catch (error: any) {
        addToast({
          title: error?.message || 'Failed to delete payment bundle',
          color: 'danger',
        })
      }
    }
  }

  return (
    <div className='space-y-6'>
      <Breadcrumbs>
        <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
        <BreadcrumbItem href='/admin/payment-bundles'>
          Payment Bundles
        </BreadcrumbItem>
      </Breadcrumbs>

      <TopContent
        setGlobalFilter={setGlobalFilter}
        allPaymentBundles={allPaymentBundles}
        totalCount={allPaymentBundlesData?.meta?.total || 0}
        filteredCount={filteredItems.length}
        mutate={mutateAllPaymentBundles}
      />

      {allPaymentBundlesLoading ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <Spinner label='Loading bundles...' size='lg' color='primary' />
        </div>
      ) : filteredItems.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 bg-default-50 rounded-3xl border-2 border-dashed border-default-200'>
          <p className='text-default-400'>No payment bundles found.</p>
        </div>
      ) : (
        <div className='space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {items.map((bundle) => (
              <Card
                key={bundle.id}
                className='bg-background/40 backdrop-blur-md border border-default-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem]'
              >
                <CardHeader className='px-6 pt-6 flex justify-between items-start'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <Chip
                        size='sm'
                        variant='flat'
                        color='secondary'
                        radius='sm'
                        className='capitalize font-bold'
                        startContent={<Layers size={12} />}
                      >
                        {capitalCase(bundle.bundleType)}
                      </Chip>
                    </div>
                    <p className='text-2xl font-black mt-2'>
                      {currencyFormatter(bundle.amount)}
                    </p>
                  </div>
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        isIconOnly
                        variant='light'
                        size='sm'
                        radius='full'
                      >
                        <MoreVertical size={18} className='text-default-400' />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label='Bundle actions'>
                      <DropdownItem
                        key='edit'
                        startContent={<Pencil size={16} />}
                        onPress={() => {
                          setSelectedBundle(bundle)
                          setShowUpdateModal(true)
                        }}
                      >
                        Edit Bundle
                      </DropdownItem>
                      <DropdownItem
                        key='delete'
                        color='danger'
                        className='text-danger'
                        startContent={<Trash2 size={16} />}
                        onPress={() => handleDelete(bundle.id)}
                      >
                        Delete Bundle
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>

                <CardBody className='px-6 py-4'>
                  <div className='flex items-center gap-2 mb-2'>
                    <CreditCard size={14} className='text-primary' />
                    <span className='text-sm font-bold text-primary'>
                      {bundle.numberOfstars} Stars
                    </span>
                  </div>
                  <p className='text-sm text-default-500 line-clamp-3'>
                    {bundle.description}
                  </p>
                </CardBody>

                <CardFooter className='px-6 pb-6 pt-0'>
                  <div className='flex items-center gap-1 text-tiny text-default-400'>
                    <Info size={12} />
                    <span>ID: {truncateText(bundle.id, 10)}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className='flex w-full justify-center pt-4'>
            <Pagination
              isCompact
              showControls
              showShadow
              color='primary'
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              className='text-white'
            />
          </div>
        </div>
      )}
      <UpdatePaymentBundleModal
        isOpen={showUpdateModal}
        setIsOpen={setShowUpdateModal}
        bundle={selectedBundle}
        mutate={mutateAllPaymentBundles}
      />
    </div>
  )
}

export default PaymentBundlesSection

const TopContent = ({
  setGlobalFilter,
  allPaymentBundles,
  totalCount,
  filteredCount,
  mutate,
}: {
  setGlobalFilter: any
  allPaymentBundles: any[]
  totalCount: number
  filteredCount: number
  mutate: () => void
}) => {
  const [showCreatePaymetBundleModal, setShowCreatePaymetBundleModal] =
    useState(false)

  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-6 flex-wrap justify-between w-full'>
          <Button
            color='primary'
            variant='shadow'
            onPress={() => setShowCreatePaymetBundleModal(true)}
            className='font-bold px-8'
          >
            Add New Bundle
          </Button>

          <InputField
            type='search'
            placeholder='Search payment bundles'
            className='max-w-xs'
            register={{ onChange: (e: any) => setGlobalFilter(e.target.value) }}
          />
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-default-400 text-small'>
            Total {totalCount} bundles found ({filteredCount} showing)
          </span>
        </div>
      </div>
      <CreatePaymetBundleModal
        isOpen={showCreatePaymetBundleModal}
        setIsOpen={setShowCreatePaymetBundleModal}
        mutate={mutate}
      />
    </>
  )
}
