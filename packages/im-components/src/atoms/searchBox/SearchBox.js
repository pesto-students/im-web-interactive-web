import React from "react";
import PropTypes from "prop-types";

// Components
import { Input } from "antd";

// Search Component
const { Search } = Input;

const SearchBox = (props) => {
  const { placeholder, onSearch, style, ...restProps } = props;
  return (
    <Search {...restProps} placeholder={placeholder} onSearch={onSearch} style={style}/>
  );
};

SearchBox.propTypes = {
  placeholder: PropTypes.string,
  onSearch: PropTypes.func,
  style: PropTypes.object
};

SearchBox.defaultProps = {
  placeholder: '',
  onSearch: () => {},
  style: {},
};

export default SearchBox;
