import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {fetchAll} from '../../store/listings/listingActions';
import Carousel from 'react-elastic-carousel';
import Head from 'next/head';
import Sl from './styles';

export default function Listings() {
  const items = useSelector((state) => state.listings);
  const offset = useSelector((state) => state.offset);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAll(offset));
    console.log(items);
    return () => {};
  }, []);

  return (
    <Sl.MainContainer>
      <Head>
        <title>Houses for Sale</title>
      </Head>
      <>
        {/* <Sl.FilterBlock>
          <Sl.FilterSelect name="pets"></Sl.FilterSelect>
        </Sl.FilterBlock> */}
        <Sl.Header>Houses for Sale</Sl.Header>
        <Sl.MainCardsContainer>
          {items.map((item) => (
            <Sl.CardDiv key={item.id}>
              <Carousel showArrows={false}>
                {item.images.images.map((s) => (
                  <Sl.CardImage key={s} src={s} />
                ))}
              </Carousel>
              <div
                onClick={() =>
                  router.push({
                    pathname: '/listings/[item]',
                    query: {item: item.id},
                  })
                }>
                <Sl.CardText size={22}>{item.product}</Sl.CardText>
                <Sl.CardText size={14}>{item.address.city}</Sl.CardText>
                <Sl.CardText size={15}>{item.price} USD</Sl.CardText>
              </div>
            </Sl.CardDiv>
          ))}
        </Sl.MainCardsContainer>
      </>
    </Sl.MainContainer>
  );
}
