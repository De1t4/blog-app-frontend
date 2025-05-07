import Link from 'next/link'
import React from 'react'

export const Post = ({id_posts, index, content, title}) => {
  return (
    <Link href={`/SinglePost/${id_posts}`}>
      <ul
        className="hover:bg-slate-600 transition-all duration-300 rounded-lg cursor-pointer px-2"
      >
        <h1 className={`mt-2 font-semibold text-zinc-100  overflow-hidden text-ellipsis whitespace-nowrap `}>{title}</h1>
        <p className="font-semibold text-sm text-zinc-400">{content}</p>
      </ul>
    </Link>
    )
}
