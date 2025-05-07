import React from 'react'
import { Post } from './post'

export default function ContainPost({dataUser}) {
  return (
    <li className="list-none">
      {dataUser.posts.length == 0 ? (
        <h1 className={`text-center font-semibold text-zinc-400 text-2xl mt-8 `}>
          No hay Posteos
        </h1>
      ) : (
        dataUser.posts.map((post, index) => (
          <Post id_posts={post.id_posts} index={index} key={index} content={post.content} title={post.title}></Post>
        ))
      )}
    </li>)
}
