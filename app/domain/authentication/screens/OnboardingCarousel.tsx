// create a component
import React from 'react';
import {FlatList, View} from 'react-native';
import CarouselWrapper from '../Components/CarouselWrapper/CarouselWrapper';
import {OnBoardingCarouselStyles} from '../styles/OnboardingCarouselStyle';

const OnBoardingCarousel = () => {
  const carouselRef: any = React.useRef(null);

  const nextHandle = (val: number) => {
    carouselRef.current.scrollToIndex({index: val});
  };

  const renderItem = (item: any) => {
    return (
      <CarouselWrapper
        item={item.item}
        index={item.index}
        nextHandlee={nextHandle}
      />
    );
  };

  return (
    <View style={OnBoardingCarouselStyles.container}>
      <FlatList
        data={[
          'OnBoardingFirstScreen',
          'OnBoardingSecondScreen',
          'OnBoardingThirdScreen',
        ]}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        ref={carouselRef}
      />
    </View>
  );
};

export default OnBoardingCarousel;
