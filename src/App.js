import React, { useState } from 'react'
import logo from './logo.svg'
import './App.css'

function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

function App() {
	const [name, setName] = useState('Mani')

	async function displayRazorpay() {
		const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

		if (!res) {
			alert('Razorpay SDK failed to load. Are you online?')
			return
		}

		const data = await fetch('https://shielded-inlet-36228.herokuapp.com/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)

		// console.log('---order---')
		// console.log(data)

		const options = {
			key: 'rzp_live_lVEs73zpgsvlNu',
			currency: data.currency,
			amount: data.amount.toString(),
			order_id: data.id,
			name: 'Stock calls',
			description: 'Get awesome stock calls',
			image: 'https://raw.githubusercontent.com/mehulmpt/razorpay-payments-tutorial/8141a0d6435b9fa648725a40fcee92fa83820546/backend/logo.svg',
			handler: function (response) {
				// alert(response.razorpay_payment_id)
				// alert(response.razorpay_order_id)
				// alert(response.razorpay_signature)
				console.log('---success capture---')
				console.log(response)
			},
			prefill: {
				name,
				// email: 'sdfdsjfh2@ndsfdf.com',
				// phone_number: '9899999999'
			}
		}
		const paymentObject = new window.Razorpay(options)
		paymentObject.open()
	}

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					onClick={displayRazorpay}
					target="_blank"
					rel="noopener noreferrer"
				>
					Donate 
				</a>
			</header>
		</div>
	)
}

export default App