import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container'
import EmployeeTable from './EmployeeTable';
import Input from './Input';
export default function Employee() {
    const [pegawai, setPegawai] = useState([]);
    const [provinsi, setProvinsi] = useState([]);
    const [selectedProvinsi, setSelectedProvinsi] = useState(null);
    const [kota, setKota] = useState([]);
    const [selectedKota, setSelectedKota] = useState(null);
    const [kecamatan, setKecamatan] = useState([]);
    const [selectedKecamatan, setSelectedKecamatan] = useState(null);
    const [kelurahan, setKelurahan] = useState([]);
    const [selectedKelurahan, setSelectedKelurahan] = useState(null);
    const [namaPegawai, setNamaPegawai] = useState('');
    const [selectedPegawai, setSelectedPegawai] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        fetchPegawai();
        fetchProvinsi();
    }, []);

    const fetchPegawai = async () => {
        try {
            const response = await axios.get('https://61601920faa03600179fb8d2.mockapi.io/pegawai');
            setPegawai(response.data);
        } catch (error) {
            console.error('Error fetching pegawai:', error);
        }
    };

    const fetchProvinsi = async () => {
        try {
            const response = await axios.get('https://dev.farizdotid.com/api/daerahindonesia/provinsi');
            setProvinsi(response.data.provinsi);
        } catch (error) {
            console.error('Error fetching provinsi:', error);
        }
    };

    const fetchKota = async (idProvinsi) => {
        try {
            const response = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${idProvinsi}`);
            setKota(response.data.kota_kabupaten);
        } catch (error) {
            console.error('Error fetching kota:', error);
        }
    };

    const fetchKecamatan = async (idKota) => {
        try {
            const response = await axios.get(`https://dev.farizdotid.com/api/daerahindonesia/kecamatan?id_kota=${idKota}`);
            setKecamatan(response.data.kecamatan);
        } catch (error) {
            console.error('Error fetching kecamatan:', error);
        }
    };

    const fetchKelurahan = async (idKecamatan) => {
        try {
            const response = await axios.get(
                `https://dev.farizdotid.com/api/daerahindonesia/kelurahan?id_kecamatan=${idKecamatan}`
            );
            setKelurahan(response.data.kelurahan);
        } catch (error) {
            console.error('Error fetching kelurahan:', error);
        }
    };

    const handleProvinsiChange = (event, value) => {
        setSelectedProvinsi(value);
        setSelectedKota(null);
        setSelectedKecamatan(null);
        setSelectedKelurahan(null);
        setKota([]);
        setKecamatan([]);
        setKelurahan([]);
        if (value) {
            fetchKota(value.id);
        }
    };

    const handleKotaChange = (event, value) => {
        setSelectedKota(value);
        setSelectedKecamatan(null);
        setSelectedKelurahan(null);
        setKecamatan([]);
        setKelurahan([]);
        if (value) {
            fetchKecamatan(value.id);
        }
    };

    const handleKecamatanChange = (event, value) => {
        setSelectedKecamatan(value);
        setSelectedKelurahan(null);
        setKelurahan([]);
        if (value) {
            fetchKelurahan(value.id);
        }
    };

    const handleNamaPegawaiChange = (event) => {
        setNamaPegawai(event.target.value);
    };

    const handleCreatePegawai = async () => {
        try {
            const response = await axios.post('https://61601920faa03600179fb8d2.mockapi.io/pegawai', {
                nama: namaPegawai,
                provinsi: selectedProvinsi?.nama,
                kota: selectedKota?.nama,
                kecamatan: selectedKecamatan?.nama,
                kelurahan: selectedKelurahan?.nama,
            });
            setPegawai([...pegawai, response.data]);
            setNamaPegawai('');
            setSelectedProvinsi(null);
            setSelectedKota(null);
            setSelectedKecamatan(null);
            setSelectedKelurahan(null);
            setKota([]);
            setKecamatan([]);
            setKelurahan([]);
        } catch (error) {
            console.error('Error creating pegawai:', error);
        }
    };

    const handleEditPegawai = async () => {
        if (selectedPegawai) {
            try {
                const response = await axios.put(
                    `https://61601920faa03600179fb8d2.mockapi.io/pegawai/${selectedPegawai.id}`,
                    {
                        nama: namaPegawai,
                        provinsi: selectedProvinsi?.nama,
                        kota: selectedKota?.nama,
                        kecamatan: selectedKecamatan?.nama,
                        kelurahan: selectedKelurahan?.nama,
                    }
                );
                const updatedPegawai = response.data;
                setPegawai((prevPegawai) => prevPegawai.map((p) => (p.id === updatedPegawai.id ? updatedPegawai : p)));
                setNamaPegawai('');
                setSelectedProvinsi(null);
                setSelectedKota(null);
                setSelectedKecamatan(null);
                setSelectedKelurahan(null);
                setKota([]);
                setKecamatan([]);
                setKelurahan([]);
                setSelectedPegawai(null);
            } catch (error) {
                console.error('Error updating pegawai:', error);
            }
        }
    };

    const handleDeletePegawai = async (pegawai) => {
        if (pegawai) {
            try {
                await axios.delete(`https://61601920faa03600179fb8d2.mockapi.io/pegawai/${pegawai.id}`);
                setPegawai((prevPegawai) => prevPegawai.filter((p) => p.id !== pegawai.id));
                setNamaPegawai('');
                setSelectedProvinsi(null);
                setSelectedKota(null);
                setSelectedKecamatan(null);
                setSelectedKelurahan(null);
                setKota([]);
                setKecamatan([]);
                setKelurahan([]);
                setSelectedPegawai(null);
            } catch (error) {
                console.error('Error deleting pegawai:', error);
            }
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // const filteredPegawai = pegawai.filter((pegawai) => {
    //     if (selectedKota) {
    //         return pegawai.kota === selectedKota.nama;
    //     }
    //     if (selectedProvinsi) {
    //         return pegawai.provinsi === selectedProvinsi.nama;
    //     }
    //     return true;
    // });

    const paginatedPegawai = pegawai.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    const getNumbering = (page, index) => {
        return page * rowsPerPage + index + 1;
    };
    return (
        <Container sx={{height: 1500}}>
            <h1>Data Pegawai</h1>
            <EmployeeTable pegawai={pegawai} paginatedPegawai={paginatedPegawai} getNumbering={getNumbering} page={page} setSelectedPegawai={setSelectedPegawai} handleDeletePegawai={handleDeletePegawai} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} handleChangeRowsPerPage={handleChangeRowsPerPage} />
            <Input
                selectedPegawai={selectedPegawai}
                namaPegawai={namaPegawai}
                handleNamaPegawaiChange={handleNamaPegawaiChange}
                provinsi={provinsi}
                selectedProvinsi={selectedProvinsi}
                handleProvinsiChange={handleProvinsiChange}
                kota={kota}
                selectedKota={selectedKota}
                handleKotaChange={handleKotaChange}            
                kecamatan={kecamatan}
                selectedKecamatan={selectedKecamatan}
                handleKecamatanChange={handleKecamatanChange}
                kelurahan={kelurahan}
                selectedKelurahan={selectedKelurahan}
                setSelectedKelurahan={setSelectedKelurahan}
                handleEditPegawai={handleEditPegawai}
                handleCreatePegawai={handleCreatePegawai} 
                />
        </Container>
    );
}