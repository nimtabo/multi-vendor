import Slider from "react-slick";
import Link from 'next/link';
import Router from 'next/router';

class TopCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.renderCategories = this.renderCategories.bind(this);
    }
    componentDidMount() {
        const { categories } = this.props;
        this.setState({
            categories: categories
        });
    }

    renderCategories() {
        const { categories } = this.state;
        if (categories) {
            const categoriesLayout = categories.map((category) => {
                const iconClassName = category.icon_class_name !== '' ? category.icon_class_name : 'icon-KITCHENWARE-ICO';
                const { slug } = category;
                const activeClassName = (Router.router.query.category_slug === slug) ? 'is-active' : '';
                return (
                    <a 
                    key={slug}
                    href={`/categories/${slug}`}
                    className={`single-category ${activeClassName}`}>
                        <i className={`cat-icon ${iconClassName}`} />
                        {category.name}
                    </a>
                );
            });
            return categoriesLayout;
        }

        return null;
    }
	render() {
        var settings = {
			infinite: false,
            speed: 1000,
			slidesToShow: 8,
            slidesToScroll: 2,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 7,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 6,
                        infinite: false,
                    }
                },
				{
				 	breakpoint: 1024,
					settings: {
                        slidesToShow: 5,
                        infinite: false,
					}
                },
                {
                    breakpoint: 979,
                    settings: {
                        slidesToShow: 4,
                        infinite: false,
                    }
               }
			]
		};
		return (
			<div className='maximum-width'>
                <div className='multi-vendor-categories-wrapper'>
                    <Slider {...settings}>
                       {this.renderCategories()}
                    </Slider>
                </div>
            </div>
		);
	}
}

export default TopCategories;