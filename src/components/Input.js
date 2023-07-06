import React from 'react'
import {
    TextField,
    Button,
    Autocomplete,
} from '@mui/material';
export default function Input({
    selectedPegawai,
    namaPegawai,
    handleNamaPegawaiChange,
    provinsi,
    selectedProvinsi,
    handleProvinsiChange,
    kota,
    selectedKota,
    handleKotaChange,
    kecamatan,
    selectedKecamatan,
    handleKecamatanChange,
    kelurahan,
    selectedKelurahan,
    setSelectedKelurahan,
    handleEditPegawai,
    handleCreatePegawai
}) {
    return (
        <>
            <h2>{selectedPegawai ? 'Edit Pegawai' : 'Tambah Pegawai'}</h2>
            <TextField
                fullWidth
                label="Nama Pegawai"
                variant="outlined"
                value={namaPegawai}
                onChange={handleNamaPegawaiChange}
            />

            <h3>Pilih Provinsi</h3>
            <Autocomplete
                options={provinsi}
                getOptionLabel={(option) => option.nama}
                value={selectedProvinsi}
                onChange={handleProvinsiChange}
                renderInput={(params) => <TextField {...params} label="Provinsi" variant="outlined" />}
            />

            <h3>Pilih Kota/Kabupaten</h3>
            <Autocomplete
                options={kota}
                getOptionLabel={(option) => option.nama}
                value={selectedKota}
                onChange={handleKotaChange}
                renderInput={(params) => <TextField {...params} label="Kota/Kabupaten" variant="outlined" />}
            />

            <h3>Pilih Kecamatan</h3>
            <Autocomplete
                options={kecamatan}
                getOptionLabel={(option) => option.nama}
                value={selectedKecamatan}
                onChange={handleKecamatanChange}
                renderInput={(params) => <TextField {...params} label="Kecamatan" variant="outlined" />}
            />

            <h3>Pilih Kelurahan</h3>
            <Autocomplete
                options={kelurahan}
                getOptionLabel={(option) => option.nama}
                value={selectedKelurahan}
                onChange={(event, value) => setSelectedKelurahan(value)}
                renderInput={(params) => <TextField {...params} label="Kelurahan" variant="outlined" />}
            />

            {selectedPegawai ? (
                <Button variant="contained" onClick={handleEditPegawai}>
                    Edit Pegawai
                </Button>
            ) : (
                <Button variant="contained" onClick={handleCreatePegawai} sx={{mt:2}}>
                    Tambah Pegawai
                </Button>
            )}
        </>
    )
}
