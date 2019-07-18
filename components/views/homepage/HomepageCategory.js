import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";

class HomepageCategory extends Component {
    renderCategory(categories) {
        if (!_.isEmpty(categories)) {
            const categoriesLayout = categories.map((category) => {
                const {
                  icon_class_name,
                  name,
                  slug
                } = category;
                //let singleCategoryPageUrl = category.slug !== 'categories' ? `/categories/${category.slug}` : 'categories';
                const IconClassName = icon_class_name !== '' ? icon_class_name : 'icon-KITCHENWARE-ICO';
                return (
                  <a href={`/categories/${slug}`}>
                    <img src={IconClassName} className={`cat-icon`} />
                    <div className='cat-name'>{name}</div>
                  </a>
                );
            });
            return categoriesLayout;
        }
    }
    render() {
        const catSettings = {
            infinite: false,
            speed: 1000,
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [
                {
					breakpoint: 1920,
					settings: {
						slidesToShow: 7,
						slidesToScroll: 2,
						infinite: false,
						dots: true
					}
                },
                {
					breakpoint: 1280,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 2,
						infinite: false,
						dots: true
					}
                },
                {
					breakpoint: 979,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 3,
						infinite: false,
						dots: true
					}
                },
                {
					breakpoint: 768,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 3,
					}
                },
                {
					breakpoint: 480,
					settings: {
						slidesToShow: 3,
						centerMode: true,
						centerPadding: "30px",
						slidesToScroll: 3
					}
                }
            ]
		};
        return  (
            <Slider {...catSettings}>
               {this.renderCategory(this.props.categories)}
            </Slider>
        );
    }
}

export default HomepageCategory;