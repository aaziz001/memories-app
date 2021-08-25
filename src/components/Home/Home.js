import React from "react";
import {
  Grow,
  Container,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getPosts, getPostsBySearch } from "../../store/actions/posts";
import Pagination from "../Pagination";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import useStyles from "./style";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchTags, setSearchTags] = useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const classes = useStyles();

  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleAddTag = (tag) => setSearchTags([...searchTags, tag]);
  const handleDeleteTag = (tagToDelete) =>
    searchTags.filter((tag) => tag !== tagToDelete);

  const submitSearch = () => {
    if (searchTitle.trim()) {
      dispatch(getPostsBySearch({ searchTitle, tags: searchTags.join(",") }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      submitSearch();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="searchTitle"
                variant="outlined"
                label="Search Title"
                fullWidth
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={searchTags}
                onAdd={handleAddTag}
                onDelete={handleDeleteTag}
                label="Search Tags"
                variant="outlined"
                onKeyPress={handleKeyPress}
              />
              <Button
                onClick={submitSearch}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
          <Paper className={classes.pagination} elevation={6}>
            <Pagination />
          </Paper>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
