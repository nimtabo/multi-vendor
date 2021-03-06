import React, { Component } from 'react';
import Router from 'next/router';
import StockIncrementer from './StockIncrementer';
import isObjectEmpty from '../../helpers/is_object_empty';
import RemoveProductFromCart from '../../helpers/remove_product_from_cart';

export default class SingleCartProductItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productData: {}
        };
        this.renderProductPrice = this.renderProductPrice.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
        this.removeProductFromCart = this.removeProductFromCart.bind(this);
        this.renderProductWithAttributes = this.renderProductWithAttributes.bind(this);
        this.renderOptions = this.renderOptions.bind(this);
        this.renderCartItemEditButton = this.renderCartItemEditButton.bind(this);
        this.performOnProductRemovalFromCart = this.performOnProductRemovalFromCart.bind(this);
    }

    componentDidMount() {
        const { product } = this.props;
        if (product !== undefined) {
            this.setState({
                productData: product
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { product } = nextProps;
        this.setState({
            productData: product
        });
    }

    removeProductFromCart(product, productIndex) {
        const { updateCartData, removeShipment } = this.props;
        if (product) {
            RemoveProductFromCart(product, () => {
                this.performOnProductRemovalFromCart(removeShipment, updateCartData);
            }, productIndex);
        }
    }

    performOnProductRemovalFromCart(callbackOne, callbackTwo) {
        const { router: { pathname } } = Router;
        if (pathname === '/checkout') {
            location.reload();
            return;
        }
        if (callbackOne !== undefined && typeof(callbackOne) == 'function') {
            callbackOne();
        }

        if (callbackTwo !== undefined && typeof(callbackTwo) == 'function') {
            callbackTwo();
        }
    }
 
    renderProductPrice(product, productIndex) {
        const { 
            has_discount,
            discount_percent,
            special_price,
            price,
            has_attributes
        } = product;
        if (Number(has_discount) === 1) {
            return (
                <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset prices-discounts'>
                    <div className='cart-bk'>
                        <div className='discount'>{`${discount_percent}% OFF`}</div>
                    </div>
                    {this.renderCartItemEditButton(has_attributes, price)}
                    <div className='cart-bk'>
                        <button 
                        className='remove'
                        type='button'
                        onClick={() => this.removeProductFromCart(product, productIndex)}
                        >
                            <span className='icon-Path-60'></span>
                            <span className="hidden-xs">Remove</span>
                        </button>
                        <div className='price'>{`Rwf ${special_price}`}</div>
                    </div>    
                </div>
            );
        }

        return (
            <div className='col-lg-5 col-md-5 col-sm-5 col-4 col-reset prices-discounts'>
                <div className='cart-bk'>
                    &nbsp;
                </div>
                {/* {this.renderCartItemEditButton(has_attributes)} */}
                <div className='cart-bk'>
                    <button 
                    className='remove'
                    type='button'
                    onClick={() => this.removeProductFromCart(product, productIndex)}
                    >
                        <span className='icon-Path-60'></span>
                        <span className="hidden-xs">Remove</span>
                    </button>
                    <div className='price'>{`Rwf ${price}`}</div>
                </div>    
            </div>
        );
    }

    renderCartItemEditButton(has_attributes, product_price) {
        if (Number(has_attributes) === 1) {
            const pricehiddenClass = product_price !== undefined ? '' : 'xs-hidden__txt';
            return (
                <div className='cart-bk'>
                    <div className='edit'><span className='icon-Path-68'></span><span>Edit</span></div>
                    <div className={`${pricehiddenClass} initial-price`}>{`Rwf ${product_price}`}</div>
                </div>
            );
        }
        return null;
    }

    renderProduct() {
        const { productData } = this.state;
        if (!isObjectEmpty(productData)) {
            const {
                cart_image_url,
                name,
                has_attributes
            } = productData;
            if (Number(has_attributes) === 0) {
                return (
                    <div className='row reset-row cart-item'>
                        <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                            <img className='cart-product-img' src={cart_image_url} />
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset name-incremenet'>
                            <div className="cart-increment__content">
                                <div className='product-name'>{name}</div>
                                <StockIncrementer 
                                stock={productData.stock}
                                updateCartOnChange={true}
                                product={productData}
                                runOnCartChange={this.props.updateCartData}
                                incrementInitial={false}
                                updateInitial={true}
                                layout={'incrementor'}
                                />
                            </div>                           
                            
                        </div>
                        {this.renderProductPrice(productData)}
                    </div>
                );
            }

            return this.renderProductWithAttributes(productData);
            
        }
        return null;
    }

    renderProductWithAttributes(product) {
        if (product) {
            const {
                cart_image_url,
                name,
                attributes,
                meta
            } = product;
            const pieceDescr = attributes.descquantity !== undefined ? (
                <div className='qty-measurement'>Pce</div>
            ) : null;

            const productLayouts = meta.map((productItem, index) => {
                return (
                    <div className='row reset-row cart-item'>
                        <div className='col-lg-2 col-md-2 col-sm-2 col-3 col-reset product-cart-image'>
                            <img className='cart-product-img' src={cart_image_url} />
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset name-incremenet'>
                            <div className="cart-increment__content">
                                <div className='product-name'>{name}</div>
                                {pieceDescr}
                                {this.renderOptions(productItem.options)}
                                <StockIncrementer 
                                stock={product.stock}
                                updateCartOnChange={true}
                                product={product}
                                runOnCartChange={this.props.updateCartData}
                                incrementInitial={false}
                                updateInitial={true}
                                layout={'incrementor'}
                                index={index}
                                />
                            </div>
                        </div>
                        {this.renderProductPrice(product, index)}
                </div>
                );
            });

            return productLayouts
        }
    }

    renderOptions(productOptions) {
        const layout = [];
        Object.keys(productOptions).forEach((optionName, index) => {
            layout.push(
                <li 
                className="cart-item-options-wrapper__li"
                key={`${optionName}-${index}`}
                >
                    <span>
                        <h5>{`${optionName}`}:&nbsp;</h5>
                    </span>
                    <span>
                        <h5>{productOptions[optionName].title}</h5>
                    </span>
                </li>
            );
        });
        return (
            <ul className="cart-item-options-wrapper">
                {layout}
            </ul>
        );
    }

    render() {
        return this.renderProduct();
    }
}