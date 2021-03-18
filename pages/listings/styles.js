import styled from 'styled-components';

const Sl = {
  MainContainer: styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    border-radius: 5px;
    ${(p) => p.padding && 'padding: ' + p.padding + 'px'};
  `,
  MainCardsContainer: styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  `,
  Header: styled.header`
    font-size: 20px;
    text-align: center;
    margin: 10px 0 10px 0;
  `,
  CardDiv: styled.div`
    padding: 0 0 10px 0;
    border-radius: 5px;
    font-size: 15px;
    width: 300px;
    border: solid lightgray 1px;
    margin: 0 10px 10px 0;
    :hover {
      transition: 0.6s;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      background-color: #cdace3;
    }
  `,
  CardImage: styled.img`
    width: 100%;
    height: 250px;
    object-fit: cover;
  `,
  ImageFull: styled.img`
    width: 100%;
    height: 450px;
    object-fit: contain;
  `,
  CardText: styled.div`
    padding: 0 16px 0 16px;
    font-size: ${(p) => (p.size ? p.size : 16)}px;
  `,
  ItemInfo: styled.div`
    margin: 10px 5% 15px 5%;
  `,
  LabelSpacing: styled.h4`
    margin: 10px 0 0 0;
  `,
  Element: styled.td`
    padding: 0 10px 0 0;
  `,
  Table: styled.table`
    margin: 10px 0 0 0;
  `,
};
export default Sl;
