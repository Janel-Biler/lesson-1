import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";
import {
  Container,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from "@mui/material";

function EditPage() {
  const { getWatchToEdit, watchToEdit, saveEditedWatch } =
    React.useContext(AdminContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [year, setYear] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [country, setCountry] = React.useState("");

  React.useEffect(() => {
    getWatchToEdit(id);
  }, []);

  React.useEffect(() => {
    if (watchToEdit) {
      setName(watchToEdit.name);
      setBrand(watchToEdit.brand);
      setPrice(parseInt(watchToEdit.price));
      setYear(watchToEdit.year);
      setCountry(watchToEdit.country);
      setPhoto(watchToEdit.photo);
    }
  }, [watchToEdit]);

  const handleSubmit = () => {
    const eidtedWatch = {
      name: name.trim(),
      brand: brand.trim(),
      price,
      year: year.trim(),
      photo: photo.trim(),
      country: country.trim(),
      id: id,
    };
    for (let i in eidtedWatch) {
      if (!eidtedWatch[i]) {
        alert("Заполните поля");
        return;
      }
    }
    saveEditedWatch(eidtedWatch);
    navigate("/admin");
  };

  return (
    <div className="admin-edit-page">
      <Container>
        <h2>Редакт</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Название"
            variant="standard"
          />
          <TextField
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            label="Бренд"
            variant="standard"
          />
          <TextField
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type="number"
            label="Цена"
            variant="standard"
          />
          <TextField
            value={year}
            onChange={(e) => setYear(e.target.value)}
            type="date"
            label="Дата произ."
            variant="standard"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            label="Картинка"
            variant="standard"
          />

          <FormControl variant="standard">
            <InputLabel>Страна</InputLabel>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <MenuItem value="china">Kitay</MenuItem>
              <MenuItem value="japan">Japan</MenuItem>
              <MenuItem value="germany">German</MenuItem>
              <MenuItem value="italy">Italy</MenuItem>
              <MenuItem value="sved">Sveden</MenuItem>
              <MenuItem value="chehia">Chehia</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" type="submit">
            Сохранить
          </Button>
        </form>
      </Container>
    </div>
  );
}

export default EditPage;
