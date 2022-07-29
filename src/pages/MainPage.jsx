import React, { useEffect } from "react";
import { ClientContext } from "../contexts/ClientProvider";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  Slider,
  CardContent,
  Pagination,
  Button,
} from "@mui/material";

function MainPage() {
  const {
    getWatches,
    watches,
    filterByPrice,
    setFilterByPrice,
    pagesCount,
    currentPage,
    setCurrentPage,
    addWatchToBasket,
  } = React.useContext(ClientContext);

  React.useEffect(() => {
    getWatches();
  }, [filterByPrice, currentPage]);
  return (
    <div className={"main-page"}>
      <Container>
        <h2>Весь каталог часов</h2>
        <div className="filter-block">
          <h4>Фильтрация по цене</h4>
          <Slider
            max={999999}
            min={0}
            valueLabelDisplay="auto"
            value={filterByPrice}
            onChange={(_, newValue) => setFilterByPrice(newValue)}
          />
        </div>
        <div className="products">
          {watches.map((item) => (
            <Card key={item.id} className="products-card">
              <CardMedia
                component="img"
                height="140"
                image={item.photo}
              ></CardMedia>
              <CardContent>
                <Typography
                  className="product-card-title"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {item.name}
                </Typography>
                <ul className="product-list">
                  <li>
                    <span>brand </span>
                    <span>{item.brand}</span>
                  </li>
                  <li>
                    <span>Дата выпуска: </span>
                    <span>{item.year}</span>
                  </li>
                  <li>
                    <span>Страна производства </span>
                    <span>{item.country}</span>
                  </li>
                  <li>
                    <span>Цена </span>
                    <span>{item.price}</span>
                  </li>
                </ul>
                <Button
                  onClick={() => addWatchToBasket(item)}
                  variant="outlined"
                >
                  Добавить в корзину
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="pagination-block">
          <Pagination
            onChange={(_, newValue) => setCurrentPage(newValue)}
            count={pagesCount}
            variant="outlined"
            shape="rounded"
          />
        </div>
      </Container>
    </div>
  );
}

export default MainPage;
