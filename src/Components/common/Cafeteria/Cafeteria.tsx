import React, { useEffect, useState } from "react";
import axios from "axios";
import * as S from "./style";

const Cafeteria = () => {
  let accessToken: any = localStorage.getItem("Token");
  // accessToken = accessToken.slice(1, -1);
  let today = new Date();

  const arrowL = require("../../../Assets/image/Default/CafeteriaArrowL.svg");
  const arrowR = require("../../../Assets/image/Default/CafeteriaArrowR.svg");

  const [num, setNum] = useState(0);
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState(0);
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);

  const DayControl = (e: any) => {
    if (e.target.name == "plus") {
      setNum(num + 1);
      console.log(num);
    }
    if (e.target.name == "minus") {
      setNum(num - 1);
      console.log(num);
    }
   
    today.setDate(today.getDate() + num);
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());

    axios({
      method: "get",
      url: "http://3.36.108.34:8080/api/v1/meal",
      params: {
        date: `${year}${month < 10 ? "0" + month : month}${
          date < 10 ? "0" + date : date
        }`,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res: any) => {
      console.log(res);
      console.log(
        `${year}${month < 10 ? "0" + month : month}${
          date < 10 ? "0" + date : date
        }`
      );
      setBreakfast(res.data.breakfast);
      setLunch(res.data.lunch);
      setDinner(res.data.dinner);
    });
  };

  useEffect(() => {
    setYear(today.getFullYear());
    setMonth(today.getMonth() + 1);
    setDate(today.getDate());

    axios({
      method: "get",
      url: "http://3.36.108.34:8080/api/v1/meal",
      params: {
        date: `${year}${month < 10 ? "0" + month : month}${
          date < 10 ? "0" + date : date
        }`,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((res: any) => {
      console.log(res);
      console.log(
        `${year}${month < 10 ? "0" + month : month}${
          date < 10 ? "0" + date : date
        }`
      );
      setBreakfast(res.data.breakfast);
      setLunch(res.data.lunch);
      setDinner(res.data.dinner);
    });
  }, []);

  return (
    <S.CafeteriaPage>
      <S.CafeteriaAria>
        <S.CafeteriaTextAria>
          <S.CafeteriaTitle>오늘의 급식</S.CafeteriaTitle>
          <S.CafeteriaTextBox>
            <S.CafeteriaArrow
              onClick={DayControl}
              name="minus"
              src={arrowL.default}
            />
            <S.CafeteriaText>
              {year}년 {month}월 {date}일
            </S.CafeteriaText>
            <S.CafeteriaArrow
              onClick={DayControl}
              name="plus"
              src={arrowR.default}
            />
          </S.CafeteriaTextBox>
        </S.CafeteriaTextAria>
        <S.CafeteriaMenuAria>
          <S.CafeteriaMenu>
            <S.CafeteriaMenuTitle>아침</S.CafeteriaMenuTitle>
            {breakfast &&
              breakfast.map((x, index) => {
                return <S.CafeteriaMenuText key={index}>{x}</S.CafeteriaMenuText>;
              })}
          </S.CafeteriaMenu>
          <S.CafeteriaMenu>
          <S.CafeteriaMenuTitle>점심</S.CafeteriaMenuTitle>
            {lunch &&
              lunch.map((x, index) => {
                return <S.CafeteriaMenuText key={index}>{x}</S.CafeteriaMenuText>;
              })}
          </S.CafeteriaMenu>
          <S.CafeteriaMenu>
          <S.CafeteriaMenuTitle>저녁</S.CafeteriaMenuTitle>
            {dinner &&
              dinner.map((x, index) => {
                return <S.CafeteriaMenuText key={index}>{x}</S.CafeteriaMenuText>;
              })}
          </S.CafeteriaMenu>
        </S.CafeteriaMenuAria>
        <S.CafeteriaDrawingAria></S.CafeteriaDrawingAria>
      </S.CafeteriaAria>
    </S.CafeteriaPage>
  );
};

export default Cafeteria;