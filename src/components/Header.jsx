import { Fragment } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const Header = ({ title, description, setTitle, setDescription }) => {
  return (
    <Fragment>
      <Box sx={{ mb: 3 }}>
        <Paper elevation={2} sx={{ p: 3, borderTop: "8px solid #9C27B0" }}>
          <TextField
            defaultValue={title}
            onBlur={(e) => setTitle(e.target.value)}
            variant="standard"
            placeholder="Form Title"
            name="title"
            sx={{ mb: 3 }}
            fullWidth
          />
          <TextField
            name="description"
            defaultValue={description}
            onBlur={(e) => setDescription(e.target.value)}
            variant="standard"
            placeholder="Form Description"
            fullWidth
            sx={{ mb: 2 }}
            multiline
            rows={2}
          />
        </Paper>
      </Box>
    </Fragment>
  );
};

export default Header;