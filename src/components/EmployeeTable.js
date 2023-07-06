import React from 'react'
import {
    Paper,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    IconButton,
    TablePagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { blue } from '@mui/material/colors';


const color = blue[800];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: color,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function EmployeeTable({ pegawai, paginatedPegawai, getNumbering, page, setSelectedPegawai, handleChangePage, handleDeletePegawai, rowsPerPage, handleChangeRowsPerPage }) {
    return (
        <TableContainer component={Paper} >
            <Table sx={{ height: 100 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">No</StyledTableCell>
                        <StyledTableCell align="left">Nama</StyledTableCell>
                        <StyledTableCell align="left">Jalan</StyledTableCell>
                        <StyledTableCell align="left">Provinsi</StyledTableCell>
                        <StyledTableCell align="left">Kota/Kabupaten</StyledTableCell>
                        <StyledTableCell align="left">Kecamatan</StyledTableCell>
                        <StyledTableCell align="left">Kelurahan</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paginatedPegawai.map((pegawai, index) => (
                        <TableRow key={index}>
                            <StyledTableCell>{getNumbering(page, index)}</StyledTableCell>
                            <StyledTableCell>{pegawai.nama}</StyledTableCell>
                            <StyledTableCell>{pegawai.jalan}</StyledTableCell>
                            <StyledTableCell>{typeof pegawai.provinsi === 'object' ? '' : pegawai.provinsi}</StyledTableCell>
                            <StyledTableCell>{typeof pegawai.kota === 'object' ? '' : pegawai.kota}</StyledTableCell>
                            <StyledTableCell>{typeof pegawai.kecamatan === 'object' ? '' : pegawai.kecamatan}</StyledTableCell>
                            <StyledTableCell>{typeof pegawai.kelurahan === 'object' ? '' : pegawai.kelurahan}</StyledTableCell>
                            <StyledTableCell>
                                <IconButton
                                    onClick={() => setSelectedPegawai(pegawai)}
                                    disabled={!pegawai.id}
                                    color="primary"
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() => handleDeletePegawai(pegawai)}
                                    disabled={!pegawai.id}
                                    color="secondary"
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={pegawai.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    )
}
