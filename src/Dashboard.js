import React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import NavBarMUI from './components/NavBarMUI'
import { Sidebar, Menu, MenuItem} from 'react-pro-sidebar'
import View from './view.png'
import './Dashboard.css'
import Graph from './growth-graph.png'
import Cart from './cart.png'
import Rev from './business-and-finance.png'
import Eng from './social-growth.png'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import BarGraph from './components/BarGraph'
import { useNavigate } from "react-router-dom"

export function Dashboard(){
    const navigate = useNavigate();
    const columns = [
        { id: 'productname', label: 'Product name', minWidth: 170 },
        { id: 'price', label: 'Price', minWidth: 100 },
        { id: 'quantity', label: 'Quantity', minWidth: 100 },
        { id: 'total', label: 'Total', minWidth: 100 },
        { id: 'status', label: 'Status', minWidth: 100 },
      ]
      
      function createData(productname, price, quantity, total,status) {
        return { productname, price, quantity, total, status }
      }
      
      const rows = [
        createData('Berserk: Egg of the king arc', '2,000.00', 1, 2000, 'complete'),
        createData('Berserk: Egg of the king arc', '2,000.00', 4, 8000,'complete'),
        createData('Berserk: Egg of the king arc', '2,000.00', 3, 6000,'complete'),
        createData('Berserk: Egg of the king arc States', '2,000.00', 32, 64000,'complete'),
        createData('Berserk: Egg of the king arc', '2,000.00', 1, 2000,'complete'),
        createData('Berserk: Egg of the king arc', '2,000.00', 25, 50000,'complete')
      ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
      
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
      
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return(
        <div className='admin-container'>
            <NavBarMUI />
                <Box sx={{ width: '100%' }}>
                    <LinearProgress style={{ display: 'block' }} />
                </Box>
                <div className='dashboard-content'>
                <div className='dashboard'>
                    <div className='dashboard-title'>
                        <h3>Welcome back, Admin</h3>
                    </div>
                    <div className='dashboard-stats' >
                        <div style={{
                        }}>
                            <div style={{
                                display:'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                height: 'auto',
                                padding: 0,
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '84px',
                                    height: '84px',
                                    backgroundColor: 'rgba(219, 226, 239,0.25)',
                                    display: 'grid'
                                }}>
                                    <img 
                                        style={{
                                            margin:'auto'
                                            }} 
                                        src={View} 
                                        width='36px' 
                                        height='36px' 
                                        alt=''/>
                                </div>
                                <img src={Graph} width='48px' height='48px' alt=''/>
                            </div>
                            <h6  style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>Total views</h6>
                            <h3 style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>5,000</h3>
                            <hr />
                        </div>
                        <div>
                            <div style={{
                                display:'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                height: 'auto',
                                padding: 0,
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '84px',
                                    height: '84px',
                                    backgroundColor: 'rgba(219, 226, 239,0.25)',
                                    display: 'grid'
                                }}>
                                    <img 
                                        style={{
                                            margin:'auto'
                                            }} 
                                        src={Cart} 
                                        width='36px' 
                                        height='36px' 
                                        alt=''/>
                                </div>
                                <img src={Graph} width='48px' height='48px' alt=''/>
                            </div>
                            <h6  style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>Total orders</h6>
                            <h3 style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>850</h3>
                            <hr />
                        </div>
                        <div>
                        <div style={{
                                display:'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                height: 'auto',
                                padding: 0,
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '84px',
                                    height: '84px',
                                    backgroundColor: 'rgba(219, 226, 239,0.25)',
                                    display: 'grid'
                                }}>
                                    <img 
                                        style={{
                                            margin:'auto'
                                            }} 
                                        src={Rev} 
                                        width='36px' 
                                        height='36px' 
                                        alt=''/>
                                </div>
                                <img src={Graph} width='48px' height='48px' alt=''/>
                            </div>
                            <h6  style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>Total revenue</h6>
                            <h3 style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>850,000</h3>
                            <hr /> 
                        </div>
                        <div>
                        <div style={{
                                display:'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                height: 'auto',
                                padding: 0,
                                marginBottom: '1.25rem'
                            }}>
                                <div style={{
                                    width: '84px',
                                    height: '84px',
                                    backgroundColor: 'rgba(219, 226, 239,0.25)',
                                    display: 'grid'
                                }}>
                                    <img 
                                        style={{
                                            margin:'auto'
                                            }} 
                                        src={Eng} 
                                        width='36px' 
                                        height='36px' 
                                        alt=''/>
                                </div>
                                <img src={Graph} width='48px' height='48px' alt=''/>
                            </div>
                            <h6  style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>Total link clicks</h6>
                            <h3 style={{color: '#F9F7F7',fontFamily: 'Fira sans'}}>1,850,000</h3>
                            <hr /> 
                        </div>
                    </div><br />
                    <div className='dashboard-sales'>
                        <Paper sx={{ width: '50%', overflow: 'hidden'}}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table style={{backgroundColor: '#DBE2EF'}} stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow style={{fontFamily:'Fira sans', color: '#112D4E'}}>
                                {columns.map((column) => (
                                    <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, fontFamily:'Fira sans', color: '#112D4E'}}
                                    >
                                    {column.label}
                                    </TableCell>
                                ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell style={{
                                                fontFamily: 'Fira sans', 
                                                backgroundColor:'#3F72AF',
                                                color: '#F9F7F7'
                                                }} key={column.id} align={column.align}>
                                            {column.format && typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                            </TableCell>
                                        );
                                        })}
                                    </TableRow>
                                    );
                                })}
                            </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                        </Paper>
                        <div style={{width:'50%',marginLeft:'1rem'}}>
                                <BarGraph />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}