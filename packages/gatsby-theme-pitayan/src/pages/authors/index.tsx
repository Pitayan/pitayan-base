import { graphql, Link } from "gatsby"
import React, { memo } from "react"

import DefaultLayout from "@pitayan/gatsby-theme-pitayan/src/layouts/Default"
import Avatar from "@pitayan/gatsby-theme-pitayan/src/components/Avatar"

import { useSiteMetadata } from "@pitayan/gatsby-theme-pitayan/src/hooks"
import { ImageDataLike } from "gatsby-plugin-image"

export type Author = {
  id: string
  yamlId: string
  name: string
  bio: string
  initial: string
  avatar: {
    normal: ImageDataLike
  }
  sns: [string, string][]
}

type AuthorsProps = {
  [key: string]: any
  data: {
    allAuthorsYaml: {
      nodes: Exclude<Author, "sns">[]
    }
  }
}

const Authors: React.FC<AuthorsProps> = ({
  data: {
    allAuthorsYaml: { nodes: authors },
  },
}) => {
  const { siteUrl } = useSiteMetadata()

  return (
    <DefaultLayout pageUrl={`${siteUrl}/authors`}>
      <h1 className="font-bold font-sans leading-tight md:leading-tight md:text-3xl text-2xl">
        Authors ({authors.length})
      </h1>
      <hr className="my-8 border-gray-300" />
      <ul className="list-none">
        {authors.map(({ id, name, initial, yamlId, avatar: { normal: image } }) => (
          <li key={id} className="my-8 flex items-center space-x-3">
            <Avatar className="h-12 w-12" initial={initial} image={image} />
            <Link className="site-link" to={`/authors/@${yamlId}/`}>
              <b>{name}</b>&nbsp;&nbsp;
              <span>@{yamlId}</span>
            </Link>
          </li>
        ))}
      </ul>
    </DefaultLayout>
  )
}

export default memo(Authors)

export const pageQuery = graphql`
  query {
    allAuthorsYaml(limit: 2000) {
      nodes {
        id
        yamlId
        name
        bio
        initial
        avatar {
          normal: childImageSharp {
            gatsbyImageData(
              width: 480
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`
