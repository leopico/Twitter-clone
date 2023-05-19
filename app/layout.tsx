import './globals.css'
import LoginModal from './components/Modal/LoginModal'
import RegisterModal from './components/Modal/RegisterModal'
import Layout from './components/layout/Layout'
import { Inter } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'
import getUsers from './actions/getUsers'
import EditModal from './components/Modal/EditModal'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Twitter-clone',
  description: 'Generated by leopico for twitter-clone app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  const users = await getUsers();



  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <EditModal currentUser={currentUser} />
          <Layout currentUser={currentUser} users={users}>
            {children}
          </Layout>
        </>
      </body>
    </html>
  )
}
