import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = [] //data.allMarkdownRemark.edges
    data.allMarkdownRemark.edges.forEach(({ node }) => {
      posts.push({
        excerpt: node.excerpt,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        uri: node.fields.slug,
        author: node.frontmatter.author,
      })
    })
    data.allPostsJson.edges.forEach(({ node }) => {
      posts.push({
        excerpt: node.excerpt,
        title: node.title,
        date: node.date,
        uri: node.page + "/",
        author: node.author,
      })
    })
    posts.sort((a, b) => (a.date < b.date ? 1 : -1))
    console.log(posts)
    //data.allPostsJson.edges.forEach(({ node }) => {
    //  posts.push({
    //    excerpt: node.excerpt,
    //    title: node.title,
    //    date: node.date,
    //    uri: node.page + "/",
    //    author: node.author,
    //  })
    //})
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        {posts.map(node => {
          const title = node.title
          return (
            <div key={node.uri}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.uri}>
                  {title}
                </Link>
              </h3>
              <small>{node.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.excerpt,
                }}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allPostsJson {
      edges {
        node {
          excerpt
          date
          page
          title
          author
        }
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
