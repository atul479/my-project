import react from 'react'

function ProductCard({ name, price, status }) {
    return (
        <div>
            <div id="product-card">
                <h3>{name}</h3>
                <p>Price: ${price}</p>
                <p>Status: {status}</p>
            </div>
        </div>
    )
}

export default ProductCard