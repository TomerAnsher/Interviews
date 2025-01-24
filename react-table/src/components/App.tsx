import { useState } from 'react'
import Header from './Header'
import Table from './Table/Table'
import { getRows } from '../db/rows'
import { SearchProvider } from '../contexts/SearchContext'

const App = () => {
  const [rows] = useState(getRows());

  return (
    <SearchProvider>

    <div>
      <Header />
      <Table rows={rows} />
    </div>
    </SearchProvider>

  )
}

export default App
