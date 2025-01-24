import { MouseEvent, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import MuiTable from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import TableHead from './TableHead'
import TableToolbar from './TableToolbar'
import { Row } from '../../db/model'
import { useSearch } from '../../contexts/SearchContext'
import { OrderType } from '../types/types'
import TableSortLabel from '@mui/material/TableSortLabel'

const Table = ({ rows }: { rows: Row[] }) => {
  const { searchValue } = useSearch()
  const [order, setOrder] = useState<OrderType>('asc')
  const [orderBy, setOrderBy] = useState<string>('name')

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.email.toLowerCase().includes(searchValue.toLowerCase())
  )

  const handleRequestSort = (event: MouseEvent, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = () => {}

  const handleClick = (event: MouseEvent, name: string) => {
    console.log('event', event, 'name', name)
  }

  const sortedRows = useMemo(() => {
    return filteredRows.sort((a, b) =>
      order === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
  }, [filteredRows, order])

  const isSelected = (name: string) => false

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Paper sx={{ width: '100%', flex: 1 }}>
        <TableToolbar numSelected={0} />
        <TableContainer sx={{ maxHeight: 'calc(100vh - 64px)' }}>
          <MuiTable aria-labelledby="tableTitle" sx={{ minWidth: 650 }}>
            <TableHead
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              numSelected={0}
            />
            <TableBody>
              {sortedRows.map((row) => {
                const isItemSelected = isSelected(row.name)

                return (
                  <TableRow
                    hover
                    onClick={(event: MouseEvent) => handleClick(event, row.name)}
                    role="checkbox"
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{
                      '&:nth-of-type(odd)': {
                        backgroundColor: '#f9f9f9',
                      },
                      '&:hover': {
                        backgroundColor: '#f1f1f1',
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell component="th" scope="row" padding="none">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.age}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </MuiTable>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default Table
