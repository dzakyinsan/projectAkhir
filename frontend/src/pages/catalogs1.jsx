import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { APIURL, APIURLimage } from "../helper/ApiUrl";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import Fade from "react-reveal/Fade";

// const useStyles = makeStyles(theme => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//       width: "85ch",
//       marginTop: "25px",
//       // fontSize: "30px",
//       fontWeight: "bold"
//     }
//   }
// }));

const Catalogs = () => {
  // const classes = useStyles();

  const [dataRunning, setdataRunning] = useState([]);
  const [page, setPage] = useState(1);
  const [pager, setpager] = useState({});
  const [search, setsearch] = useState("");
  const [filtereddataRunning, setfiltereddataRunning] = useState([]);

  useEffect(() => {
    Axios.get(`${APIURL}product/getproductRunning/${page}`)
      .then((res) => {
        setdataRunning(res.data.pageOfData);
        setpager(res.data.pager);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    Axios.get(`${APIURL}product/getproductRunning/${page}`)
      .then((res) => {
        setdataRunning(res.data.pageOfData);
        setpager(res.data.pager);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  // =================================== useEffect search =====================
  useEffect(() => {
    setfiltereddataRunning(
      dataRunning.filter((running) => {
        return running.namaProduk.toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [search, dataRunning]);

  const renderProducts = () => {
    console.log("dataRunning", dataRunning);
    return filtereddataRunning.map((val, index) => {
      return (
        <div className="col-md-3" >
          <Card className="mt-5 card-container">
            <Link to={"/viewdetail/" + val.id}>
              <Card.Img
                variant="top"
                src={APIURLimage + val.gambar}
                onMouseOver={(e) => (e.currentTarget.src = APIURLimage + val.gambar)}
                onMouseOut={(e) => (e.currentTarget.src = APIURLimage + val.gambar)}
                className="card-img"
              />
            </Link>
            <Card.Body style={{ textAlign: "center", minHeight: "135.5px" }}>
              <Card.Text>New arrival</Card.Text>
              <Card.Title>{val.namaProduk}</Card.Title>
              <Card.Text>Harga Rp.{val.harga}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };
  console.log("page", page);
  console.log("pager.pages", pager.pages);

  return (
    <div>
      <div className="catalog-page">
        <Fade top>
          <img
            className="d-block w-100"
            style={{ height: "400px" }}
            src="https://content.nike.com/content/dam/one-nike/en_hk/SU16/Cities/NRC-header.jpg.transform/full-screen/NRC-header.jpg"
            alt="catalog1"
          />
        </Fade>
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10 " >
            <Fade bottom cascade>
              <div className="row">{renderProducts()}</div>
            </Fade>
          </div>
          <div className="col-md-1" />
        </div>
      </div>
      {pager.pages && pager.pages.length && (
        <ul className="pagination">
          <li className={`page-item first-item ${pager.currentPage === 1 ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "white", color: "black", fontSize: "20px" }} to={{ search: `?page=1` }} className="page-link" onClick={() => setPage(pager.startPage)}>
              First
            </Link>
          </li>
          {/* <li className={`page-item previous-item ${pager.currentPage === 1 ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "#212529", color: "white" }} to={{ search: `?page=${pager.currentPage - 1}` }} className="page-link" onClick={() => setPage(pager.currentPage - 1)}>
              Previous
            </Link>
          </li> */}
          {pager.pages.map((page) => (
            <li key={page} className={`page-item number-item ${pager.currentPage === page ? "active" : ""}`}>
              <Link style={{ color: "blsck", fontSize: "20px" }} to={{ search: `?page=${page}` }} className="page-link" onClick={() => setPage(page)}>
                {page}
              </Link>
            </li>
          ))}
          {/* <li className={`page-item next-item ${pager.currentPage === pager.totalPages ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "#212529", color: "white" }} to={{ search: `?page=${pager.currentPage + 1}` }} className="page-link" onClick={() => setPage(pager.currentPage + 1)}>
              Next
            </Link>
          </li> */}
          <li className={`page-item last-item ${pager.currentPage === pager.totalPages ? "disabled" : ""}`}>
            <Link style={{ backgroundColor: "white", color: "black", fontSize: "20px" }} to={{ search: `?page=${pager.totalPages}` }} className="page-link" onClick={() => setPage(pager.totalPages)}>
              Last
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
export default Catalogs;
