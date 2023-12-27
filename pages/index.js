import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
  >
  <div className="assignment-nav">
    <h1>Homepage</h1>
    <p className="headline">
      This project was developed By{" "}
      <a href="https://www.sparkleinfotech.com">sparkle Infotech</a>. Quickly use below links
      to navigate through all pages.
    </p>
    <ul>
      <li>
        <Link href="/signin">Signin</Link>
      </li>
      <li>
        <Link href="/emptystate">Emptystate</Link>
      </li>
      <li>
        <Link href="/movielist">Movielist</Link>
      </li>
      <li>
        <Link href="/createanewmovie">Createanewmovie</Link>
      </li>
      <li>
        <Link href="/edit">Edit</Link>
      </li>
    </ul>
  </div>
  </main>
  )
}
