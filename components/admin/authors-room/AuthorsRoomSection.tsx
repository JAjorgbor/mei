'use client'
import { deleteAuthorPost } from '@/api-utils/admin/requests/author-room.requests'
import { IAuthorPost } from '@/api-utils/global-interfaces/author-room.interfaces'
import ConfirmDeleteAuthorPostModal from '@/components/admin/authors-room/ConfirmDeleteAuthorPostModal'
import CreateAuthorPostDrawer from '@/components/admin/authors-room/CreateAuthorPostDrawer'
import useGetAllAuthorPosts from '@/hooks/requests/useGetAllAuthorPosts'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
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
import {
  BookOpen,
  Calendar,
  MoreVertical,
  PencilLine,
  Trash2,
} from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'

const AuthorsRoomSection = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<IAuthorPost | null>(null)
  const [page, setPage] = useState(1)
  const rowsPerPage = 6

  const {
    allPosts: allPostsData,
    allPostsLoading,
    mutateAllPosts,
  } = useGetAllAuthorPosts(rowsPerPage, page)
  const items = allPostsData?.items || []

  const pages = Math.ceil((allPostsData?.meta?.total || 0) / rowsPerPage) || 1

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <Breadcrumbs>
          <BreadcrumbItem href='/admin/dashboard'>Dashboard</BreadcrumbItem>
          <BreadcrumbItem href='/admin/authors-room'>
            Author Room
          </BreadcrumbItem>
        </Breadcrumbs>
        <Button
          color='secondary'
          variant='shadow'
          startContent={<PencilLine size={18} />}
          onPress={() => setShowCreateModal(true)}
        >
          Add Thought
        </Button>
      </div>

      {allPostsLoading ? (
        <div className='flex flex-col items-center justify-center py-20'>
          <Spinner label='Loading thoughts...' size='lg' color='secondary' />
        </div>
      ) : items.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-20 bg-default-50 rounded-3xl border-2 border-dashed border-default-200'>
          <p className='text-default-400'>No thoughts posted yet.</p>
        </div>
      ) : (
        <div className='space-y-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {items.map((post) => (
              <Card
                key={post.id}
                className='bg-background/40 backdrop-blur-md border border-default-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-[1.5rem]'
              >
                <CardHeader className='px-6 pt-6 flex justify-between items-start'>
                  <div className='flex flex-col gap-1'>
                    <div className='flex items-center gap-2'>
                      <span className='px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded-full uppercase tracking-wider'>
                        {post.chapterSummary.number
                          ? `Chapter ${post.chapterSummary.number}`
                          : 'General'}
                      </span>
                    </div>
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
                    <DropdownMenu aria-label='Post actions'>
                      <DropdownItem
                        key='delete'
                        color='danger'
                        className='text-danger'
                        startContent={<Trash2 size={16} />}
                        onPress={() => {
                          setSelectedPost(post)
                          setShowDeleteModal(true)
                        }}
                      >
                        Delete Thought
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>

                <CardBody className='px-6 py-4 space-y-4'>
                  <p className='text-md leading-relaxed text-foreground-700 whitespace-pre-wrap italic'>
                    "{post.text}"
                  </p>

                  {post.reactionSummary &&
                    Object.keys(post.reactionSummary).length > 0 && (
                      <div className='flex flex-wrap gap-2 pt-2'>
                        <Dropdown>
                          <DropdownTrigger>
                            <Button
                              size='sm'
                              variant='flat'
                              radius='full'
                              className='bg-default-100/50 hover:bg-default-100 border border-default-200 text-sm h-8 px-3'
                            >
                              <div className='flex flex-row items-center -space-x-1'>
                                {Object.keys(post.reactionSummary)
                                  .slice(0, 3)
                                  .map((emoji, i) => (
                                    <span
                                      key={i}
                                      className='text-[14px] leading-none z-10'
                                      style={{ zIndex: 10 - i }}
                                    >
                                      {emoji}
                                    </span>
                                  ))}
                              </div>
                              <span className='font-bold text-default-600 text-xs ml-1'>
                                {Object.values(post.reactionSummary).reduce(
                                  (a, b) => a + Number(b),
                                  0,
                                )}
                              </span>
                            </Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label='Reactions summary'>
                            {Object.entries(post.reactionSummary).map(
                              ([emoji, count], index) => (
                                <DropdownItem
                                  key={index}
                                  textValue={emoji}
                                  className='flex items-center gap-2'
                                >
                                  <div className='flex items-center justify-between w-[50px]'>
                                    <span className='text-lg leading-none'>
                                      {emoji}
                                    </span>
                                    <span className='font-bold text-default-600 text-xs'>
                                      {count as number}
                                    </span>
                                  </div>
                                </DropdownItem>
                              ),
                            )}
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    )}
                </CardBody>

                <CardFooter className='px-6 pb-6 flex flex-col gap-4 items-start'>
                  <div className='flex items-center gap-4 text-default-400 text-tiny'>
                    <div className='flex items-center gap-1'>
                      <Calendar size={12} />
                      {moment(post.dateCreated).format('MMM DD, YYYY')}
                    </div>
                    {post?.chapterSummary?.number && (
                      <div className='flex items-center gap-1 text-secondary'>
                        <BookOpen size={12} />
                        Chapter {post.chapterSummary.number}
                      </div>
                    )}
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
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
              className='text-white'
            />
          </div>
        </div>
      )}

      <CreateAuthorPostDrawer
        isOpen={showCreateModal}
        setIsOpen={setShowCreateModal}
        mutate={mutateAllPosts}
      />
      <ConfirmDeleteAuthorPostModal
        isOpen={showDeleteModal}
        setIsOpen={setShowDeleteModal}
        post={selectedPost!}
        mutate={mutateAllPosts}
      />
    </div>
  )
}
export default AuthorsRoomSection
