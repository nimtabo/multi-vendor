import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";
import ImageLoader from '../../reusable/ImageLoader';

class Promotion extends Component {
	renderEvents(events) {
		const eventsLayout = events.map((event) => {
			return (
				<a href={event.slider_url} key={event.id}>
					<ImageLoader 
					imageUrl={event.image_url}
					placeholderbackBefore="#ffffff"
					placeholderBackgroundColor="#f5f5f5"
					placeholderHeight={300}
					/>
				</a>
			);
		});
		return eventsLayout;
	}

	render() {
		const { events } = this.props;
		const settings = {
			infinite: false,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 3000,
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: true,
			responsive: [
				{
					breakpoint: 1440,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: false,
						dots: true
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						centerMode: true,
						centerPadding: "40px",
						infinite: false,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						centerPadding: "40px",
						infinite: false,
						slidesToScroll: 1
					}
				}
			]
		}

		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Promotion and Events In the news - Gallery</div>
				<div className='special-offers-wrapper'>
					<div className='special-offers-content maximum-width'>
						<div className='special-wrapper promotion-wrapper'>
							<Slider {...settings}>
								{this.renderEvents(events)}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Promotion;