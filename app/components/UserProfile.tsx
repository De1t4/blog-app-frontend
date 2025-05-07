import Link from 'next/link'
import React from 'react'
import { CommentUser, PostUser, UserProfile } from '../interface/models'
import { AuthTokens } from '../../contexts/authContext'
import { Comment } from '../Profile/components/comment'
import { Post } from '../Profile/components/post'
import ContainPost from '../Profile/components/containPost'
import { ContainComment } from '../Profile/components/containComment'
import { ProfileUser } from '../Profile/components/profileUser'
import { Card, CardBody, Divider, Tab, Tabs } from '@nextui-org/react'

interface InfoUserProps {
  comments: CommentUser[]
  posts: PostUser[]
}

export const InfoUser: React.FC<InfoUserProps> = ({ comments, posts }) => {
  return (
    <>
      <div className="w-full mt-8 ml-4 max-md:ml-0">
        <Tabs aria-label="Options">
          <Tab key="comentarios" title="Comentarios">
            <Card>
              <CardBody>
                <li className=' list-none gap-y-2 flex flex-col'>
                  {comments.map((comment) => (
                    <ol key={comment.id_comment}>{comment.comment}</ol>
                  ))
                  }
                </li>
              </CardBody>
            </Card>
          </Tab>
          <Tab key="post" title="Posteos">
            <Card>
              <CardBody>
                <li className=' list-none gap-y-2 flex flex-col'>
                  {posts.map((post) => (
                    <ol key={post.id_posts} className='flex'>
                      <span>{post.title}</span>
                      <span>{post.content}</span>
                    </ol>
                  ))
                  }
                </li>
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  )
}
