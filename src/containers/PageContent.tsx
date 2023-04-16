import Header from './Header'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from '../routes'
import { Suspense, lazy, useEffect, useRef } from 'react'
import SuspenseContent from './SuspenseContent'
import { useSelector } from 'react-redux'

const Page404 = lazy(async () => await import('../pages/404'))

function PageContent () {
  const mainContentRef = useRef(null)
  const { pageTitle } = useSelector(state => state.header)

  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: 'smooth'
    })
  }, [pageTitle])

  return (
        <div className="flex flex-col bg-primaryBG text-secondaryText/90">
            <Header/>
            <main className="flex-1 overflow-y-auto pt-8 px-6" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                  return (
                                        <Route
                                            key={key}
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                  )
                                })
                            }

                            {/* Redirecting unknown url to 404 page */}
                            <Route path="*" element={<Page404 />} />
                        </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div>
  )
}

export default PageContent
