import Link from 'next/link';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Payment extends React.Component {

	render() {
		return (
            <div className='account-info-wrapper'>
				<div className='payment-section'>
					<div className='account-info-title'>Payment</div>
				</div>
                <div className='payment-section'>
					<div className='wallet-title'>User wallet</div>
					<div className='wallet-content'>Available wallet cash: 0 Rwf</div>
				</div>
				<div className='payment-section'>
					<Tabs>
						<TabList>
							<Tab><h5><span className="table-title">Cash on Delivery</span></h5></Tab>
							<Tab><h5><span className="table-title">Pay Now</span></h5></Tab>
						</TabList>
						<TabPanel>
							me
						</TabPanel>
						<TabPanel>
							<div>
								<span><input type='radio' name='card' />Credit card</span>
								<span></span>
							</div>
							<div>
								<div>
									<input type='text' name='number' placeholder='Card Number' />
								</div>
								<div>
									<input type='text' name='name' placeholder='Card Name' />
								</div>
								<div>
									<input type='date' name='date' placeholder='Expiry Date' />
									<input type='text' name='cvv' placeholder='Cvv' />
								</div>
							</div>
						</TabPanel>
					</Tabs>
				</div>
            </div>
		);
	}
}

export default Payment;