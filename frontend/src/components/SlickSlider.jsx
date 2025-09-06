import Slider from 'react-slick'

const SlickSlider = ({ slidesToShow, slidesToScroll, children }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow,
    slidesToScroll,
autoplay: true,
  autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  }
  return (
    <div className=''>
      <Slider {...settings} className='max-w-[80%] md:w-full mx-auto'>
        {children}
      </Slider>
    </div>
  )
}

export default SlickSlider
