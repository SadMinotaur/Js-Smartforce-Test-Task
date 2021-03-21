import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouter} from 'next/router';
import {
  fetchAll,
  setOffset,
  setFilter,
} from '../../store/listings/listingActions';
import {Field, Form, FormSpy} from 'react-final-form';
import Carousel from 'react-elastic-carousel';
import Head from 'next/head';
import Sl from './styles';

export default function Listings() {
  const items = useSelector((state) => state.listings);
  const offset = useSelector((state) => state.offset);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();
  const router = useRouter();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender) {
      dispatch(fetchAll({...filter, offset: offset}));
      firstRender.current = false;
    }
    return () => {};
  }, []);

  const fetchChanges = (values) => {
    dispatch(fetchAll({...values, offset: 0}));
    dispatch(setOffset(0));
    dispatch(setFilter(values));
  };

  const changePage = (num, values) => {
    dispatch(fetchAll({...values, offset: num}));
    dispatch(setOffset(num));
    dispatch(setFilter(values));
  };

  const Filter = ({name, type, placeholder, defaultValue}) => (
    <Field name={name} type={type} defaultValue={defaultValue}>
      {({input}) => (
        <div>
          <Sl.FilterInput {...input} placeholder={placeholder} />
        </div>
      )}
    </Field>
  );

  return (
    <Sl.MainContainer>
      <Head>
        <title>Houses for Sale</title>
      </Head>
      <Form
        onSubmit={() => {}}
        render={({values}) => (
          <>
            <Sl.Header>Houses for Sale</Sl.Header>
            <Sl.FilterBlock>
              <Sl.FilterColumn>
                <Sl.FilterColumnHead>Name</Sl.FilterColumnHead>
                <Filter
                  name="name"
                  type="input"
                  placeholder="Starts with"
                  defaultValue={filter.name}
                />
              </Sl.FilterColumn>
              <Sl.FilterColumn>
                <Sl.FilterColumnHead>Price in USD</Sl.FilterColumnHead>
                <Filter
                  name="priceStr"
                  type="number"
                  placeholder="From"
                  defaultValue={filter.priceStr}
                />
                <Filter
                  name="priceEnd"
                  type="number"
                  placeholder="To"
                  defaultValue={filter.priceEnd}
                />
              </Sl.FilterColumn>
              <Sl.FilterColumn>
                <Sl.FilterColumnHead>Square</Sl.FilterColumnHead>
                <Filter
                  name="squareStr"
                  type="number"
                  placeholder="From"
                  defaultValue={filter.squareStr}
                />
                <Filter
                  name="squareEnd"
                  type="number"
                  placeholder="To"
                  defaultValue={filter.squareEnd}
                />
              </Sl.FilterColumn>
              <Sl.FilterColumn>
                <Sl.FilterColumnHead>Builder</Sl.FilterColumnHead>
                <Filter
                  name="builder"
                  type="input"
                  placeholder="Starts with"
                  defaultValue={filter.builder}
                />
              </Sl.FilterColumn>
              <Sl.FilterColumn>
                <Sl.FilterColumnHead>Garage capacity</Sl.FilterColumnHead>
                <Filter
                  name="garage"
                  type="number"
                  placeholder="Minimum count"
                  defaultValue={filter.garage}
                />
              </Sl.FilterColumn>
              <Sl.FilterColumn>
                <Sl.FilterColumnHead>Bedrooms count</Sl.FilterColumnHead>
                <Filter
                  name="bedrooms"
                  type="number"
                  placeholder="Minimum count"
                  defaultValue={filter.bedrooms}
                />
              </Sl.FilterColumn>
            </Sl.FilterBlock>
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
                    <Sl.CardLink
                      href={''}
                      size={22}
                      onClick={(e) => e.preventDefault()}>
                      {item.product}
                    </Sl.CardLink>
                    <Sl.CardText size={14}>{item.address.city}</Sl.CardText>
                    <Sl.CardText size={15}>{item.price} USD</Sl.CardText>
                  </div>
                </Sl.CardDiv>
              ))}
            </Sl.MainCardsContainer>
            <FormSpy
              subscription={{values: true}}
              onChange={(v) => fetchChanges(v.values)}
            />
            <Sl.Pages>
              <Sl.PagesButton
                disabled={offset == 0 ? true : false}
                onClick={() => changePage(offset - 20, values)}>
                {'<'}
              </Sl.PagesButton>
              <Sl.PagesButton>{offset / 20 + 1}</Sl.PagesButton>
              <Sl.PagesButton
                disabled={items.length < 20 ? true : false}
                onClick={() => changePage(offset + 20, values)}>
                {'>'}
              </Sl.PagesButton>
            </Sl.Pages>
          </>
        )}
      />
    </Sl.MainContainer>
  );
}
