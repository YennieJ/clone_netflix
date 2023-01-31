import React, { useState } from "react";

import { makeImagePath } from "../../utilis";
import { IGetMoviesResult } from "api";

import ranks from "../../RankImage";

import * as S from "./RankSlider.styled";
import { motion, AnimatePresence } from "framer-motion";

const rowVariants = {
  hidden: (direction: number) => ({
    x: direction > 0 ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
  visible: {
    x: 0,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const infoVariants = {
  hover: {
    opacity: 1,
    borderRadius: "0 0 5px 5px",

    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
    zIndex: 3,
  },
};

const iconVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: "2",
    scaleX: 1.5,
    scaleY: 2,

    y: -50,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const imgVariants = {
  hover: {
    scaleX: 2,
    scaleY: 0.7,

    borderRadius: "5px 5px 0 0",
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

interface ISlider {
  data: IGetMoviesResult;
}

const offset = 4;

const RankSlider = ({ data }: ISlider) => {
  const [sliderHover, setSliderHover] = useState(false);
  const [detailHover, setDetailHover] = useState(false);

  const [index, setIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const increaseIndex = (newDirection: number) => {
    if (data) {
      setIndex((prev) => (prev === 1 ? 0 : prev + 1));
    }
    setPage([page + newDirection, newDirection]);
  };

  const decreaseIndex = (newDirection: number) => {
    if (data) {
      setIndex((prev) => (prev === 0 ? 1 : prev - 1));
    }
    setPage([page + newDirection, newDirection]);
  };

  const rankCount = (nums: number) => {
    for (let i = 1; i <= index; i++) {
      if (index === 0) {
        return nums;
      } else {
        nums += offset;
      }
    }
    return nums;
  };

  const starRate = (rate: number) => {
    const max = 10;
    const percent = (rate / max) * 100;

    return percent;
  };
  return (
    <S.Wrapper
      onHoverStart={() => {
        setSliderHover(true);
      }}
      onHoverEnd={() => {
        setSliderHover(false);
      }}
    >
      {sliderHover && (
        <>
          <S.PrevButton onClick={() => decreaseIndex(-1)}>
            <S.Icon variants={iconVariants} whileHover="hover">
              &lt;
            </S.Icon>
          </S.PrevButton>
          <S.NextButt onClick={() => increaseIndex(1)}>
            <S.Icon variants={iconVariants} whileHover="hover">
              &gt;
            </S.Icon>
          </S.NextButt>
        </>
      )}

      <AnimatePresence initial={false} custom={direction}>
        <S.Row
          variants={rowVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={page}
          custom={direction}
        >
          {data?.results
            .slice(offset * index, offset * index + offset + 2)

            .map((movie, i) => (
              <>
                <S.Box
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  key={movie.id}
                >
                  <motion.img src={ranks[`${rankCount(i)}`]} alt="" />
                  <motion.img
                    variants={imgVariants}
                    src={makeImagePath(movie.poster_path, "w500")}
                  ></motion.img>

                  <S.Info variants={infoVariants}>
                    <h4> {movie.name ? movie.name : movie.title} </h4>
                    <S.StarRate rate={starRate(movie.vote_average)}>
                      <div>
                        <span>★★★★★</span>
                        <span>☆☆☆☆☆</span>
                      </div>
                      <div> {movie.vote_average} </div>
                    </S.StarRate>
                    <S.DetailBox>
                      {detailHover && <S.Ballon>상세 정보</S.Ballon>}
                      <S.DatailBtn
                        onHoverStart={() => {
                          setDetailHover(true);
                        }}
                        onHoverEnd={() => {
                          setDetailHover(false);
                        }}
                      >
                        <i></i>
                      </S.DatailBtn>
                    </S.DetailBox>
                  </S.Info>
                </S.Box>
              </>
            ))}
        </S.Row>
      </AnimatePresence>
    </S.Wrapper>
  );
};

export default RankSlider;
