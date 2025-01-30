import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

interface Props {
  onChange: (value: string) => void;
  value: string;
}

const SearchBar = ({ onChange, value }: Props) => {
  const [tempValue, setTempValue] = useState<string>(value);
  const debouncedQuery = useDebounce(tempValue);

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTempValue(e.target.value);
  };

  useEffect(() => {
    onChange(debouncedQuery);
  }, [debouncedQuery]);
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 300 }}
    >
      <InputBase
        onChange={handleOnChange}
        value={tempValue}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search users"
        inputProps={{ "aria-label": "search users" }}
      />
      <SearchIcon sx={{ color: "#f1356d" }} />
    </Paper>
  );
};

export default SearchBar;
