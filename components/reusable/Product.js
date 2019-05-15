
import Modal from 'react-responsive-modal';
import '../../assets/styles/layouts/product.scss';
import ProductPopup from '../views/ProductPopup';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    onOpenModal() {
        this.setState({ 
            open: true 
        });
    };

    onCloseModal () {
        this.setState({ 
            open: false 
        });
    };

    renderProductIdentifier(product) {
        const { has_discount, is_popular, discount_percent } = product;
        const discount = Number(has_discount);
        const popularity = Number(is_popular);
        if ( discount === 1 && popularity === 1 ) {
            return (
                <div className='top-icons'>
                    <span className='hot'><span className='icon-Path-54'></span>hot</span>
                    <span className='discount'>{`${discount_percent}% OFF`}</span>
                </div>
            );
        }

        if ( discount === 1 && popularity !== 1) {
            return (
                <div className='top-icons'>
                    <span className='discount'>{`${discount_percent}% OFF`}</span>
                </div>
            );
        }

        if (discount !== 1 && popularity === 1) {
            return (
                <div className='top-icons'>
                    <span className='hot'><span className='icon-Path-54'></span>hot</span>
                </div>
            );
        }
        
        return null;
    }

    renderProductPrice(product) {
        const { has_discount, price, special_price } = product;
        const discount = Number(has_discount);
        if (discount === 1) {
            return (
                <span>
                    <span className='price'>{`Rwf ${special_price}`}</span>
                    <span className='initial-price'>{`Rwf ${price}`}</span>
                </span>
            );
        }

        return (
            <span>
                <span className='price'>{`Rwf ${special_price}`}</span>
            </span>
        );
    }

    renderProduct(product) {
        return (
            <a href={`#${product.slug}`}>
                <img className='product-img' src={product.image_url} />
                {this.renderProductIdentifier(product)}
                <div className='product-description'>
                    <div className='store-logo'>
                        <img className='store-img' src={product.store.icon} />
                        <span className='store-name'>{product.store.name}</span>
                    </div>
                    <div className='product-name'>{product.description}</div>
                    <div className='price-cart'>
                        {this.renderProductPrice(product)}
                        <span className='add-to-cart'>
                            <button><span className='icon-Path-63'></span></button>
                        </span>
                    </div>
                </div>
            </a>            
        );
    }

	render() {
        const { open } = this.state;
        const { product } = this.props;
		return (
            <div>
                <div className='single-product' onClick={this.onOpenModal}>
                    {this.renderProduct(product)}           
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ProductPopup />
                </Modal>
            </div>
		);
	}
}

export default Product;
