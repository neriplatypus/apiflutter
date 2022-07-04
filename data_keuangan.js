const bodyParser = require('body-parser');
const express = require('express');
const { uuid } = require('uuidv4');
const app = express();

const port = process.env.PORT || 3000;

const dataKeuangan = []
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send(dataTiket);
});

app.post('/', (req, res) => {
    const data = req.body
    console.log(data);
    dataKeuangan.push({id: uuid(), ...data});
    res.send("Berhasil Terkirim!");
});

app.delete('/:id', (req, res) => {
    const { id } = req.params;

    const data = dataKeuangan.find(data => data.id == id)
    if (data) {
        dataKeuangan.splice(dataKeuangan.indexOf(data), 1);
    }

    console.log(dataKeuangan);

    res.send('Berhasil hapus data dengan id ${id}');
});

app.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { panel, tagihan, status } = req.body;
    const data = dataKeuangan.find((data) => data.id == id);
    if (panel) data.panel = panel;
    if (tagihan) data.tagihan = tagihan;
    if (status) data.status = status;

    console.log('dataKeuangan', dataKeuangan);

    res.send('Berhasil Update data dengan id ${id}');
})

app.listen(port, () => {

    console.log(`Server is running on port ${port}`);

});