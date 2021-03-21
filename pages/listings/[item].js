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
          <Sl.MainContainer>
            <Carousel showArrows={false}>
              {item.images.images.map((s) => (
                <Sl.ImageFull key={s} src={s} />
              ))}
            </Carousel>
            <Sl.ItemInfo>
              <h2>{item.price} USD</h2>
              <h2>{item.square} Square foots</h2>
              <Sl.LabelSpacing>Type</Sl.LabelSpacing>
              <p>{item.type}</p>
              <Sl.LabelSpacing>City</Sl.LabelSpacing>
              <p>{item.address.city}</p>
              <Sl.LabelSpacing>Description</Sl.LabelSpacing>
              <p>{item.description}</p>
              <Sl.LabelSpacing>Amenities:</Sl.LabelSpacing>
              {item.amenities.amenities.map((s) => (
                <span key={s}> {s}</span>
              ))}
              <Sl.LabelSpacing>Builders</Sl.LabelSpacing>
              <p>{item.builder}</p>
              {item.hasBasement && (
                <Sl.LabelSpacing>Has basement</Sl.LabelSpacing>
              )}
              <Sl.Table>
                <tbody>
                  <tr>
                    <Sl.Element>
                      <h4>Garage capacity:</h4>
                    </Sl.Element>
                    <td>{item.garage}</td>
                  </tr>
                  <tr>
                    <Sl.Element>
                      <h4>Bedrooms count:</h4>
                    </Sl.Element>
                    <td>{item.bedrooms}</td>
                  </tr>
                </tbody>
              </Sl.Table>
            </Sl.ItemInfo>
          </Sl.MainContainer>
        </>
      )}
    </>
  );
}
