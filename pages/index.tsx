import Head from 'next/head'
import { useQuery, gql } from '@apollo/client'
import { format } from "date-fns"
import { print } from 'graphql/language/printer'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import  prismStyle  from 'react-syntax-highlighter/dist/cjs/styles/prism/xonokai'
import styles from '../styles/Home.module.css'

const ResumeQuery = gql`
  query Leigh {
    bio {
      name
      email
      tagline
      objective
      github
      website
      linkedin
    }
    positions {
      id
      title
      company
      location
      years
      months
      startDate
      endDate
      achievements
    }
  }
`

export default function Home() {
  const {data, error, loading} = useQuery(ResumeQuery)

  if (error) {
    return <span>Error.. oops!</span>
  }

  if (loading) {
    return (
      <header className={styles.header}>
        <h1>Leigh</h1>
        <h2>loading..</h2>
      </header>
    )
  }

  const { bio, positions } = data

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1>{bio.name}</h1>
        <h2>{bio.tagline}</h2>
      </header>

      <div className={styles.split}>
      
        <div className={styles.left}>
          <h2>Contact</h2>
          <p>
            <strong>Email</strong>{" "}
            <a href={`mailto:${bio.email}`}>{bio.email}</a>
          </p>

          <p>
            <strong>Website</strong>{" "}
            <a href={`${bio.website}`}>{bio.website}</a>
          </p>

          <p>
            <strong>Github</strong>{" "}
            <a href={`${bio.github}`}>{bio.github.replace("https://", "")}</a>
          </p>

          <p>
            <strong>LinkedIn</strong>{" "}
            <a href={`${bio.linkedin}`}>{bio.linkedin.replace("https://", "")}</a>
          </p>

          <SyntaxHighlighter language="graphql" style={prismStyle}>
            {print(ResumeQuery)}
          </SyntaxHighlighter>
        </div>
      
        <div className={styles.right}>
          <h2>Objective</h2>
          <p>...</p>

          <h2>Experience</h2>
          { 
            positions.map(pos => {

            const length = [
              pos.years > 0 ? `${pos.years} yrs` : null,
              pos.months > 0 ? `${pos.months} mths` : null
            ].filter(str => str).join(" ")

            return (<div key={pos.id}>
              <h3>{pos.title}</h3>
              <p className={styles.light}>
                {pos.company} | {pos.location}
              </p>  
              <p className={styles.light}>
                {format(new Date(pos.startDate), "MMM yyyy")} - {pos.endDate ? format(new Date(pos.endDate), "MMM yyyy ") : "Current "} 
                ({length})
              </p>
              <ul>
                {pos.achievements.map(ach => <li key={ach}>{ach}</li>)}
              </ul>

            </div>)
            })
          }
        </div>
      </div>

      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </>
  )
}
