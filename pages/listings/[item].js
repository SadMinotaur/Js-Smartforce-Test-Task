import React, {useEffect} from 'react';
import {fetchOne} from './../../store/listings/listingActions';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import Carousel from 'react-elastic-carousel';
import Head from 'next/head';
import Sl from './styles';

export default function Listings() {
  const router = useRouter();
  const dispatch = useDispatch();
  const itemId = parseInt(router.query.item);
  const item = useSelector((state) =>
    state.listings.find((s) => s.id === itemId),
  );

  useEffect(() => {
    !item &&
      router.push({
        pathname: 'http://localhost:3000/listings',
      });
    dispatch(fetchOne(itemId));
    return () => {};
  }, []);

  return (
    <>
      {item && (
        <>
          <Head>
            <title>{item.product}</title>
          </Head>
          <Sl.MainContainer padding={17}>
            <Carousel showArrows={false}>
              {item.images.map((s) => (
                <Sl.ImageFull key={s} src={s} />
              ))}
            </Carousel>
            <h2>{item.price} USD</h2>
            <h2>{item.square} Square foots</h2>
            <h4>Type</h4>
            <p>{item.type}</p>
            <h4>City</h4>
            <p>{item.address.city}</p>
            <h4>Description</h4>
            <div>{item.description}</div>
            <table>
              <tr>
                <td>
                  <h4>Garage capacity: </h4>
                </td>
                <td>{item.garage}</td>
              </tr>
              <tr>
                <td>
                  <h4>Bedrooms count: </h4>
                </td>
                <td>{item.bedrooms}</td>
              </tr>
            </table>
            <h4>Amenities:</h4>
            {item.amenities.map((s) => (
              <span key={s}> {s}</span>
            ))}
            <h4>Builders</h4>
            <div>{item.builder}</div>
          </Sl.MainContainer>
        </>
      )}
    </>
  );
}
