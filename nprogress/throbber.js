
import React from "react";
import PropTypes from "prop-types";
import exact from "prop-types-exact";

import {NProgress} from "@tanem/react-nprogress";

import Bar from "./bar";
import Container from "./container";


export default class Throbber extends React.PureComponent {
    static propTypes = exact({
        isAnimating: PropTypes.bool});

    render () {
        const {isAnimating} = this.props;
        return (
            <NProgress isAnimating={isAnimating}>
              {({isFinished, progress, animationDuration}) => (
                  <Container
                    isFinished={isFinished}
                    animationDuration={animationDuration}>
                    <Bar
                      progress={progress}
                      animationDuration={animationDuration} />
                  </Container>
              )}
            </NProgress>);
    }
}
