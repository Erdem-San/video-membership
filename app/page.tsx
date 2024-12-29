import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Welcome to <span className="text-blue-600">MembershipSite</span>
          </h1>
          <p className="mt-3 text-2xl">
            Get started by exploring our features
          </p>
          <div className="flex mt-6 space-x-4">
            <Button asChild>
              <Link href="/auth">Sign Up / Login</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/feed">Explore Feed</Link>
            </Button>
          </div>
        </main>
      </div>
    </Layout>
  )
}

