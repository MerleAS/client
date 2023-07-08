import { useContext, useState } from "react";

import classes from "../../styles/components/layout/search.module.css";
import useIsMobile from "../util/useIsMobile";
import { StateContext } from "../../context/stateContext";

import SideModal from "../UI/sideModal";

const Search = () => {
  const { setSearchIsActive, searchIsActive } = useContext(StateContext);

  const headerContent = <div color="black">Test</div>;

  const bodyContent = <div color="black">Test 2</div>;

  return (
    <SideModal
      isActive={searchIsActive}
      setIsActive={setSearchIsActive}
      title="Search"
      headerContent={headerContent}
      bodyContent={bodyContent}
    />
  );
};

export default Search;
