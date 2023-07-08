import { useRouter } from "next/router";
import { useContext } from "react";
import { StateContext } from "../../context/stateContext";

import classes from '../../styles/components/UI/routeStack.module.css';

const RouteStack = ({
    routeOptionsContainerClass,
    routeContainerClass,
    labelClass
}) => {
  
  const router = useRouter();
  const { routeStack, routeStackHandler } = useContext(StateContext);

  const routeHandler = (routeObject, index) => {
    router.push(routeObject.path);
    routeStackHandler(routeObject, index);
  };

  return (
    <div className={`${classes.routeOptions} ${routeOptionsContainerClass}`}>
      {routeStack.map((route, index) => {
        return (
          <div
            onClick={() => routeHandler(route, index)}
            className={`${classes.routeContainer} ${routeContainerClass}`}
            key={index}
          >
            <p className={classes.seperator}>/</p>
            <p className={`${classes.label} ${labelClass}`}>{route.label} </p>
          </div>
        );
      })}
    </div>
  );
};

export default RouteStack;
